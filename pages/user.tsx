import Web3 from "web3";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import TokenArtifact from "../contracts/AIB.json";
import { useState } from "react";
import { resolve } from "path";
import { useRouter } from "next/navigation";

const User: NextPage = () => {
	const [userName, setUserName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [companyUrl, setCompanyUrl] = useState("");
	const [fromId, setFromId] = useState("");
	const [toId, setToId] = useState("");
	const [sushi, setSushi] = useState("");
	const [fromIdInfo, setFromIdInfo] = useState("");
	const [slackId, setSlackId] = useState("");

	// result
	const [createdResult, setCreatedResult] = useState("");
	const [employeeInfo, setEmployeeInfo] = useState(""); // result of getEmployeeInfo
	const [sendResult, setSendResult] = useState("");
	const [allData, setAllData] = useState("");
	const [userAddress, setUserAddress] = useState("");
	const [userInfo, setUserInfo] = useState(""); // result of getEmployeeInfoAddress

	const userNameChange = (e) => {
		setUserName(e.target.value);
	};

	const companyNameChange = (e) => {
		setCompanyName(e.target.value);
	};

	const companyUrlChange = (e) => {
		setCompanyUrl(e.target.value);
	};

	const fromIdInfoChange = (e) => {
		setFromIdInfo(e.target.value);
	};

	const fromIdChange = (e) => {
		setFromId(e.target.value);
	};

	const toIdChange = (e) => {
		setToId(e.target.value);
	};

	const sushiChange = (e) => {
		setSushi(e.target.value);
	};

	const slackIdChange = (e) => {
		setSlackId(e.target.value);
	};

	const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

	const contractAddress =
		process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
	const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
	const contract = new web3.eth.Contract(abi, contractAddress);

	const router = useRouter();

	async function createUser() {
		console.log("userName: ", userName);
		console.log("companyName: ", companyName);
		console.log("companyUrl: ", companyUrl);
		const accounts = await web3.eth.getAccounts();
		console.log("accounts: ", accounts);
		const result = await contract.methods
			._createEmployee(userName, companyName, companyUrl, slackId)
			.send({ from: accounts[0] });
		console.log(result);

		// display result (created)
		// setCreatedResult(result);
	}

	async function getEmployeeInfo() {
		const result = await contract.methods._getEmployeeInfo(fromIdInfo).call();
		console.log("getEmployeeInfo: ", result);

		// display user Info
		setEmployeeInfo(result);
	}

	async function sendSushi() {
		const accounts = await web3.eth.getAccounts();
		const result = await contract.methods
			._sendSushi(fromId, toId, sushi)
			.send({ from: accounts[0] });
		console.log("setEmployeeJoinCompany: ", result);

		// display send result
		setSendResult(result);
	}

	async function getAllThings() {
		const result = await contract.methods._getAllThings().call();
		console.log("getAllThings: ", result);

		// display all data (map)
		setAllData(result);
	}

	async function getEmployeeInfoAddress() {
		const accounts = await web3.eth.getAccounts();
		const result = await contract.methods
			.getEmployeeInfoAddress()
			.call({ from: accounts[0] });
		console.log("getEmployeeInfoAddress: ", result);

		// display user address
		setUserAddress(result);
	}

	async function getEmployeeInfoBySlackId() {
		const accounts = await web3.eth.getAccounts();
		const result = await contract.methods
			.getEmployeeInfoSlack(slackId)
			.call({ from: accounts[0] });
		console.log("getEmployeeInfoBySlackId: ", result);

		// display user info
		setUserInfo(result);
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Sushi Career!</h1>

				<div>
					<p className={styles.description}>Hello User</p>
				</div>
				<div>
					<input
						type="text"
						name="user_name"
						value={userName}
						onChange={userNameChange}
						placeholder="Your Name"
					/>
					<input
						type="text"
						name="company_name"
						value={companyName}
						onChange={companyNameChange}
						placeholder="Your Company Name"
					/>
					<input
						type="text"
						name="company_url"
						value={companyUrl}
						onChange={companyUrlChange}
						placeholder="Your Company Url"
					/>
					<input
						type="text"
						name="slack_id"
						value={slackId}
						onChange={slackIdChange}
						placeholder="Your Slack ID"
					/>
					<button onClick={createUser}>Register</button>
				</div>
				{/* <div>{createdResult && <div>{createdResult}</div>}</div> */}
				<br />

				<div>
					<input
						type="text"
						name="from_id_info"
						value={fromIdInfo}
						onChange={fromIdInfoChange}
						placeholder="Your Id"
					/>
					<button onClick={getEmployeeInfo}>get User Info</button>
				</div>
				<div>
					{employeeInfo && (
						<div>
							<p>CompanyName: {employeeInfo.companyName}</p>
							<p>CompanyURL: {employeeInfo.companyUrl}</p>
							<p>EmployeeAddress: {employeeInfo.employeeAddress}</p>
							<p>EmployeeName: {employeeInfo.employeeName}</p>
							<p>EmployeeSlackId: {employeeInfo.employeeSlackId}</p>
						</div>
					)}
				</div>
				<br />

				<div>
					<input
						type="text"
						name="from_id"
						value={fromId}
						onChange={fromIdChange}
						placeholder="Your Id"
					/>
					<input
						type="text"
						name="to_id"
						value={toId}
						onChange={toIdChange}
						placeholder="Send Id"
					/>
					<input
						type="text"
						name="sushi"
						value={sushi}
						onChange={sushiChange}
						placeholder="Sushi"
					/>
					<button onClick={sendSushi}>Send Sushi</button>
				</div>
				{/* <div>{sendResult && <div>{sendResult}</div>}</div> */}
				<br />
				<div>
					<input
						type="text"
						name="slack_id"
						value={slackId}
						onChange={slackIdChange}
						placeholder="Slack ID"
					/>
					<button onClick={getEmployeeInfoBySlackId}>
						get User Info by Slack ID
					</button>
				</div>
				<div>
					{userInfo && (
						<div>
							<p>CompanyName: {userInfo[1].companyName}</p>
							<p>CompanyURL: {userInfo[1].companyUrl}</p>
							<p>EmployeeAddress: {userInfo[1].employeeAddress}</p>
							<p>EmployeeName: {userInfo[1].employeeName}</p>
							<p>EmployeeSlackId: {userInfo[1].employeeSlackId}</p>
						</div>
					)}
				</div>
				<br />
				<div>
					<button onClick={getEmployeeInfoAddress}>
						Get User Info by Address
					</button>
				</div>
				<div>
					{userAddress && (
						<div>
							<p>CompanyName: {userAddress[1].companyName}</p>
							<p>CompanyURL: {userAddress[1].companyUrl}</p>
							<p>EmployeeAddress: {userAddress[1].employeeAddress}</p>
							<p>EmployeeName: {userAddress[1].employeeName}</p>
							<p>EmployeeSlackId: {userAddress[1].employeeSlackId}</p>
						</div>
					)}
				</div>
				<br />

				<div>
					<button onClick={getAllThings}>Get AllThings</button>
				</div>
				<div>
					{allData &&
						allData.map((data: any, i: number) => (
							<div
								className={styles.link}
								key={i}
								onClick={() => {
									router.push(`/user/${i}`);
								}}
							>
								<p>CompanyName: {data.companyName}</p>
								<p>CompanyURL: {data.companyUrl}</p>
								<p>EmployeeAddress: {data.employeeAddress}</p>
								<p>EmployeeName: {data.employeeName}</p>
								<p>EmployeeSlackId: {data.employeeSlackId}</p>
								<p>-------------------------------------</p>
							</div>
						))}
				</div>

				<div className={styles.connect}>{/* <ConnectWallet /> */}</div>
			</main>
		</div>
	);
};

export default User;
