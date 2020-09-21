#
```bash
contracts:
ln -s /home/mlibre/hard/projects/blockchain/Ethereum/truffle/build/contracts/ /home/mlibre/hard/projects/blockchain/Web-apps/crowdfund/src/contracts

Ganahce:
Create a new workdspace in ganash with bigger gas limit, lower fee
run ganash

truffle:
Set deployer account address. Ganahce first account
truffle compile
truffle migrate --reset

vscode:
debug.javascript.usePreview: false

web3 - MetaMask:
import account with ganache seed
set metamask netwrok in ganash
To update the block.timestamp(last blockmined) i have to make a transaction in ganache. somehow like remigrating contracts but using the old ones
```