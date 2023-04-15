import TokenArtifact from "../../contracts/AIB.json";
import Web3 from "web3";
import styles from "../../styles/Home.module.css";
import { AbiItem } from "web3-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();
	const { query, isReady } = useRouter();
	const [data, setData] = useState<any>({});

	useEffect(() => {
		if (!isReady) return;
		(async () => {
			const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
			const contractAddress =
				process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
			const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
			const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

			const result = await contract.methods
				._getEmployeeInfo(router.query.id)
				.call();
			setData(result);
		})();
	}, [isReady, router.query.id]);

	if (!isReady) return null;

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>employee Info</h1>
				<div>
					<p className={styles.description}>employeeAddress: {data[0]}</p>
					<p>employeeName: {data[1]}</p>
					<p>employeeZanToken: {data[2]}</p>
					<p>companyName: {data[3]}</p>
					<p>companyUrl: {data[4]}</p>
					<p>employeeSendToken: {data[5]}</p>
					<p>employeeReceiveToken: {data[6]}</p>
					<p>employeeSlackId: {data[7]}</p>
				</div>
			</main>
		</div>
	);
}
