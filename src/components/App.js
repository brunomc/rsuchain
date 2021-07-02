// @ts-nocheck
import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import RsuReputation from '../abis/RsuReputation.json'
import "./style.css";
import { timerMS } from '../utils/timer';
const EEAClient = require("web3-eea");
const web3 = new EEAClient(new Web3("http://localhost:8545"), "*");

class App extends Component {
  async componentWillMount() {
    console.log(web3)
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log("Accounts",accounts);
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = RsuReputation.networks[networkId]
    if(networkData) {
      const abi = RsuReputation.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      console.log("Contract",contract);
      this.setState({ contract })
      //const totalSupply = await contract.methods.totalSupply().call()
      //this.setState({ totalSupply })
    //   const historyTransactionsOfToken = contract.getPastEvents('Transfer', {
    //     filter: {tokenId: ["1"]}, // Using an array means OR: e.g. 20 or 23
    //     fromBlock: 0,
    //     toBlock: 'latest'
    // }, function(error, events){ console.log(events); })
    // .then(function(events){
    //     console.log(events) // same results as the optional callback above
    // });
      // for (var i = 1; i <= totalSupply; i++) {
      // //  const file = await contract.methods.files(i).call()
      //   this.setState({
      //     tracks: [...this.state.tracks, {
      //       id: file.fileId,
      //       title: file.fileName,
      //       url: `https://ipfs.infura.io/ipfs/${file.fileHash}`,
      //       explorer: `https://testnet.bscscan.com/address/${address}`,
      //       description: file.fileDescription,
      //       type: file.fileType,
      //       hash: file.fileHash,
      //       forger: file.forger
      //     } ]
      //   })
      // }
     // this.setState({selectedTrack: this.state.tracks[0]})
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  registerWM = (data) => {
    const startTimer = new Date().getTime();
    console.log(data)
    console.log(this.state.contract.methods)
    this.state.contract.methods.registerWM(this.warningMessageId.value,this.warningMessageAlert.value).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log("HASH RECEBIDO", receipt);
     const stopTimer = new Date().getTime();
     const op = this.state.transactions;
     const tempo = Number(stopTimer) - Number(startTimer);
     op.push({ operation: 'registerWM', time: tempo});
      this.setState(op);
    })
  }

  registerWVM = (data) => {
    // web3 initialization - must point to the HTTP JSON-RPC endpoint
var provider = 'http://localhost:8545';
console.log("******************************************");
console.log("Using provider : " + provider);
console.log("******************************************");
var web3 = new Web3(new Web3.providers.HttpProvider(provider))
web3.transactionConfirmationBlocks = 1;
// Sender address and private key
// Second acccount in dev.json genesis file
// Exclude 0x at the beginning of the private key
const addressFrom = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
const privKey = Buffer.from('c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', 'hex')
web3.eth.getTransactionCount(addressFrom, "pending").then((txnCount) => {
  console.log('txcount: ',txnCount)
  const txObject = {
    nonce: web3.utils.toHex(txnCount),
    gasPrice: web3.utils.toHex(1000),
    gasLimit: web3.utils.toHex(126165),
    data: '000'
 };
}).catch(e=>{console.log('erro: ',e)});

    const startTimer = new Date().getTime();
    console.log(data)
    console.log(this.state.contract.methods)
    this.state.contract.methods.registerWVM(this.idMsg.value,this.idAlert.value,this.confirmationAck.value).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log("HASH RECEBIDO", receipt);
     const stopTimer = new Date().getTime();
     const op = this.state.transactions;
     const tempo = Number(stopTimer) - Number(startTimer);
     op.push({ operation: 'registerWVM', time: tempo});
      this.setState(op);
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      confirmationAck: null,
      idMsg: null,
      warningMessageId: null,
      warningMessageAlert: null,
      idAlert: null,
      transactions: [],
      qtdWVM: 1
    }
  }
  render() {
    
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://www.ochain.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSUReputation
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              
              <div className="content mr-auto ml-auto">
                <form onSubmit={(event) => {
                    event.preventDefault()

                    this.registerWM(event)
                  }} >
                      <div className="form-group">
                        <h3>Warning Message</h3>
                        <br></br>
                          <input
                            id="wmId"
                            type="text"
                            ref={(input) => { this.warningMessageId = input }}
                            className="form-control text-monospace"
                            placeholder="WM Id"
                            required /><br/>
                             <input
                            id="wmAlert"
                            type="text"
                            ref={(input) => { this.warningMessageAlert = input }}
                            className="form-control text-monospace"
                            placeholder="WM Alert"
                            required />
                      </div>
                    <button type="submit" className="btn-primary btn-block"><b>Send WM</b></button>
                  </form><br/>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    this.registerWVM(event)
                    
                  }} >
                      <div className="form-group">
                      <h3>Warning Vehicle Message</h3>
                        <br></br>
                          <input
                            id="idMsg"
                            type="text"
                            ref={(input) => { this.idMsg = input }}
                            className="form-control text-monospace"
                            placeholder="Id WM"
                            required /><br/>
                            <input
                            id="idAlert"
                            type="text"
                            ref={(input) => { this.idAlert = input }}
                            className="form-control text-monospace"
                            placeholder="Id WM"
                            required /><br/>
                          <input
                            id="confirmationAck"
                            type="text"
                            ref={(input) => { this.confirmationAck = input }}
                            className="form-control text-monospace"
                            placeholder="WM Ack?"
                            required />
                      </div>
                    <button type="submit" className="btn-primary btn-block"><b>Send WVM!</b></button>
                  </form>
                  <br /><br /><br />
                  { this.state.transactions.length > 0 && <div>
              <table border={1}>
                <tr>
                <th>Operation</th>
                <th>Transaction Time</th>
                </tr>
                <tbody>

                
              {this.state.transactions.map(transaction=>{
                return (
                  <tr key={new Date().getTime()}>
                    <td>{transaction.operation}</td>
                    <td>{transaction.time.toString()+' ms'}</td>
                  </tr>
                );
              })}
              </tbody>
              </table>
              </div>}
              </div>
             
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;