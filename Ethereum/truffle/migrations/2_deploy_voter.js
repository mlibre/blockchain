const Voter = artifacts.require("Voter.sol");

module.exports = async function (deployer) {
  await deployer.deploy(Voter);
};
