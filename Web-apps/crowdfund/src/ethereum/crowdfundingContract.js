import {web3} from './web3'
import crowdFundingABI from './crowdfundingABI';

export function createContract(contractAddress) {
	return new web3.eth.Contract(crowdFundingABI , contractAddress);
}