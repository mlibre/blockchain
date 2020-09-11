// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Voter {
    struct OptionPos
    {
        uint pos;
        bool exsit;
    }
    uint[] public votes;
    string[] public options;
    mapping (address => bool) hasVoted;
    mapping (string => OptionPos) posOfOption; 
    
    // with experimental
    // constructor(string[] memory _options) public {
    //     options = _options;
    //     votes = new uint[](options.length);
    //     for(uint i = 0 ; i < options.length; i++){
    //         OptionPos memory optionPos = OptionPos(i,true);
    //         string memory optionName = options[i];
    //         posOfOption[optionName] = optionPos;
    //     }
    // }
    function vote(uint option) public
    {
        require(option >= 0 && option < options.length , "invalid option");
        require(!hasVoted[msg.sender] , "Already voted");
        votes[option] = votes[option] + 1;
        hasVoted[msg.sender] = true;
    }
    function vote(string memory optionName) public
    {
        require(!hasVoted[msg.sender] , "Already voted");
        OptionPos memory optionPos = posOfOption[optionName];
        require(optionPos.exsit , "Option does not exist");
        votes[optionPos.pos] = votes[optionPos.pos] + 1;
        hasVoted[msg.sender] = true;
    }
    function getOptions() public view returns(string[] memory)
    {
     return options;   
    }
    function getVotes() public view returns(uint[] memory)
    {
        return votes;
    }

    function remove() public {
        selfdestruct(0xc9b64496986E7b6D4A68fDF69eF132A35e91838e);
    }

    // without exprimental
    bool vottingStarted;
    function addOption(string memory option) public {
        require(!vottingStarted);
        options.push(option);
    }
    function startVoting() public{
        require(!vottingStarted);
        votes = new uint[](options.length);
        for(uint i = 0 ; i < options.length; i++){
            OptionPos memory optionPos = OptionPos(i,true);
            posOfOption[options[i]] = optionPos;
        }
        vottingStarted = true;
    }
}