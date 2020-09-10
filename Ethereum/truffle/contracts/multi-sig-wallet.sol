// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract MultiSigWallet {
    uint minApprovers;
    address payable beneficiary;
    address payable owner;
    
    mapping (address => bool) approvedBy;
    mapping (address => bool) isApprover;
    uint approvalsNum;
    
    constructor(
        address payable _beneficiary,
        address[] memory _approvers,
        uint _minApprovers
        ) public payable {
            require(_minApprovers <= _approvers.length , "more than min approvers");
            minApprovers = _minApprovers;
            beneficiary = _beneficiary;
            owner = msg.sender;
            for(uint i = 0 ; i < _approvers.length; i++) {
                address approver = _approvers[i];
                isApprover[approver] = true;
            }
        }
    function reject() public
    {
        require(isApprover[msg.sender] , "not an approver");
        selfdestruct(owner);
    }
    function approve() public
    {
        require(isApprover[msg.sender] , "not an approver");
        if(!approvedBy[msg.sender])
        {
            approvalsNum++;
            approvedBy[msg.sender] = true;
        }
        if(approvalsNum == minApprovers)
        {
            beneficiary.send(address(this).balance);
            selfdestruct(owner);
        }
    }

    function remove() public {
        selfdestruct(owner);
    }
}