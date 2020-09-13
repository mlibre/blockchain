// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Voter.sol";


contract TestVoter {
    function testVoteWithNumber() public {
        Voter voter = new Voter();
        voter.addOption("one");
        voter.addOption("two");
        voter.startVoting();
        voter.vote(0);
        uint[] memory votes = voter.getVotes();
        uint[] memory expected = new uint[](2);
        expected[0] = 1;
        expected[1] = 0;
        Assert.equal(votes, expected, "not true");
    }
}