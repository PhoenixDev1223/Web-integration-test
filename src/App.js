import React, { useState, useEffect } from "react"
import Web3 from "web3"
import { useDispatch, useSelector } from "react-redux"
import { NotificationContainer, NotificationManager } from 'react-notifications'
import CircleLoader from "react-spinners/CircleLoader"
import Button from "./components/base/Button"
import TextInput from "./components/base/TextInput"
import { SET_LOADING, SET_NOTIFICATION, SET_NOTIFICATION_INITIAL } from "./redux/type"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants/Constants"
import 'react-notifications/lib/notifications.css'
import './App.css'
import { mainAction } from "./redux/actions/mainActions"

const CHAIN_ID = '0x13881' // TEST POLYGON CHAIN-ID
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}

function App() {
  const dispatch = useDispatch()
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [wallet, setWallet] = useState('')
  const [contract, setContract] = useState(null)
  const mainState = useSelector(state => state.main)

  const { loading, notification } = mainState

  const save = () => {
    if (key === "" || value === "") {
      dispatch({ type: SET_NOTIFICATION, payload: { type: 'error', text: 'Please fill in the inputs', status: true } })
      return
    }

    dispatch(mainAction.setPair(contract, wallet, key, value))
  }

  useEffect(() => {
    const connectMetamask = async () => {
      if (typeof window.ethereum === 'undefined') {
        dispatch({ type: SET_NOTIFICATION, payload: { type: 'error', text: 'Please install Metamask', status: true } })
        dispatch({ type: SET_LOADING, payload: true })
        return
      }
      await window.ethereum.request({ method: "eth_requestAccounts" })
        .then(async (accounts) => {

          let chainId = window.ethereum.chainId
          let web3 = new Web3(window.ethereum)
          setContract(new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS))
          setWallet(accounts[0])

          if (chainId !== CHAIN_ID) {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: Web3.utils.toHex(CHAIN_ID) }],
            }).then((res) => { }).catch(err => console.log(err))
          }
        }).catch(async (err) => {
          if (err.code === 4902) { }
        })
    }
    connectMetamask()
  }, [dispatch])

  useEffect(() => {
    if (notification.status) {
      if (notification.type === "error") NotificationManager.error(notification.text, 'Error', 3000)
      if (notification.type === "success") NotificationManager.success(notification.text, 'Success', 3000)
      dispatch({ type: SET_NOTIFICATION_INITIAL })
    }
  }, [dispatch, notification])


  return (
    <div className="main-body">
      <NotificationContainer />
      {loading &&
        <div className="loading">
          <div className="load">
            <CircleLoader color={"#ffffff"} loading={loading} cssOverride={override} size={150} />
          </div>
        </div>}
      <div>
        <TextInput
          placeholder="Input Key"
          type="text"
          value={key}
          setValue={setKey} />
      </div>
      <div>
        <TextInput
          placeholder="Input Value"
          type="text"
          value={value}
          setValue={setValue} />
      </div>
      <div className="btn">
        <Button
          onClick={save}
          width={"180px"}
          height={"50px"}
          color="white"
          textColor="black"
          textContent="Save"
          fontSize="25px"
        />
      </div>
    </div>
  )
}

export default App
