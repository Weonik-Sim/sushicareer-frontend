import { GetServerSideProps } from "next";
import TokenArtifact from "../../contracts/AIB.json";
import Web3 from "web3";
import styles from "../../styles/Home.module.css";
import { AbiItem } from "web3-utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
	const contractAddress =
		process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
	const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
	const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

	const result = await contract.methods._getEmployeeInfo(ctx.query.id).call();
	console.log("getEmployeeInfo: ", result);

	return {
		props: {
			result,
		},
	};
};

export default function Page({ result }: any) {
	console.log(result);
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>employee Info</h1>
				<div>
					<p className={styles.description}>employeeAddress: {result[0]}</p>
					<p>employeeName: {result[1]}</p>
					<p>employeeZanToken: {result[2]}</p>
					<p>companyName: {result[3]}</p>
					<p>companyUrl: {result[4]}</p>
					<p>employeeSendToken: {result[5]}</p>
					<p>employeeReceiveToken: {result[6]}</p>
					<p>employeeSlackId: {result[7]}</p>
				</div>
			</main>
		</div>
	);
}
