import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/userModel";
import transcation from "../../../models/transcation";
import jwt from "jsonwebtoken";

// --- Custom Styles for PDF generation (Mimicking Tailwind/Homepage Aesthetic) ---

const PRIMARY_BLUE = '#1e40af'; // blue-800
const SECONDARY_BLUE = '#2563eb'; // blue-600
const LIGHT_BLUE_BG = '#eff6ff'; // blue-50
const DEBIT_RED = '#dc2626'; // red-600
const CREDIT_GREEN = '#16a34a'; // green-600

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', fontSize: 10, backgroundColor: LIGHT_BLUE_BG }, 

  // Header (Inspired by Navbar/Hero)
  header: { 
    textAlign: 'center', 
    marginBottom: 25, 
    backgroundColor: PRIMARY_BLUE, 
    color: '#fff', 
    padding: 20, 
    borderRadius: 8, 
  },
  bankName: { 
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 5
  },
  statementTitle: { fontSize: 14, color: '#93c5fd', marginTop: 5 },

  // Account Info Card (White Background with Blue Accent)
  accountInfo: { 
    marginBottom: 20, 
    padding: 18, 
    backgroundColor: '#ffffff', 
    borderRadius: 8,
    borderLeftWidth: 5, 
    borderLeftColor: SECONDARY_BLUE, 
    // Shadow for a card effect
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  accountText: {
    paddingBottom: 4,
    color: '#4b5563', 
    fontSize: 12
  },

  // Table structure
  tableContainer: { 
    borderRadius: 8, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff'
  },
  row: { 
    flexDirection: 'row', 
    paddingVertical: 10, 
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  rowHeader: { 
    borderBottomWidth: 2, 
    borderBottomColor: PRIMARY_BLUE, 
    fontWeight: 'bold', 
    backgroundColor: '#93c5fd', // blue-300
    color: PRIMARY_BLUE, 
    fontSize: 11,
  },
  colDate: { width: '15%' },
  colDesc: { width: '45%' },
  colType: { width: '15%', textAlign: 'center', fontWeight: 'bold' },
  colAmount: { width: '15%', textAlign: 'right', fontWeight: 'bold' },
  colBalance: { width: '10%', textAlign: 'right', color: '#4b5563' },

  // Conditional text styles for Debit/Credit
  debitText: { color: DEBIT_RED }, 
  creditText: { color: CREDIT_GREEN },

  // Footer
  footer: { 
    marginTop: 40, 
    textAlign: 'center', 
    fontSize: 9, 
    color: '#6b7280' 
  },
});

// Helper component for transaction row
const TransactionRow = ({ tx, user, index }) => {
  // Determine if the user is the sender (debit) or receiver (credit)
  const isSender = tx.sender?._id?.toString() === user._id.toString();
  const amountValue = parseFloat(tx.amount);

  // Description logic
  const counterPartyName = isSender ? tx.receiver?.name : tx.sender?.name;
  const description = isSender ? `Transfer to ${counterPartyName || 'Unknown User'}` : `Deposit from ${counterPartyName || 'Unknown User'}`;

  // Amount and style logic
  const amountDisplay = `₹${amountValue.toFixed(2)}`;
  const amountSign = isSender ? '-' : '+';
  const amountStyle = isSender ? styles.debitText : styles.creditText;
  const typeText = isSender ? 'DEBIT' : 'CREDIT';

  // Date formatting (using createdAt as the most reliable timestamp)
  const transactionDate = new Date(tx.createdAt || tx.date).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  // Background alternating color
  const rowBgColor = index % 2 === 0 ? '#f9fafb' : '#ffffff';

  return (
    <View style={[styles.row, { backgroundColor: rowBgColor }]} wrap={false}>
      <Text style={styles.colDate}>{transactionDate}</Text>
      <Text style={styles.colDesc}>{description}</Text>
      <Text style={[styles.colType, amountStyle]}>{typeText}</Text>
      <Text style={[styles.colAmount, amountStyle]}>
        {amountSign}{amountDisplay}
      </Text>
      <Text style={styles.colBalance}>₹{parseFloat(tx.balance || user.balance).toFixed(2)}</Text>
    </View>
  );
};

// PDF Document Component
const MyDocument = ({ user, transactions }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.bankName}>BHARDWAJBANK</Text>
        <Text style={styles.statementTitle}>AI-Powered Banking</Text>
      </View>

      {/* Account Info */}
      <View style={styles.accountInfo}>
        <Text style={styles.accountText}>Account Holder: <Text style={{ fontWeight: 'bold' }}>{user.name}</Text></Text>
        <Text style={styles.accountText}>Account Number: <Text style={{ fontWeight: 'bold' }}>{user.accountNumber}</Text></Text>
        <Text style={styles.accountText}>Current Balance: <Text style={{ fontWeight: 'bold', color: SECONDARY_BLUE }}>₹{parseFloat(user.balance).toFixed(2)}</Text></Text>
      </View>

      {/* Table Container and Header */}
      <View style={styles.tableContainer}>
        <View style={[styles.row, styles.rowHeader]} fixed>
          <Text style={styles.colDate}>Date</Text>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colType}>Type</Text>
          <Text style={styles.colAmount}>Amount</Text>
          <Text style={styles.colBalance}>Balance</Text>
        </View>

        {/* Transactions */}
        {transactions.length === 0 ? (
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text>No transactions found for the latest period.</Text>
          </View>
        ) : (
          transactions.map((tx, index) => (
            <TransactionRow 
              key={tx._id} 
              tx={{...tx, createdAt: tx.createdAt || tx.date}} // Ensure createdAt is used for sorting/date
              user={user} 
              index={index} 
            />
          ))
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Statement generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</Text>
        <Text style={{ marginTop: 5 }}>Thank you for banking with BhardwajBank. Secure • Reliable • Fast</Text>
         <Text style={{ marginTop: 5 }}>{user.username}</Text>
      </View>
    </Page>
  </Document>
);


// --- API Route Logic ---

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. Database Connection
    await dbConnect();

    // 2. Authentication and User Fetching
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Token not found" });

    const decoded = jwt.decode(token);
    if (!decoded || !decoded.userId) return res.status(401).json({ message: "Invalid or malformed token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3. Fetch latest 10 transactions (Sorted by creation date, latest first)
    const transactions = await transcation
      .find({ $or: [{ sender: user._id }, { receiver: user._id }] })
      .sort({ createdAt: -1 }) // Latest 10 transactions
      .limit(10)
      .populate("sender", "name _id")
      .populate("receiver", "name _id")
      .lean(); // Use .lean() for faster data retrieval since we don't need Mongoose document methods

    // 4. Generate PDF
    const doc = <MyDocument user={user} transactions={transactions || []} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const buffer = await asPdf.toBuffer();

    // 5. Send PDF Response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=account-statement.pdf');
    res.send(buffer);

  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
