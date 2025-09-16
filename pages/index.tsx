import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import QueryForm from "./components/queryform";
import Loginform from "./components/loginform";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Welcome to Bhardwaj Bank</h1>
        <Loginform />
      </div>
    </div>
  );
};

export default Home;
