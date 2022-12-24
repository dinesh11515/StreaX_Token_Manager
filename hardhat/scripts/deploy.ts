const hre = require("hardhat");
async function main() {
  const StreaXToken = await hre.ethers.getContractFactory("StreaXToken");
  const streaXToken = await StreaXToken.deploy();
  await streaXToken.deployed();
  console.log("StreaXToken deployed to:", streaXToken.address);

  const StreaXNFT = await hre.ethers.getContractFactory("StreaXNFT");
  const streaXNFT = await StreaXNFT.deploy();
  await streaXNFT.deployed();
  console.log("StreaXNFT deployed to:", streaXNFT.address);

  const StreaXManager = await hre.ethers.getContractFactory("StreaXManager");
  const streaXManager = await StreaXManager.deploy(
    streaXToken.address,
    streaXNFT.address
  );
  await streaXManager.deployed();

  console.log("Contract deployed to:", streaXManager.address);

  // Transfer ownership of the token contracts to the StreaXManager
  await streaXToken.transferOwnership(streaXManager.address);
  await streaXNFT.transferOwnership(streaXManager.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
