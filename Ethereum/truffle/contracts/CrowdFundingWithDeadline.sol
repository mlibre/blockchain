// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract CrowdFundingWithDeadline {
    enum State 
    {
        Ongoing, Faild, Succeeded, Paidout
    }
    string public name;
    uint public targetAmount;
    uint public fundingDeadline;
    address public beneficiary;
    State public state;

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
    function currentTime() internal view returns (uint) {
        return block.timestamp;
    }
}