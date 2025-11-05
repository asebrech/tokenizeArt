// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title UNSC42
 * @dev ERC-721 NFT contract for 42 School TokenizeArt project
 * @notice Implements owner-controlled minting with IPFS metadata support
 */
contract UNSC42 is ERC721URIStorage, Ownable {
    /// @dev Counter for token IDs, starts at 0
    uint256 private _tokenIds;

    /**
     * @dev Constructor sets token name, symbol, and initial owner
     * @param initialOwner Address that will own the contract
     */
    constructor(address initialOwner)
        ERC721("UNSC-42", "UNSC")
        Ownable(initialOwner)
    {}

    /**
     * @dev Mints a new NFT with specified metadata URI
     * @param recipient Address that will receive the NFT
     * @param tokenURI IPFS URI pointing to token metadata
     * @return newItemId The ID of the newly minted token
     * @notice Only contract owner can call this function
     */
    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

