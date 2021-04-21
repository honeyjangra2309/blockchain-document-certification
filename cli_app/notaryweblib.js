
//const Web3 = require('web3');
var web3 = document.createElement('script');
web3.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/web3/1.3.5/web3.min.js');
document.head.appendChild(web3);
//const jsSHA = require("jssha");
var jsSHA = document.createElement('script');
web3.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jsSHA/3.2.0/sha.js');
document.head.appendChild(jsSHA);

//const fs = require('fs');

 web3 = undefined;
 contract = undefined;

function init () {
  //set up network
  let provider = new Web3.providers.HttpProvider("http://localhost:8545");
  web3 = new Web3(provider);

  //contract abi
  let abi = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "hash",
            "type": "bytes32"
          }
        ],
        "name": "addDocHash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "docHashes",
        "outputs": [
          {
            "name": "mineTime",
            "type": "uint256"
          },
          {
            "name": "blockNumber",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "hash",
            "type": "bytes32"
          }
        ],
        "name": "findDocHash",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
   

  //asign contract address
  let address = "0xbAb1bb4FCB57D25549E76de8173e37f958498D9e";

  //init contract
  contract = new web3.eth.Contract(abi, address);  
};

//get a SHA-256 hash from a file --> works synchronously
function calculateHash (fileName) {
  //let fileContent = fs.readFileSync(fileName);
  let fileContent = FileReader.readAsArrayBuffer(fileName);
  return calculateHashBytes(fileContent);
};

//get a SHA-256 hash from a data Buffer --> works synchronously
function calculateHashBytes (data) {
  let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
  shaObj.update(data);
  let hash = "0x" + shaObj.getHash("HEX");
  return hash;
};

//sends a hash to the blockchain
function sendHash (hash, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.addDocHash(hash).send({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

//looks up a hash on the blockchain
function findHash (hash, callback) {
  contract.methods.findDocHash(hash).call( function (error, result) {
    if (error) callback(error, null);
    else {
      let resultObj = {
        mineTime:  new Date(result[0] * 1000),
        blockNumber: result[1]
      }
      callback(null, resultObj);
    }
  });
};

 NotaryExports = {
  findHash : findHash,
  sendHash : sendHash,
  calculateHash : calculateHash,
  init : init,
  calculateHashBytes : calculateHashBytes,
};

module.exports = NotaryExports;