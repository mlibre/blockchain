Introducing Ethereum
===
Ethereum is a decentralized platform.  
This repository contains a voter and a multi-sig-wallet contrat. 
> Development tools: `nodejs 12` & `web3 1.2` and `solc 0.7.1`

In this example you will find:
* Deploying contract
* Gas estimate
* Unlocking account
* Geth light node
* Web3 usage in nodejs
* Connecting rinkeby node
* Voter, multi-Sig-Wallet contracts
* ....

## Table of content
+ [Installation](#installation)
+ [Solc](#solc)
+ [Geth](#geth)
+ [Web3](#web3)


## Installation

```bash
sudo pacman -S go-ethereum solc
npm i web3 solc --save
```

## Solc

```bash
solc multi-sig-wallet.sol  -o ./bin/ --combined-json=abi,bin,metadata --pretty-json --optimize --metadata --gas --abi --bin --overwrite --color
```

## Geth

```bash
geth --rinkeby --http --syncmode=light --rpcapi="eth,net,web3,personal,txpool" --allow-insecure-unlock  --rpccorsdomain "*"
geth attach http://127.0.0.1:8545
geth account import hard/myself/cryptocurrency-info-recovery/metamask/mforgood/key
web3.personal.importRawKey("11111111111111111111111111", "password")
personal.unlockAccount("0x540783999f4926a35fa30c804e13dd779072d204")
personal.listAccounts
eth.getBalance("0x540783999f4926a35fa30c804e13dd779072d204")
eth.getBalance(eth.accounts[1])
net.peerCount
eth.getCode("0xE683007C5BfB5BEBA5481C3e938dD4DC47cddbFC")
var voter = eth.contract([{"inputs":[{"internalType":"string","name":"option","type":"string"}],"name":"addOption","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOptions","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVotes","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"options","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"remove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startVoting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"option","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"optionName","type":"string"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]).at("0xE683007C5BfB5BEBA5481C3e938dD4DC47cddbFC");
voter
voter.addOption("mlibre" , {from: "0xD8f24D419153E5D03d614C5155f900f4B5C8A65C"})
```

## Web3
```bash
node deploy_contract.js -f voter.sol -c Voter -s "0xD8f24D419153E5D03d614C5155f900f4B5C8A65C" -p "password" -h "http://127.0.0.1:8545"
```