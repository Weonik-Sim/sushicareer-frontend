import { GetServerSideProps } from "next";
import TokenArtifact from "../contracts/AIB.json";
import Web3 from "web3";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/navigation";
import { AbiItem } from "web3-utils";

export const getServerSideProps: GetServerSideProps = async () => {
	const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
	const contractAddress =
		process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
	const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
	// eslint-disable-next-line
	const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

	const result = await contract.methods._getAllThings().call();
	const data = JSON.parse(JSON.stringify(result));

	// console.log("getAllThings: ", result);

	return {
		props: {
			data,
		},
	};
};

// eslint-disable-next-line
export default function Page({ data }: any) {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>employee Info</h1>
				{data.map((user: any, i: number) => (
					<div
						key={i}
						className={styles.link}
						onClick={() => {
							router.push(`/user/${i}`);
						}}
					>
						{/* <p className={styles.description}>employeeAddress: {user[0]}</p> */}
						<p>employeeName: {user[1]}</p>
						{/* <p>employeeZanToken: {user[2]}</p> */}
						<p>companyName: {user[3]}</p>
						{/* <p>companyUrl: {user[4]}</p> */}
						{/* <p>employeeSendToken: {user[5]}</p> */}
						{/* <p>employeeReceiveToken: {user[6]}</p> */}
						{/* <p>employeeSlackId: {user[7]}</p> */}
						<p>--------------------------------</p>
					</div>
				))}
			</main>
		</div>
	);
}
