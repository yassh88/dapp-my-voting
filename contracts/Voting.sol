// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

// enter candidate name with reward fund and start timer
// get cadidate list
// cast vote to any candiate
// stop
// showResult on timmer out
error Voting_CandiateNameNotFound();
error Voting_WaitForAtLeastOneVote();
error Voting_VoterAlreadyDoneVoting();

contract Voting is AutomationCompatibleInterface {
  mapping(string => uint256) s_candidateMap;
  mapping(address => bool) s_voterList;
  bool public isVotingCompleted = false;

  uint256 public immutable i_votingPeriodTime;
  uint256 public s_lastTimeStamp;

  string[] s_candidateList;

  event publishVoitingResult(string[], uint256[]);

  constructor(string[] memory _candiates, uint256 _votingPeriodTime) payable {
    for (uint256 i = 0; i < _candiates.length; i++) {
      s_candidateMap[_candiates[i]] = 0;
      s_candidateList.push(_candiates[i]);
    }
    i_votingPeriodTime = _votingPeriodTime;
    s_lastTimeStamp = block.timestamp;
    console.log(address(this).balance);
  }

  function checkUpkeep(
    bytes memory /* checkData */
  )
    public
    view
    override
    returns (
      bool upkeepNeeded,
      bytes memory /* performData */
    )
  {
    upkeepNeeded = (block.timestamp - s_lastTimeStamp) > i_votingPeriodTime;
    return (upkeepNeeded, "0x0");
    // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
  }

  function performUpkeep(
    bytes calldata /* performData */
  ) external override {
    //We highly recommend revalidating the upkeep in the performUpkeep function
    (bool upkeepNeeded, ) = checkUpkeep("");
    bool isAnyVoteCasted = false;
    for (uint256 i = 0; i < s_candidateList.length; i++) {
      if (s_candidateMap[s_candidateList[i]] > 0) {
        isAnyVoteCasted = true;
        break;
      }
    }
    if (!isAnyVoteCasted) revert Voting_WaitForAtLeastOneVote();

    if ((block.timestamp - s_lastTimeStamp) > i_votingPeriodTime) {
      s_lastTimeStamp = block.timestamp;
      isVotingCompleted = true;
    }
    uint256[] memory voteCountArray = new uint256[](s_candidateList.length);
    for (uint256 i = 0; i < s_candidateList.length; i++) {
      s_candidateMap[s_candidateList[i]] = 0;
      voteCountArray[i] = (s_candidateMap[s_candidateList[i]]);
    }
    emit publishVoitingResult(s_candidateList, voteCountArray);
    // We don't use the performData in this example. The performData is generated by the Automation Node's call to your checkUpkeep function
  }

  function voteToCandidate(string memory candiate) public {
    if (s_voterList[msg.sender] == true) revert Voting_VoterAlreadyDoneVoting();
    s_voterList[msg.sender] = true;
    s_candidateMap[candiate] = s_candidateMap[candiate] + 1;
  }

  function getCandidateVote(string calldata name)
    public
    view
    returns (uint256)
  {
    return s_candidateMap[name];
  }

  function getCandidateList() public view returns (string[] memory) {
    return s_candidateList;
  }

  function getVotingPeriodTime() public view returns (uint256) {
    return i_votingPeriodTime;
  }
}
