// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

import "hardhat/console.sol";

// enter candidate name with reward fund and start timer
// get cadidate list
// cast vote to any candiate
// stop
// showResult on timmer out
contract Voting {
  mapping(string => uint256) s_candidatemap;

  address[] numberOFVoter;

  constructor(string memory candiate1, string memory candiate2) payable {
    s_candidatemap[candiate1] = 0;
    s_candidatemap[candiate2] = 0;
    console.log("address(this).balance");
    console.log(address(this).balance);
  }
}
