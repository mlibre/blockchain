let CrowdFundingWithDeadline = artifacts.require("CrowdFundingWithDeadline");

module.exports = async function (deployer) {
  await deployer.deploy(CrowdFundingWithDeadline,
    "Test Campagin" , 1, 5, "0xe25505186161b3AfF2b8c64bb997Bba13AD9846A");
};
