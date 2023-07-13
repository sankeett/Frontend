// app.js
window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
    } catch (error) {
      // User denied account access...
      console.error('User denied account access');
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

async function setValue() {
  const contractAddress = '<YOUR_CONTRACT_ADDRESS>'; // Replace with your actual contract address
  const contractABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newValue",
          "type": "uint256"
        }
      ],
      "name": "setValue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const newValue = 42; // Replace with the desired value
  await contract.methods.setValue(newValue).send({ from: web3.eth.defaultAccount });
}

async function getValue() {
  const contractAddress = '<YOUR_CONTRACT_ADDRESS>'; // Replace with your actual contract address
  const contractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "getValue",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const value = await contract.methods.getValue().call();
  document.getElementById('result').innerHTML = `Current value: ${value}`;
}
