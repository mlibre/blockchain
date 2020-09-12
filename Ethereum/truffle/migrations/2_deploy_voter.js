const Voter = artifacts.require("Voter");

module.exports = async function (deployer) {
  await deployer.deploy(Voter);
};
