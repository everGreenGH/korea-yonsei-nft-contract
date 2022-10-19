import { Network, provider, wallet } from "./provider";
import addressInfo from "./addressInfo";
import { ethers } from "ethers";
import { MyLittleTiger, MyLittleEagle } from "../typechain";

// Metadata Link
const koreaBaseURILink = "https://gateway.pinata.cloud/ipfs/QmWJUHeeSYUQMyX695ntnjUzh3MY3tT6PBCWxhM8ngVP6n/";
const yonseiBaseURILink = "https://gateway.pinata.cloud/ipfs/QmXWBaZhEU9DWYXXRVKVhNHS2zQ4VJcMyg2Nk8mZAeZw4L/";

export const setMetadata = async () => {
    const network = process.env.NETWORK as Network;
    const { myLittleTigerAddr, myLittleTigerABI, myLittleEagleAddr, myLittleEagleABI } = addressInfo[network];
    const myLittleTigerContract = new ethers.Contract(myLittleTigerAddr, myLittleTigerABI, provider) as MyLittleTiger;
    const myLittleEagleContract = new ethers.Contract(myLittleEagleAddr, myLittleEagleABI, provider) as MyLittleEagle;

    await (
        await myLittleTigerContract.connect(wallet).setBaseURI(koreaBaseURILink, {
            gasLimit: 10000000,
        })
    ).wait();

    await (
        await myLittleEagleContract.connect(wallet).setBaseURI(yonseiBaseURILink, {
            gasLimit: 10000000,
        })
    ).wait();

    console.log("baseURI 세팅이 완료되었습니다 :D");
    console.log(`고려대학교 baseURI Link 확인: ${await myLittleTigerContract.baseURIextended()}`);
    console.log(`연세대학교 baseURI Link 확인: ${await myLittleEagleContract.baseURIextended()}`);
};

setMetadata();
