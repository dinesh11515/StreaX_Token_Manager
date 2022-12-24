import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const hre = require("hardhat");

describe("StreaX Manager", function () {
  let streaXManager: Contract;
  let streaXNFT: Contract;
  let streaXToken: Contract;
  let signer: SignerWithAddress;
  let account: SignerWithAddress;

  before(async () => {
    const accounts = await hre.ethers.getSigners();
    signer = accounts[0];
    account = accounts[1];

    const StreaXToken = await hre.ethers.getContractFactory("StreaXToken");
    streaXToken = await StreaXToken.deploy();
    await streaXToken.deployed();

    const StreaXNFT = await hre.ethers.getContractFactory("StreaXNFT");
    streaXNFT = await StreaXNFT.deploy();
    await streaXNFT.deployed();

    const StreaXManager = await hre.ethers.getContractFactory("StreaXManager");
    streaXManager = await StreaXManager.deploy(
      streaXToken.address,
      streaXNFT.address
    );
    await streaXManager.deployed();

    // Transfer ownership of the token contracts to the StreaXManager
    await streaXToken.transferOwnership(streaXManager.address);
    await streaXNFT.transferOwnership(streaXManager.address);
  });

  it("Should mint a new NFT", async function () {
    const tx = await streaXManager.mintNFT(
      account.address,
      "https://ipfs.io/ipfs/QmTmP7JjKzr6VxU6j9X4V4e6D4y6J2Qg5jK6YnZ6YHg7q3"
    );
    await tx.wait();

    const balance = await streaXNFT.balanceOf(account.address);
    expect(balance).to.equal(1);
  });

  it("Should mint a tokens", async function () {
    const tx = await streaXManager.mintTokens(account.address, 100);
    await tx.wait();

    const balance = await streaXToken.balanceOf(account.address);
    expect(balance).to.equal(100);
  });
});
