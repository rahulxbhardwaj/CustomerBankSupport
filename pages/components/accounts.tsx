import RecentTransactions from "./recentTransaction"

 
  export default function Accounts({ userData }) {
    console.log(userData); // should now log the correct object
    return (
      <div className="height-100vh bg-gray-50 p-6">
        {/* Top horizontal account card */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800"> Welcome, {userData?.name} 👋</h2>
            <p className="text-gray-500 mt-1 font-bold">Account Number : {userData?.accountNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Balance</p>
            <p className="text-2xl font-bold text-green-500">₹{userData?.balance}</p>
          </div>
        </div>

        {/* Additional info / quick actions */}
        {/* <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-bold">
            View All Transactions
          </button>
        </div> */}

        <div className="py-6">
          <RecentTransactions
            transactions={userData?.recentTransactions}
            accountNumber={userData?.accountNumber}
          />
        </div>
      </div>
    );
  }



