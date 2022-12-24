import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SCAN_KEY = process.env.SCAN_KEY;
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: {
      goerli: SCAN_KEY || "",
    },
  },
};
