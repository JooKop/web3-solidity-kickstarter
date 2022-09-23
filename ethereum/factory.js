import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x799312F5Fd06E4d96F98f8b72F5600572c039664"
);

export default instance;
