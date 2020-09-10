Introduing Matic Network
===
**[Matic](https://matic.network/)** is a decentralized platform using the [Plasma framework](https://academy.binance.com/blockchain/what-is-ethereum-plasma) that provides faster and low-cost transactions.
Matic is trying to improve some current blockchain challenges.
* Confirmation Speed
* Gas fees
* User interaction with blockchain
* Easier development
* ... 

In this article, we focus on the development part.
* How to interact with the chain
* Developing & Deploying contracts
* Using Matic Graphiql

> I use updated development tools. `nodejs 12` & `web3 1.2` and `solc 0.7.1`

Matic provides SDK and APIs for development.  
The Matic explorer provides `Graphiql` which we work with further in this article.  
Also as a developer, you can use your own token as settlement fees.

## Table of content
+ [Development](#development)
  + [Account](#account)
  + [Installation](#installation)
  + [Implementation](#implementation)
+ [MATIC](#matic)
+ [Interacting with Matic blockchain](#interacting-with-matic-blockchain)
  + [Geth](#geth)
  + [Matic Explorer](#matic-explorer)
+ [Matic useful features](#matic-useful-features)
  + [Matic Wallet](#matic-wallet)
  + [Matic Widget](#matic-widget)
  

## Development

In this example, we write a `Voter` contract, compile it with `solc 0.7.1`. We connect to the `Matic` testnet using `Web3 1.2`, and finally deploy our contract on the Matic testnet blockchain.  
And then we interact with the blockchain using `Geth`. and `Graphiql`.

### Account
First, create an account if you don't have one. If you already have an account in Ethereum you don't need another. You just need to send some credit to your account using Matic faucet. Click on the link below, put your account address and request the fund.  
https://faucet.matic.network/

Now let's check if your account is funded.  
```bash
geth attach https://rpc-mumbai.matic.today
> eth.getBalance("0xD8f24D419153E5D03d614C5155f900f4B5C8A65C")
1987540120000000000
```

### Installation
If you are using Arch-based Linux, like Manjaro here are the commands. for other distros are also almost the same.  
```bash
sudo pacman -S go-ethereum solc # solidity compiler & Geth
mkdir matic
cd matic
npm init
npm i web3 solc @maticnetwork/meta --save # Web3js, Solc nodejs libraries
```
Now that you have `geth`, `solc`, and `web3` we can start writing our `Voter` contract.

### Implementation
The source code is located here:
https://github.com/mlibre/blockchain/tree/master/Matic

> Compile function

We use this function to compile our contracts.

```javascript
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
```
So in the first line, we read the contract file.  
In the second line, we specify compiler options. Like optimizer, Language, and ...  
These options work with `solc 0.7`.  
Now we compile the `.sol` file using `solc.compile` function.  
For each contract in the `.sol` file, `solc` creates a key in `compiledContract.contracts['voter.sol']`.  
As we only have one contract, we just pick the first one.  
Then we create an `abi.json` file. and then we return the contract, for future usages.

> Web3 interface

```javascript
function createWeb3(address) {
	// const Network = require("@maticnetwork/meta/network");
	// const network = new Network ('testnet', 'mumbai');
	// // const main = new Web3(network.Main.RPC)
	// // const matic = new Web3 (network.Matic.RPC)
	// // return matic;
	let web3 = new Web3("https://rpc-mumbai.matic.today");
	return web3;
}
```
So the `testnet` address is `https://rpc-mumbai.matic.today`.  
You may also use the `maticnetwork` library to indicate the blockchain address.

> Deploy function

```javascript
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
```

So we pass `web3`, `contract`, `sender` , `pk` to the `deploy` function.
* `Web3` is the web3 instance we have created in the `createWeb3` function.
* `contract` is the contract instance we created in the `compile` function.
* `sender` is your account address. something like: `"0xD8f24D419153E5D03d614C5155f900f4B5C8A65C"`
* `pk` is your account privateKey. You also could add your private key using `Geth`. But I am adding it  in the runtime to make things easier.

You may download the whole source code [in this repo](https://github.com/mlibre/blockchain/tree/master/Matic)

Now let's test our code:
```bash
node deploy_contract.js -f voter.sol -c Voter -s "0xD8f24D419153E5D03d614C5155f900f4B5C8A65C" -k "1624ff1MYPRIVATEKEY"
Contract Compiled voter.sol
Deploying contract, Gas Estimate:  622994
Transation hash: 0x896b9e3d8548bdf861184c158c786f05ce1a4533cec59e53f7f853aea0422c4f
Confimation Number: 0
Contract Address: 0xE683007C5BfB5BEBA5481C3e938dD4DC47cddbFC
Confimation Number: 1
```

Congratulation. you just made your first contract in Matic Network.  
You can find your contract address in the output log. (in this case `0xE683007C5BfB5BEBA5481C3e938dD4DC47cddbFC`)

> The Matic mainnet address is: `https://rpc-mainnet.matic.network`.

To deploy your contract or interact with the mainnet you just need to replace the testnet address with the above.  

## MATIC
MATIC is the Matic Network native token.  
The [MATIC](https://docs.matic.network/docs/develop/network-details/gas-token) token will be used as the gas fee by default.  
Matic network provides an API to get the recommended gas price.  
The javascript [code](https://docs.matic.network/docs/develop/tools/matic-gas-station) would be something like this:
```javascript
fetch('https://gasstation-mainnet.matic.network')
  .then(response => response.json())
  .then(json => console.log(json))
```
and the result is like:
```javascript
{
    "safeLow": 1,
    "standard": 1,
    "fast": 5,
    "fastest": 7.5,
    "blockTime": 2,
    "blockNumber": 3091956
}
```

## Interacting with Matic blockchain

There are several ways to interact with a blockchain. here we go with two:
* Geth
* [Matic Explorer](https://explorer.matic.network/)

### Geth

```bash
geth attach https://rpc-mumbai.matic.today
eth.getCode("0xE683007C5BfB5BEBA5481C3e938dD4DC47cddbFC")
# To load a contract using geth just need to put the abi we created, and the address
var voter = eth.contract([{"inputs":[{"internalType":"string","name":"option","type":"string"}],"name":"addOption","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOptions","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVotes","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"options","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"remove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startVoting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"option","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"optionName","type":"string"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]).at("0xE683007C5BfB5BEBA5481C3e938dD4DC47cddbFC");
voter
voter.addOption("mlibre" , {from: "0xD8f24D419153E5D03d614C5155f900f4B5C8A65C"})
# Your account should have been added
```

### Matic Explorer

To explore the blockchain (mainnet and testnet) you can use `https://explorer.matic.network/`.  
In this case here is the address:  
`https://mumbai-explorer.matic.today/address/0xE683007C5BfB5BEBA5481C3e938dD4DC47cddbFC/transactions`
You can find `Code` and `Validatd Blocks`

There is also a `graphiql` to explore Matic.
https://mumbai-explorer.matic.today/graphiql  
For example let's check our contract block in the net:
```javascript
{
  transaction(hash: "0x896b9e3d8548bdf861184c158c786f05ce1a4533cec59e53f7f853aea0422c4f")
  { hash, blockNumber, value, gasUsed }
}
```
the result is:
```javascript
{
  "data": {
    "transaction": {
      "blockNumber": 4046786,
      "gasUsed": "622994",
      "hash": "0x896b9e3d8548bdf861184c158c786f05ce1a4533cec59e53f7f853aea0422c4f",
      "value": "0"
    }
  }
}
```

## Matic useful features

* [Matic Wallet](https://wallet.matic.network/)
* [Matic Widget](https://docs.matic.network/docs/develop/tools/matic-widget)

### Matic Wallet
You can create your [Matic wallet](https://wallet.matic.network/) with metamask and the same address as your Ethereum mainchain address.  
Currently, you can send, receive, and MATIC and ETH using the Matic web wallet.  
Staking and earning are in the early stages as it seems.  
The wallet has a contact manager feature to save contacts' addresses by name.  
The reward calculator makes it easy to calculate the reward that could be earned by staking.

### Matic Widget
[Matic widget](https://docs.matic.network/docs/develop/tools/matic-widget) is an instance of Matic wallet that websites can integrate into their sites.  
The widget supports Matic wallet as well as Matic token bridge functionalities.