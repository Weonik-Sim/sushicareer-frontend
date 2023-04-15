import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Sushi Career!</h1>

				<p className={styles.description}>
					Get started by configuring your desired network in{" "}
					<code className={styles.code}>pages/_app.tsx</code>, then modify the{" "}
					<code className={styles.code}>pages/index.tsx</code> file!
				</p>

				<div className={styles.connect}>
					<ConnectWallet />
				</div>

				<div className={styles.grid}>
					<Link href="/user" className={styles.card}>
						<h2>Register User &rarr;</h2>
						<p>Register your wallet</p>
					</Link>

					<Link href="/users" className={styles.card}>
						<h2>Users &rarr;</h2>
						<p>employees information.</p>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Home;
