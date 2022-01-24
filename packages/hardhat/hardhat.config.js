require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("hardhat-deploy");
const fs = require("fs");
const { task } = require("hardhat/config");
require("@nomiclabs/hardhat-ethers");

const defaultNetwork = "localhost";
const mnemonicPath = "m/44'/52752'/0'/0"; // derivation path used by Celo

// This is the mnemonic used by celo-devchain
const DEVCHAIN_MNEMONIC =
  "concert load couple harbor equip island argue ramp clarify fence smart topic";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task(
  "devchain-keys",
  "Prints the private keys associated with the devchain",
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const hdNode = hre.ethers.utils.HDNode.fromMnemonic(DEVCHAIN_MNEMONIC);
    for(let i = 0; i < accounts.length; i++) {
      const account = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
      console.log(`Account ${i}\nAddress: ${account.address}\nKey: ${account.privateKey}`);
    }
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic: DEVCHAIN_MNEMONIC,
      },
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: mnemonicPath,
      },
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: mnemonicPath,
      },
      chainId: 42220,
    },
  },
  solidity: {
    version: "0.8.4",
  },
  namedAccounts: {
    deployer: 0,
  },
};