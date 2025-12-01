import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import QueryForm from "./components/queryform";
import Loginform from "./components/loginform";
import Homee from "./components/home"

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
  
      <Homee />
    </div>
  );
};

export default Home;
