// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StreaXNFT is ERC721, Ownable {
    uint256 tokenId;
    mapping(uint256 => string) public tokenURIs;

    constructor() ERC721("StreaXNFT", "STX") {}

    function mint(address to, string memory _tokenURI) public onlyOwner {
        tokenId++;
        _mint(to, tokenId);
        tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return tokenURIs[_tokenId];
    }
}
