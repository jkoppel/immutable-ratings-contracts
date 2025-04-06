// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title Thumbs Down (TDN)
 * @author immutable-ratings
 */
contract TDN is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @dev The number of downvotes that a user has created
    mapping(address user => uint256 downvotes) public downvotes;

    constructor() ERC20("Thumbs Down", "TDN") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(MINTER_ROLE, DEFAULT_ADMIN_ROLE);
    }

    /**
     * @notice Mints token to the given address
     * @param minter The address of the user minting the tokens
     * @param to The address to mint the tokens to
     * @param amount The amount of tokens to mint
     */
    function mint(address minter, address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
        downvotes[minter] += amount;
    }
}
