let CrowdFundingWithDeadline = artifacts.require("CrowdFundingWithDeadline");

module.exports = async function (deployer) {
  await deployer.deploy(CrowdFundingWithDeadline,
    "Test Campagin" , 1, 5, "0x57CCd63D717c2D360D35E66b79B0529c1d8d607F");
};
