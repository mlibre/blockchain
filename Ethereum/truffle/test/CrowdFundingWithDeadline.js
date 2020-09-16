const CrowdFundingWithDeadline = artifacts.require("CrowdFundingWithDeadline");

contract('CrowdFundingWithDeadline' , async accounts => {
	let contract;
	let account = accounts[0];
	let beneficiary = accounts[1];
	const ONE_ETH = 1000000000000000000;
	const Ongoing_State = 0;
	const Faild_State = 1;
	const Succeeded_State = 2;
	const Paidout_State = 3;

	beforeEach(async function () {
		contract = await CrowdFundingWithDeadline.new(
			'funding',
			1,
			10,
			beneficiary,
			{
				from: account,
				gas: 2000000
			}
		);
	});
	it('contract is initiated', async function () {
		let camName = await contract.name.call();
		expect(camName).to.equal('funding');

		let amount = await contract.targetAmount.call();
		expect(Number.parseInt(amount)).to.equal(ONE_ETH);

		let beneficiaryAddress = await contract.beneficiary.call();
		expect(beneficiaryAddress).to.equal(beneficiary);

		let state = await contract.state.call();
		expect(state.valueOf().toNumber()).to.equal(Ongoing_State);
	});

	it('Funs are contributed', async function () {
		await contract.contribute({
			value: ONE_ETH,
			from: account
		});
		let contributed = await contract.amounts.call(account);
		expect(Number.parseInt(contributed)).to.equal(ONE_ETH);

		let totalCollected = await contract.totalCollected.call();
		expect(Number.parseInt(totalCollected)).to.equal(ONE_ETH);
	});
});

function toNumbers(bigNums) {
	return bigNums.map(function (num) {
		return num.toNumber();
	})
}