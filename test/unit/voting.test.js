const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")

describe("Voting", () => {
  let deployer
  let voting
  let accounts
  const sendValue = ethers.utils.parseEther("1")
  console.log("sendValue", sendValue)
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer
    accounts = await ethers.getSigners()
    await deployments.fixture("all")
    voting = await ethers.getContract("Voting", deployer)
  })
  it("get candidate votes", async () => {
    let numOFCandidate = await voting.getCandidateVote("Yashwant")
    assert.equal(numOFCandidate.toString(), 0)
    numOFCandidate = await voting.getCandidateVote("sakshi")
    assert.equal(numOFCandidate.toString(), 0)
  })
  it("get candidate list", async () => {
    let numOFCandidate = await voting.getCandidateList()
    expect(numOFCandidate).to.have.members(["Yashwant", "Sakshi"])
  })
  it.only("Vote to condiate", async () => {
    voting.connect(accounts[2])
    let numOFCandidate = await voting.voteToCandidate("Yashwant")
    let numberOfVote = await voting.getCandidateVote("Yashwant")
    assert.equal(numberOfVote.toString(), 1)
  })
})
