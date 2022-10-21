const { network, ethers } = require("hardhat")
require("dotenv").config()
const fs = require("fs")

const FRON__CONTRACT_ADDRESS = "../ui-my-voting/constants/contractAddress.json"
const FRON__ABI = "../ui-my-voting/constants/abi.json"

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    udpateContractAddress()
    udpateABI()
  }
}

async function udpateABI() {
  const voting = await ethers.getContract("Voting")
  console.log("ethers.utils.FormatTypes.json")
  console.log(voting.interface)
  fs.writeFileSync(
    FRON__ABI,
    voting.interface.format(ethers.utils.FormatTypes.json)
  )
}

async function udpateContractAddress() {
  const voting = await ethers.getContract("Voting")
  const chainId = network.config.chainId.toString()
  const currentAddressFileJSON = JSON.parse(
    fs.readFileSync(FRON__CONTRACT_ADDRESS, "utf8")
  )
  if (chainId in currentAddressFileJSON) {
    if (!currentAddressFileJSON[chainId].includes(voting.address)) {
      currentAddressFileJSON[chainId].push(voting.address)
    }
  } else {
    currentAddressFileJSON[chainId] = [voting.address]
  }
  fs.writeFileSync(
    FRON__CONTRACT_ADDRESS,
    JSON.stringify(currentAddressFileJSON)
  )
}

module.exports.tags = ["all", "frontend"]
