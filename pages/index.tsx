import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as LitJsSdk from '@lit-protocol/lit-node-client';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Sushi Career!
        </h1>

        <p className={styles.description}>
          Get started by configuring your desired network in{" "}
          <code className={styles.code}>pages/_app.tsx</code>, then modify the{" "}
          <code className={styles.code}>pages/index.tsx</code> file!
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div className={styles.grid}>
          <a href="/company" className={styles.card}>
            <h2>Register Company &rarr;</h2>
            <p>
              Register a company wallet.
            </p>
          </a>

          <a href="/user" className={styles.card}>
            <h2>Register User &rarr;</h2>
            <p>
              Register your wallet
            </p>
          </a>

          <a
            href="https://portal.thirdweb.com/templates"
            className={styles.card}
          >
            <h2>Search &rarr;</h2>
            <p>
              Verify company or user information.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
