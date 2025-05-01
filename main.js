let provider;
let signer;
let currentAccount;

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected!");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  currentAccount = accounts[0];

  document.getElementById("walletAddress").innerText = `Connected: ${currentAccount}`;
}

export function disconnectWallet() {
  currentAccount = null;
  document.getElementById("walletAddress").innerText = "Disconnected";
}


// Bind functions to global window object
window.connectWallet = connectWallet;
window.disconnectWallet = disconnectWallet;
