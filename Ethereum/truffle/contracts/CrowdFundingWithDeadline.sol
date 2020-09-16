// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract CrowdFundingWithDeadline {
    enum State 
    {
        Ongoing, Failed, Succeeded, Paidout
    }
    string public name;
    uint public targetAmount;
    uint public fundingDeadline;
    address public beneficiary;
    State public state;
    mapping (address => uint) public amounts;
    bool public collected;
    uint public totalCollected;

    constructor(
        string memory contractName,
        uint targetAmountEth,
        uint durationInMin,
        address beneficiaryAddress
    ) public {
        name = contractName;
        targetAmount = targetAmountEth * 1 ether;
        fundingDeadline = currentTime() + durationInMin * 1 minutes;
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
    }
    function currentTime() virtual internal view returns (uint) {
        return block.timestamp;
    }
    function beforeDeadline() public view returns (bool) {
        return currentTime() < fundingDeadline; 
    }
}