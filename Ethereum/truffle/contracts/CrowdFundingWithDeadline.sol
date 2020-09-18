// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;
import "./Utils.sol";

contract CrowdFundingWithDeadline {
    using Utils for *;
    event CampaignFinished(
        address addr,
        uint totalCollected,
        bool succeeded
    );
    enum State 
    {
        Ongoing, Failed, Succeeded, Paidout
    }
    string public name;
    uint public targetAmount;
    uint public fundingDeadline;
    address payable public beneficiary;
    State public state;
    mapping (address => uint) public amounts;
    bool public collected;
    uint public totalCollected;

    constructor(
        string memory contractName,
        uint targetAmountEth,
        uint durationInMin,
        address payable beneficiaryAddress
    ) public {
        name = contractName;
        targetAmount = Utils.etherToWei(targetAmountEth);
        fundingDeadline = currentTime() + Utils.minToSec(durationInMin);
        beneficiary = beneficiaryAddress;
        state = State.Ongoing;
    }
    modifier inState(State expectedSate){
        require(state == expectedSate , "Invalid Sate");
        _;
    }
    function contribute() public payable inState(State.Ongoing) {
        require(beforeDeadline() , "DeadLine");
        amounts[msg.sender] += msg.value;
        totalCollected += msg.value;
        if(totalCollected >= targetAmount)
        {
            collected = true;
        }
        
    }
    function collect() public inState(State.Succeeded) {
        if(beneficiary.send(totalCollected))
        {
            state = State.Paidout;
        }
        else
        {
            state = State.Failed;
        }
    }
    function withdraw() public inState(State.Failed) {
        require(amounts[msg.sender] > 0 , "Nothing was contributed");
        uint contributed = amounts[msg.sender];
        amounts[msg.sender] = 0;
        if(!msg.sender.send(contributed))
        {
            amounts[msg.sender] = contributed;
        }
    }
    function finishCrowdFunding() public inState(State.Ongoing) {
        require(!beforeDeadline() , "Cannot finish campaign before a deadline");
        if(!collected)
        {
            state = State.Failed;
        }
        else
        {
            state = State.Succeeded;
        }
        emit CampaignFinished(msg.sender, totalCollected, collected);
    }
    function currentTime() virtual internal view returns (uint) {
        return block.timestamp;
    }
    function beforeDeadline() public view returns (bool) {
        return currentTime() < fundingDeadline; 
    }
}