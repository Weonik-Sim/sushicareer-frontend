import { NextApiRequest, NextApiResponse } from 'next'
import TokenArtifact from "../../contracts/AIB.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const contractAddress = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PRIVATE_KEY || "";
const abi = TokenArtifact.abi; // コントラクトのABIをここに記述
const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    console.log("req: ", req.body);
    const sender_name = req.body.sender_name;
    const receiver_name = req.body.receiver_name;
    const osushi_count = req.body.osushi_count;

    console.log("sender_name: ", sender_name);
    console.log("receiver_name: ", receiver_name);
    console.log("osushi_count: ", osushi_count);

    const sender_id = getEmployeeInfoBySlackId(sender_name);
    const receiver_id = getEmployeeInfoBySlackId(receiver_name);

    sendSushi(sender_id, receiver_id, osushi_count);

    res.status(200).json({ from: 'Test', to: 'This is a test', sushi: '10' })
} 

async function getEmployeeInfoBySlackId(slackId: string): Promise<number> {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods
        .getEmployeeInfoSlack(slackId)
        .call({ from: accounts[0] });
    console.log("getEmployeeInfoBySlackId: ", result);

    // display user info
    return result[1];
}

async function sendSushi(fromId: Promise<number>, toId: Promise<number>, sushi: Promise<number>) {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods
        ._sendSushi(fromId, toId, sushi)
        .send({ from: accounts[0] });
    console.log("setEmployeeJoinCompany: ", result);
}

export default handler;
