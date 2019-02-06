import React, { Component } from 'react';

import './App.css';
import SubmitForm from './components/SubmitForm'
import TorrentList from './components/TorrentList'
import IOTA from 'iota.lib.js'
import CURL from 'curl.lib.js'

const Trytes = require('trytes');

class App extends Component {

  constructor(props) {
    super(props)

    var iota = new IOTA({
      'provider': 'https://nodes.thetangle.org:443'
    });

    var options = {
      index: 0,
      security: 2,
      total: 1,
      returnAll: false
    };

    var address = iota.api.getNewAddress('IOTATORRENTS9IOTATORRENTS9IOTATORRENTS9', options, function (e, address) {

      return address[0];
    });

    try {
      CURL.init();
      CURL.overrideAttachToTangle(iota);
    } catch (err) {
      console.error("Error", err);
    }


    this.state = { iota: iota, address: address }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TorrentList iota={this.state.iota} address={this.state.address}></TorrentList>
          <SubmitForm iota={this.state.iota} address={this.state.address} />
        </header>
      </div>
    );
  }
}

export default App;