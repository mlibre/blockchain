My blockchain repository.  
===
Containing aritcles, examples and ...

## Table of content
+ [Explenations](#explenations)
  + [Geth](#geth)
  + [MetaMask](#metamask)
  + [Infura](#infura)
+ [Other Stuff](#other-stuff)

## Explenations

### Geth
> Official Go implementation of the Ethereum protocol [link](https://geth.ethereum.org/)

So with `geth` you can:

 1. Run an Ethereum node
 2. Sending transactions
 3. Creating accounts
 4. Managing Wallets
 5. Communicate with Ethereum network
 6. Mining and ...

### MetaMask
> A crypto wallet & gateway to blockchain apps [link](https://metamask.io/)

So `MetaMask` is just a way to communicate with Ethereum network without running a Ethereum node like `geth`. but how they manage it? it seems they uses https://infura.io/ to send a transaction and ....
`MetaMask` is also offering other features ... 

### Infura
> Ethereum & IPFS APIs [enter link description here](https://infura.io/)

So as it says they are providing APIs, so we can easily communicate with Ethereum netwrok. in background they probably have `geth` nodes or other kind of nodes.

## Other Stuff
cd ~/.ethereum/rinkeby/
rm PRIVATE_KEYS, Account
https://rinkeby.etherscan.io/address/CONTRACT_ADDRESS
