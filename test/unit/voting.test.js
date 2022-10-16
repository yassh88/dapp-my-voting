const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")

describe("Voting", () => {
  let deployer
  let voting
  let accounts
  let votingPeriodTime
  const sendValue = ethers.utils.parseEther("1")
  console.log("sendValue", sendValue)
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer
    accounts = await ethers.getSigners()
    await deployments.fixture("all")
    voting = await ethers.getContract("Voting", deployer)
    votingPeriodTime = await voting.getVotingPeriodTime()
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
  it.only("Vote to condiate performUpkeep", async () => {
    voting.connect(accounts[2])
    await network.provider.send("evm_increaseTime", [
      votingPeriodTime.toNumber() + 1,
    ])
    await network.provider.request({ method: "evm_mine", params: [] })
    const txResponse = await voting.performUpkeep("0x")
    const txReceipt = await txResponse.wait(1) // waits 1 block
    const numOFCandidate = txReceipt.events[0].args[0]
    const votes = txReceipt.events[0].args[1]
    expect(numOFCandidate).to.have.members(["Yashwant", "Sakshi"])
    expect(votes[0].toString()).to.equal("0")
    expect(votes[1].toString()).to.equal("0")
  })
})
