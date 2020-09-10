let solc = require('solc')
let Web3 = require('web3');
let fs = require('fs');
const commandLineArgs = require('command-line-args')
const optionDefinitions = [
	{name: 'contractAd', alias: 'c', type: String},
	{name: 'abi', alias: 'a', type: String},
	{name: 'sender', alias: 's', type: String},
	{name: 'password', alias: 'p', type: String},
	{name: 'http', alias: 'h', type: String},
	{name: 'pk', alias: 'k', type: String}
]
const options = commandLineArgs(optionDefinitions);


(async function () {
	try {
		let web3 = createWeb3(options.http);
		await unlockAccount(web3, options.sender, options.password)
		let cont = contract(options.abi , options.contractAd , web3);
		let tr = await sendTransaction(cont , options.sender);
	} catch (e) {
		console.log("did not work" , e);
	}
})();

function contract(filename, contractAddress, web3) {
	let abiFIle = fs.readFileSync(`../contracts/bin/${filename}` , 'utf8')
	let abi = JSON.parse(abiFIle);
	return new web3.eth.Contract(abi , contractAddress);
}

async function sendTransaction(cont , sender)
{
	await cont.methods.addOption("masoud").send({from: sender});
	await cont.methods.addOption("hello").send({from: sender});
	await cont.methods.startVoting().send(
	{
		from: sender,
		gas: 600000
	});
	await cont.methods['vote(uint256)'](0).send(
	{
		from: sender,
		gas: 600000
	});
	let votes = await cont.methods.getVotes().call(
	{
		from: sender,
	});
	console.log(votes);
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

async function unlockAccount (web3, sender , password) {
	await web3.eth.personal.unlockAccount(sender , password, 150)
}