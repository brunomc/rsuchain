// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KlaveMusic is  Ownable, ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => Music) public musics;
    mapping(uint256 => uint256[]) public prevPrices;
    uint256 internal fee;
    constructor() Ownable() ERC721("KlaveMusic", "KVM") {
       fee = 0.1 * 10 ** 18;
    }

    struct Music {
        uint256 fileId;
        string name;
        string fileHash;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint256 price;
        bool forSale;
        uint256 uploadTime;
        address minter;
    }

    event MintedNFT(
        uint256 fileId,
        string fileHash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint price,
        bool forSale,
        uint256 uploadTime,
        address forger
    );

    function mint(
        string memory name,
        string memory _fileHash,
        uint256 _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription,
        uint256 _price,
        bool _forSale
    ) public payable {
        
        require(bytes(name).length > 0);
        // Make sure the file hash exists
        require(bytes(_fileHash).length > 0);
        // Make sure file type exists
        require(bytes(_fileType).length > 0);
        // Make sure file description exists
        require(bytes(_fileDescription).length > 0);
        // Make sure file fileName exists
        require(bytes(_fileName).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));
        // Make sure file size is more than 0
        require(_fileSize > 0);

        // Increment file id
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        // Add File to the contract
        musics[id] = Music(
            id,
            name,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            _price,
            _forSale,
            block.timestamp,
            msg.sender
        );

         _safeMint(msg.sender,id);
        if(msg.value >= _price){
            musics[id].price = _price;
        }
        if(_forSale){
            musics[id].forSale = true;
        }
        emit MintedNFT(
            id,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            _fileDescription,
            _price,
            _forSale,
            block.timestamp,
            msg.sender
        );
    }
//     function setForSale(uint256 _tokenId) external {
//     address owner = ownerOf(_tokenId);

//     require(isValidToken(_tokenId));
//     require(owner == msg.sender || authorized[owner][msg.sender]);

//     allowance[_tokenId] = address(this);
//     tokensForSale.push(_tokenId);
//     // set the sale price etc

//     emit Approval(owner, address(this), _tokenId);
// }

// function buy(uint256 _tokenId) external payable {
//     address buyer = msg.sender;
//     uint payedPrice = msg.value;

//     require(isValidToken(_tokenId));
//     require(getApproved(_tokenId) == address(this));
//     // require payedPrice >= salePrice

//     // pay the seller
//     // remove token from tokensForSale

//     transferFrom(ownerOf(_tokenId), buyer, _tokenId);
// }
function updatePriceToken(uint256 _tokenId, uint _newPrice) internal returns (uint256) {
    prevPrices[_tokenId].push(musics[_tokenId].price);
    musics[_tokenId].price = _newPrice;
    return _newPrice;
}
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }
}
