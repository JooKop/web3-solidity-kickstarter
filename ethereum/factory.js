import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x9d8451B68dc29bc4a6c67Fe4fb7b5581f55f019c"
);

export default instance;
