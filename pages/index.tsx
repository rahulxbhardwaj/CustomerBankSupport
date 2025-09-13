import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import QueryForm from "/components/queryform.tsx";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
     <h1>Welcome to Bhardwaj Bank</h1>
      <QueryForm/>
      
    </div>
  );
};

export default Home;
