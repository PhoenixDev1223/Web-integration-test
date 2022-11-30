import React, { useState, useEffect } from "react"
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Button from "./components/base/Button"
import 'react-notifications/lib/notifications.css'
import './App.css'

const CHAINS = {
  "0x1": "Ethereum Mainnet",
  "0x61": "BSC Testnet",
  "0x38": "BSC Mainnet",
  "0x5": "Goerli test network",
  "0xaa36a7": "Sepolia test network"
}

function App() {
  const [wallet, setWallet] = useState('Connect')
  const [chainId, setChainId] = useState("")

  const connectMetamask = async () => {
    if (typeof window.ethereum === 'undefined') {
      NotificationManager.error('Please install Metamask', 'Error', 3000)
      return
    }

    await window.ethereum.request({ method: "eth_requestAccounts" })
      .then(async (accounts) => {
        setWallet(accounts[0])
        setChainId(window.ethereum.chainId)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on('chainChanged', (id) => setChainId(id))
    }
  }, [])

  return (
    <div className="main-body">
      <NotificationContainer />
      <div className="wallet-address">
        <h1>Wallet Address</h1>
        <br/>
        <h2>{wallet === 'Connect' ? '' : wallet}</h2>
      </div>
      <div className="wallet-address">
        <h1>Chain</h1>
        <br/>
        <h2>{chainId === "" ? chainId : CHAINS[chainId]}</h2>
      </div>
      <div className="btn">
        <Button
          onClick={connectMetamask}
          width={"180px"}
          height={"50px"}
          color="white"
          textColor="black"
          textContent="Connect"
          fontSize="25px"
        />
      </div>
    </div>
  )
}

export default App
