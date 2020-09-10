let solc = require('solc')
let Web3 = require('web3');
let fs = require('fs');
const commandLineArgs = require('command-line-args')
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
		await deployContract(web3, contract, sender, options.password);
	} catch (e) {
		console.log("did not work" , e);
	}
})();

function compile(filename) {
	let voterSOl = fs.readFileSync(`../contracts/${filename}` , 'utf8')
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
	fs.writeFileSync(`../contracts/bin/${contractName}_abi.json` , JSON.stringify(abi));
	return contract;
}

function createWeb3(address) {
	let web3 = new Web3();
	web3.setProvider(
		new web3.providers.HttpProvider(
			address || "http://127.0.0.1:8545"
		)
	)
	return web3;
}

async function deployContract(web3, contract, sender, password) {
	let Voter = new web3.eth.Contract(contract.abi);
	let bytecode = '0x' + contract.evm.bytecode.object;
	// console.log(bytecode);
	// let gasEstimate = await web3.eth.estimateGas({
	// 	from: sender,
	// 	data: bytecode,
	// 	to: sender
	// });
	let op = {
		data: bytecode
	}
	let gasEstimate = await Voter.deploy(op).estimateGas();
	await web3.eth.personal.unlockAccount(sender , password, 150)
	console.log('Deploying contract, Gas Estimate: ' , gasEstimate);
	Voter.deploy({
		data: bytecode
	})
	.send({
		from: sender,
		gas: gasEstimate
	})
	.on('transactionHash' , function (transationHash) {
		console.log(`Transation hash: ${transationHash}`);
	})
	.on('confirmation' , function (confirmationNumber , receipt) {
		console.log(`Confimation Number: ${confirmationNumber}`);
	})
	.on('error' , function (error) {
		console.log(error);
	})
	.then(function (receipt) {
		console.log('Contract Address:' , receipt.options.address);
	})
}