const CONTRACT_ADDRESS = '0x1252a7072D7921ccb92e32cf86ac8D6dC2d8f0B9'
const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "pairSet",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_key",
        "type": "string"
      }
    ],
    "name": "getValue",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_key",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_value",
        "type": "string"
      }
    ],
    "name": "setPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export {
  CONTRACT_ADDRESS,
  CONTRACT_ABI
}