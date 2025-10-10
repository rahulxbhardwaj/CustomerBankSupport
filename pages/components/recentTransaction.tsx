export default function RecentTransactions({ transactions = [], accountNumber }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-gray-500">
        No recent transactions found.
      </div>
    );
  }

  // Reverse transactions so latest appear first
  const reversedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      
      <div class="bg-blue-500 p-5 rounded-t-md shadow-lg w-full">
          <h2 class="text-2xl font-semibold text-white">Recent Transactions</h2>
      </div>
      <br></br>
      <ul className="divide-y divide-gray-200">
        {reversedTransactions.map((tx) => {
          const isDebit = tx.sender.accountNumber === accountNumber;
          const color = isDebit ? "text-red-600" : "text-green-600";
          const sign = isDebit ? "-" : "+";

          // Mask last 4 digits of account number
          const formatUser = (user) => {
            const last4 = user.accountNumber.slice(-4);
            return `${user.name} ****${last4}`;
          };

          return (
            <li key={tx._id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {isDebit ? "To: " : "From: "}
                  {isDebit ? formatUser(tx.receiver) : formatUser(tx.sender)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(tx.date).toLocaleString()}
                </p>
              </div>
              <p className={`font-semibold ${color}`}>
                {sign}₹{tx.amount}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
