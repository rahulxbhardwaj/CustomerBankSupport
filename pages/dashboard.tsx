import { useState, useEffect } from "react";
import DashboardNavBar from "./components/dashboardNavBar";
import Accounts from "./components/accounts"
import FundTransfer from "./components/fundTransfer"
import AICopilot from "./components/aicopilot";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // NEW
  const [activeTab, setActiveTab] = useState("accounts"); // default tab

  const renderTab = () => {
    switch (activeTab) {
      case "accounts":
        return <Accounts userData={userData}/>;
       case "fundTransfer":
         return <FundTransfer accountNumber={userData?.accountNumber}/>;
       case "aicopilot":
         return <AICopilot />;
      default:
        return <Accounts userData={userData} />;
    }
  };
  
  const UserDataFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fetchUserData", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true); // mark that component is mounted on client
    UserDataFetch();
  }, []);

  if (!mounted) return null; // Prevent rendering during SSR

  return (
    <div>
    <div className="min-h-[100vh] bg-gradient-to-br from-blue-50 to-indigo-100">
      <DashboardNavBar setActiveTab={setActiveTab} />
      <div className="p-6">{renderTab()}</div>
    
    </div>
  
      
    </div>
  );
}
