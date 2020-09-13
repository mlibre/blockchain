const Voter = artifacts.require("Voter");

contract('Voter' , async accounts => {
	let voter;
	let account;
	beforeEach(async function () {
		account = accounts[0];
		voter = await Voter.new();
		await voter.addOption("masoud", {from: account});
		await voter.addOption("hello", {from: account});
		await voter.startVoting({from: account , gas: 600000});
	});
	it('has no vote by default', async function () {
		let votes = await voter.getVotes.call();
		expect(toNumbers(votes)).to.deep.equal([0,0]);
	});
	it('can vote by a string', async function () {
		await voter.vote(
			'masoud',
			{
				from: account
			}
		)
		let votes = await voter.getVotes.call();
		expect(toNumbers(votes)).to.deep.equal([1,0]);
	});
	it('can vote by a number', async function () {
		await voter.methods['vote(uint256)'](
			1,
			{
				from: account
			}
		)
		let votes = await voter.getVotes.call();
		expect(toNumbers(votes)).to.deep.equal([0,1]);
	});
	it('cannot vote twice', async function () {
		try {
			await voter.methods['vote(uint256)'](1,{from: account});
			await voter.methods['vote(uint256)'](1,{from: account});
			expect.fail();
		} catch (e) {
			expect(e.message).to.include.any.string('VM Exception while processing transaction');
		}
	})
});

function toNumbers(bigNums) {
	return bigNums.map(function (num) {
		return num.toNumber();
	})
}