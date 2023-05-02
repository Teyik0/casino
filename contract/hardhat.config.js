require('@nomicfoundation/hardhat-toolbox');

const ALCHEMY_API_KEY = 'i08ih6hejU729iNqifrJ9Cy-rqe-re1e';
const SEPOLIA_PRIVATE_KEY =
  'b49c20aa062b87b70db8cca34ca610e6ddde05052f165bbbadcf480963679936';

module.exports = {
  solidity: '0.8.11',
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
