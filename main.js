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

export async function requestFaucet() {
  if (!currentAccount) {
    alert("Connect your wallet first!");
    return;
  }

  try {
    const faucetUrl = `https://faucet-api.testnet.plumenetwork.xyz/api/faucet?address=${currentAccount}`;
    const res = await fetch(faucetUrl);
    const result = await res.json();

    if (res.ok) {
      document.getElementById("status").innerText = "✅ Faucet request successful!";
    } else {
      document.getElementById("status").innerText = `❌ Error: ${result.message}`;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "❌ Faucet request failed.";
  }
}

// Bind functions to global window object
window.connectWallet = connectWallet;
window.disconnectWallet = disconnectWallet;
window.requestFaucet = requestFaucet;
