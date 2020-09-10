let solc = require('solc')
let Web3 = require('web3');
let fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
	{name: 'contract', alias: 'c', type: String},
	{name: 'sender', alias: 's', type: String},
	{name: 'filename', alias: 'f', type: String},
	{name: 'password', alias: 'p', type: String},
	{name: 'http', alias: 'h', type: String},
	{name: 'pk', alias: 'k', type: String}
]
const options = commandLineArgs(optionDefinitions);


(async function () {
	try {
		let filename = options.filename;
		let contract = compile(filename);
		let web3 = createWeb3(options.http);
		let sender = options.sender;
		await deploy(web3, contract, sender, options.pk);
	} catch (e) {
		console.log("did not work" , e);
	}
})();

function compile(filename) {
	let voterSOl = fs.readFileSync(`./contracts/${filename}` , 'utf8')
	let complierInput = {
		language: 'Solidity',
		sources:
		{
			[filename]: 
			{
				content: voterSOl
			}
		},
		settings:
		{
			optimizer:
			{
				enabled: true
			},
			outputSelection:
			{
				"*":
				{
					"*": [ "*" ],
					"": [ "*" ]
				}
			}
		}
	};
	console.log('compiling contract' , filename);
	let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput)));
	console.log('Contract Compiled' , filename);
	let contractName = options.contract || Object.keys(compiledContract.contracts[filename])[0];
	let contract = compiledContract.contracts[filename][contractName];
	// console.log(contractName , contract.abi);		
	let abi = contract.abi;
	fs.writeFileSync(`./contracts/bin/${contractName}_abi.json` , JSON.stringify(abi));
	return contract;
}

function createWeb3(address) {
	// const Network = require("@maticnetwork/meta/network");
	// const network = new Network ('testnet', 'mumbai');
	// const main = new Web3(network.Main.RPC)
	// const matic = new Web3 (network.Matic.RPC)
	// return matic;
	let web3 = new Web3("https://rpc-mumbai.matic.today");
	return web3;
}

async function deploy(web3, contract, sender , pk) {
	let Voter = new web3.eth.Contract(contract.abi);
	let bytecode = '0x' + contract.evm.bytecode.object;
	let op = {
		data: bytecode
	}
	let gasEstimate = await Voter.deploy(op).estimateGas();
	web3.eth.accounts.wallet.add(pk)
	console.log('Deploying contract, Gas Estimate: ' , gasEstimate);
	Voter.deploy({
		data: bytecode
	})
	.send({
		from: sender,
		gas: gasEstimate
	})
	.on('transactionHash' , function (transationHash) {
		console.log(`Transaction hash: ${transationHash}`);
	})
	.on('confirmation' , function (confirmationNumber , receipt) {
		console.log(`Confirmation Number: ${confirmationNumber}`);
	})
	.on('error' , function (error) {
		console.log(error);
	})
	.then(function (receipt) {
		console.log('Contract Address:' , receipt.options.address);
	})
}