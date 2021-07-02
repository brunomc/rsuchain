/* eslint-disable no-undef */
// @ts-ignore
const RsuReputation = artifacts.require("RsuReputation");

module.exports = function(deployer) {
  deployer.deploy(RsuReputation);
};
