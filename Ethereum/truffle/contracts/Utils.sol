// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6 <0.8.0;
pragma experimental ABIEncoderV2;

library Utils {
    function etherToWei(uint sumInEth) public pure returns(uint) {
		 return sumInEth * 1 ether;
	 }
	 function minToSec(uint timeInMin) public pure returns(uint) {
		 return timeInMin * 1 minutes;
	 }
}