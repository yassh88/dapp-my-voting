// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

import "hardhat/console.sol";

// enter candidate name with reward fund and start timer
// get cadidate list
// cast vote to any candiate
// stop
// showResult on timmer out
error Voting_CandiateNameNotFound();

contract Voting {
  mapping(string => uint256) s_candidatemap;

  string[] s_candidateList;

  constructor(string[] memory candiates) payable {
    for (uint256 i = 0; i < candiates.length; i++) {
      s_candidatemap[candiates[i]] = 0;
      s_candidateList.push(candiates[i]);
    }
    console.log(address(this).balance);
  }

  function getCandidateVote(string calldata name)
    public
    view
    returns (uint256)
  {
    return s_candidatemap[name];
  }

  function getCandidateList() public view returns (string[] memory) {
    return s_candidateList;
  }

  function voteToCandidate(string memory candiate) public {
    s_candidatemap[candiate] = s_candidatemap[candiate] + 1;
  }
}
