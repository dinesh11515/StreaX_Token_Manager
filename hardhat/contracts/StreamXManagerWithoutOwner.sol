// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {StreaXToken} from "./StreaXToken.sol";
import {StreaXNFT} from "./StreaXNFT.sol";

contract StreaXManagerWithoutOwner {
    address public immutable streaXTokenAddress;
    address public immutable streaXNFTAddress;

    constructor(address _streaXTokenAddress, address _streaXNFTAddress) {
        streaXTokenAddress = _streaXTokenAddress;
        streaXNFTAddress = _streaXNFTAddress;
    }

    function mintTokens(address to, uint256 amount) external {
        StreaXToken(streaXTokenAddress).mint(to, amount);
    }

    function mintNFT(address to, string memory _tokenURI) external {
        StreaXNFT(streaXNFTAddress).mint(to, _tokenURI);
    }
}
