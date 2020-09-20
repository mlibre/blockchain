import Web3 from 'web3'

window.ethereum.enable();
// export const web3 = new Web3(window.web3.currentProvider);
export const web3 = new Web3(window.ethereum);
