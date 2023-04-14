import Web3 from 'web3';
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import TokenArtifact from "../contracts/AIB.json";
import { useState } from 'react';

const User: NextPage = () => {
    const [userName, setUserName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyUrl, setCompanyUrl] = useState('');

    const userNameChange = (e) => {
        setUserName(e.target.value);
    };

    const companyNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    const companyUrlChange = (e) => {
        setCompanyUrl(e.target.value);
    };

    const [fromIdInfo, setFromIdInfo] = useState('');

    const fromIdInfoChange = (e) => {
        setFromIdInfo(e.target.value);
    };

    const [fromId, setFromId] = useState('');
    const [toId, setToId] = useState('');
    const [sushi, setSushi] = useState('');

    const fromIdChange = (e) => {
        setFromId(e.target.value);
    };

    const toIdChange = (e) => {
        setToId(e.target.value);
    };

    const sushiChange = (e) => {
        setSushi(e.target.value);
    };

    const [slackId, setSlackId] = useState('');

    const slackIdChange = (e) => {
        setSlackId(e.target.value);
    };

    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const contractAddress = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
    const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
    const contract = new web3.eth.Contract(abi, contractAddress);

    async function createUser() {
        console.log("userName: ", userName);
        console.log("companyName: ", companyName);
        console.log("companyUrl: ", companyUrl);
        const accounts = await web3.eth.getAccounts();
        console.log("accounts: ", accounts);
        const result = await contract.methods._createEmployee(userName, companyName, companyUrl, slackId).send({ from: accounts[0] });
        console.log(result);
    };

    async function getEmployeeInfo() {
        const result = await contract.methods._getEmployeeInfo(fromIdInfo).call();
        console.log("getEmployeeInfo: ", result);
    };

    async function sendSushi() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods._sendSushi(fromId, toId, sushi).send({ from: accounts[0] });
        console.log("setEmployeeJoinCompany: ", result);
    };

    async function getAllThings() {
        const result = await contract.methods._getAllThings().call();
        console.log("getAllThings: ", result);
    };

    async function getEmployeeInfoAddress() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.getEmployeeInfoAddress().call({ from: accounts[0] });
        console.log("getEmployeeInfoAddress: ", result);
    };

    async function getEmployeeInfoBySlackId() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.getEmployeeInfoSlack(slackId).call({ from: accounts[0] });
        console.log("getEmployeeInfoBySlackId: ", result);
    };
    

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                Welcome to Sushi Career!
                </h1>

                <div>
                    <p className={styles.description}>
                        Hello User
                    </p>
                </div>
                <div>
                    <input type="text" name="user_name" value={userName} onChange={userNameChange} placeholder="Your Name" />
                    <input type="text" name="company_name" value={companyName} onChange={companyNameChange} placeholder="Your Company Name" />
                    <input type="text" name="company_url" value={companyUrl} onChange={companyUrlChange} placeholder="Your Company Url" />
                    <input type="text" name="slack_id" value={slackId} onChange={slackIdChange} placeholder="Your Slack ID" />
                    <button onClick={createUser}>Register</button>
                </div>
                <br />

                <div>
                    <input type="text" name="from_id_info" value={fromIdInfo} onChange={fromIdInfoChange} placeholder="Your Id" />
                    <button onClick={getEmployeeInfo}>get User Info</button>
                </div>
                <br />

                <div>
                    <input type="text" name="from_id" value={fromId} onChange={fromIdChange} placeholder="Your Id" />
                    <input type="text" name="to_id" value={toId} onChange={toIdChange} placeholder="Send Id" />
                    <input type="text" name="sushi" value={sushi} onChange={sushiChange} placeholder="Sushi" />
                    <button onClick={sendSushi}>Send Sushi</button>
                </div>
                <br />

                <input type="text" name="slack_id" value={slackId} onChange={slackIdChange} placeholder="Slack ID" />
                <button onClick={getEmployeeInfoBySlackId}>get User Info by Slack ID</button>

                <div>
                    <button onClick={getEmployeeInfoAddress}>Get User Info by Address</button>
                </div>
                <br />

                <div>
                    <button onClick={getAllThings}>Get AllThings</button>
                </div>
                

                <div className={styles.connect}>
                {/* <ConnectWallet /> */}
                </div>
            </main>
        </div>
    );
};

export default User;