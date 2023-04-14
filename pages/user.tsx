import Web3 from 'web3';
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import TokenArtifact from "../contracts/AIB.json";

const User: NextPage = () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const contractAddress = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
    const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
    const contract = new web3.eth.Contract(abi, contractAddress);

    async function createUser() {
        const accounts = await web3.eth.getAccounts();
        console.log("accounts: ", accounts);
        const result = await contract.methods._createEmployee("SIM_WEONIK").send({ from: accounts[0] });
        console.log(result);
    };

    async function getEmployeeInfo() {
        const result = await contract.methods._getEmployeeInfo().call();
        console.log("getEmployeeInfo: ", result);
    };

    async function setEmployeeJoinCompany() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods._setEmployeeJoinCompany(0).send({ from: accounts[0] });
        console.log("setEmployeeJoinCompany: ", result);
    };

    async function getAllThings() {
        const result = await contract.methods._getAllThings().call();
        console.log("getAllThings: ", result);
    };    

    async function setEmployeeLeaveCompany() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods._setEmployeeLeaveCompany(0, 300).send({ from: accounts[0] });
        console.log("setEmployeeLeaveCompany: ", result);
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
                    <button onClick={createUser}>Register</button>
                </div>

                <div>
                    <button onClick={getEmployeeInfo}>get User Info</button>
                </div>

                <div>
                    <button onClick={setEmployeeJoinCompany}>Join Company</button>
                </div>

                <div>
                    <button onClick={setEmployeeLeaveCompany}>Leave Company</button>
                </div>


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