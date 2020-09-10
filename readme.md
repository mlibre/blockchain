Full example in eth blockchain. `solc` , `geth` , `web3`.

* Deploying contract
* Gas estimate
* Unlocking account
* Geth light node
* Web3 usage in nodejs
* Rinkeby node
* Real World contract examples: Voter, multi-Sig-Wallet
* ....

# Installtion

```bash
sudo pacman -S go-ethereum solc
npm i web3 solc --save
```
# Solc

```bash
solc multi-sig-wallet.sol  -o ./bin/ --combined-json=abi,bin,metadata --pretty-json --optimize --metadata --gas --abi --bin --overwrite --color
```

# Geth

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
```

# Web3 client
```bash
node deploy_contract.js -f voter.sol -c Voter -s "0xD8f24D419153E5D03d614C5155f900f4B5C8A65C" -p "password" -h "http://127.0.0.1:8545"
```

# Other stuff
cd ~/.ethereum/rinkeby/
rm PRIVATE_KEYS, Account
https://rinkeby.etherscan.io/address/CONTRACT_ADDRESS


# Explenations
`geth`:
> Official Go implementation of the Ethereum protocol [link][1]

So with `geth` you can:

 1. Run an Ethereum node
 2. Sending transactions
 3. Creating accounts
 4. Managing Wallets
 5. Communicate with Ethereum network
 6. Mining and ...

`MetaMask`:
> A crypto wallet & gateway to blockchain apps [link][2]

So `MetaMask` is just a way to communicate with Ethereum network without running a Ethereum node like `geth`. but how they manage it? it seems they uses https://infura.io/ to send a transaction and ....
`MetaMask` is also offering other features ... 

What is `infura`?
> Ethereum & IPFS APIs [enter link description here][3]

So as it says they are providing APIs, so we can easily communicate with Ethereum netwrok. in background they probably have `geth` nodes or other kind of nodes.

  [1]: https://geth.ethereum.org/
  [2]: https://metamask.io/
  [3]: https://infura.io/