let bitcoin = require('bitcoinjs-lib');
const axios = require('axios').default;
const TESTNET = bitcoin.networks.testnet;

const keyPair = bitcoin.ECPair.makeRandom({ network: TESTNET });
const { address } = bitcoin.payments.p2pkh({
  pubkey: keyPair.publicKey,
  network: TESTNET,
});;
let wif = keyPair.toWIF()
// console.log(address, keyPair.publicKey.toString('hex') , keyPair.privateKey.toString('hex') , wif);

let fAddress = 'mk3Q65BxQnxi93Kue3vk4yTLqLRg3DqrnK';
let fPuk = '028b7b36ee695dc742167c6b70a2b44eb88a73ff742c9d03a92e57bda03c446b79';
let fprk = '643f1903bd766f7428cdf312eeec8ed74c5dba8a08f0b4bb836cc8fdb1ffe32d'
let fwif = 'cQwZsxbmkwjPwS6WLKkDJqPrCyjmtp9zquSf1umFBn1f45Z46u8Z';
let fkeyPair = bitcoin.ECPair.fromWIF(fwif , TESTNET);

let f2Address = 'n333Qo6QZ1WwChBKbjTKEbk4VN1GBBT4sA';
let f2PublicKey = '029667c12c6d4b67c20525f5ab3aad89e1f4a88d058f6f0dbe2b8f0c17ce9b5027';
let f2PrivateKey = '62ec4a896f3b264211ab035c1421b73d23623c2681319b546545838c81b27b17';
let f2wif = 'cQtzfbo9Hxb31QY7Zfr4TCboR9GmBAHUug4tBuTmBM5goxD3GCGf'
let f2KeyPair = bitcoin.ECPair.fromWIF(f2wif , TESTNET);
let f2keyPairWpkh = bitcoin.payments.p2wpkh({pubkey: f2KeyPair.publicKey, network: TESTNET});

(async function  () {
	try {
		const result = await axios.get(`https://testnet.blockchain.info/rawaddr/${fAddress}`);
		let balance = result.data.final_balance;
		let latestTx = result.data.txs[0].hash;
		console.log('testAddress balance:' , balance);
		console.log('latest tx: ', latestTx);
		var txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
		let sendAmount = 15000;
		let fee = 26456;
		let whatIsLeft = balance - fee - sendAmount;
		txb.addInput(latestTx, 1);
		txb.addOutput(f2Address, sendAmount);
		txb.addOutput(f2Address, whatIsLeft);
		txb.sign(0, fkeyPair);
		let body = txb.build().toHex();
		console.log(body);
		// const psbt = new bitcoin.Psbt({ network: TESTNET });
		// psbt.addInput({
		// 	hash: '25ba0c45cadf92ded94432101d286975dcdb865df44b68da597910ea783cff74',
		// 	index: 0,
		// 	nonWitnessUtxo: Buffer.from(latestTx, 'hex'),
		// 	redeemScript: p2wpkh.output
		//  });
	} catch (e) {
	console.log(e);
	}
})();