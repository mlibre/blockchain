const crowdFundingABI = [
{
	"inputs": [
		{
		"internalType": "string",
		"name": "contractName",
		"type": "string"
		},
		{
		"internalType": "uint256",
		"name": "targetAmountEth",
		"type": "uint256"
		},
		{
		"internalType": "uint256",
		"name": "durationInMin",
		"type": "uint256"
		},
		{
		"internalType": "address payable",
		"name": "beneficiaryAddress",
		"type": "address"
		}
	],
	"stateMutability": "nonpayable",
	"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
			"indexed": false,
			"internalType": "address",
			"name": "addr",
			"type": "address"
			},
			{
			"indexed": false,
			"internalType": "uint256",
			"name": "totalCollected",
			"type": "uint256"
			},
			{
			"indexed": false,
			"internalType": "bool",
			"name": "succeeded",
			"type": "bool"
			}
		],
		"name": "CampaignFinished",
		"type": "event"
	},
	{
		"inputs": [
			{
			"internalType": "address",
			"name": "",
			"type": "address"
			}
		],
		"name": "amounts",
		"outputs": [
			{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "beneficiary",
		"outputs": [
			{
			"internalType": "address payable",
			"name": "",
			"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "collected",
		"outputs": [
			{
			"internalType": "bool",
			"name": "",
			"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "fundingDeadline",
		"outputs": [
			{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
			"internalType": "string",
			"name": "",
			"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "state",
		"outputs": [
			{
			"internalType": "enum CrowdFundingWithDeadline.State",
			"name": "",
			"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "targetAmount",
		"outputs": [
			{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "totalCollected",
		"outputs": [
			{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
		"payable": true
	},
	{
		"inputs": [],
		"name": "collect",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finishCrowdFunding",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "beforeDeadline",
		"outputs": [
			{
			"internalType": "bool",
			"name": "",
			"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	}
];

let crwodABI = require('../contracts/CrowdFundingWithDeadline.json');
let abi = crwodABI.abi;
export default abi;
// export default crowdFundingABI;