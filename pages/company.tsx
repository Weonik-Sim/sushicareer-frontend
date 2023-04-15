import Web3 from 'web3';
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import TokenArtifact from "../contracts/AIB.json";
import { AbiItem } from 'web3-utils';

import {
    useAddress,
    useUser,
    useLogin,
    useLogout,
    useMetamask,
  } from "@thirdweb-dev/react";

const Company: NextPage = () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const contractAddress = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
    const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
    // eslint-disable-next-line
    const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);
    console.log("contract: ", contract);

    const userAddress = useAddress();
    const { user, isLoggedIn } = useUser();

    // console.log("web3: ", web3);


    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
    // const address = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || ""; // スマートコントラクトのアドレスを設定
    // const signer = provider.getSigner(0);
    // const contract = new ethers.Contract(address, TokenArtifact.abi, signer);
    
    
    // console.log("address: ", address);
    // console.log("TokenArtifact: ", TokenArtifact.abi);
    // const contract = new web3.eth.Contract(TokenArtifact.abi, address);
    // console.log("constract: ", contract);

    async function createCompany() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods._createCompany("SARAH").send({ from: accounts[0] });
        console.log(result);
    };

    async function getAllCompany() {
        const result = await contract.methods._getAllCompanyInfo().call();
        console.log("getAllCompany: ", result);
    };

    async function getCompanyName() {
        const result = await contract.methods._getCompanyName().call();
        console.log("getCompanyName: ", result);
    }

    async function getCompanyToken() {
        const result = await contract.methods._getCompanyToken().call();
        console.log("getCompanyToken: ", result);
    }

    
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                Welcome to Sushi Career!
                </h1>

                <div>
                    <p className={styles.description}>
                    Hello Company : {contractAddress}
                    </p>
                </div>
                <div>
                    <button onClick={createCompany}>Register</button>
                </div>
                <div>
                    <button onClick={getAllCompany}>get All company</button>
                </div>
                <div>
                    <button onClick={getCompanyName}>get company Name</button>
                </div>
                <div>
                    <button onClick={getCompanyToken}>get company Token Count</button>
                </div>

                <div className={styles.connect}>
                {/* <ConnectWallet /> */}
                </div>
            </main>
        </div>
    );
};

export default Company;