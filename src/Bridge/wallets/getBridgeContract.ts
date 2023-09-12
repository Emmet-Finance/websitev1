import FTBridge from "emmet.sdk/abi/FTBridge";
import { getBridgeAddress } from "./getBridgeAddress";
import { getSigner } from "./getSigner";
import { ethers } from "ethers";

export async function getBridgeContract(
    chainName: string,
    senderAddress: string
) {
    const bridgeAddress: string = getBridgeAddress(chainName);
    console.log("bridgeAddress", bridgeAddress)
    const signer = await getSigner(senderAddress);
    console.log("signer", signer)
    const contract = new ethers.Contract(
        bridgeAddress,
        FTBridge,
        signer
    );
    return contract;
}