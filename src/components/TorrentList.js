import React, { Component } from 'react';

const Trytes = require('trytes');

const trim = require('locutus/php/strings/trim');

class TorrentList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            transactions: []
        }
    }

    updateList() {

        var transactions = this.props.iota.api.findTransactionObjects(
            { addresses: [this.props.address] },
            function (err, transactions) {

                console.log(err);
                console.log(transactions);
                this.setState({ transactions: transactions });

            }.bind(this));
    }

    trim(s, mask) {
        while (~mask.indexOf(s[0])) {
            s = s.slice(1);
        }
        while (~mask.indexOf(s[s.length - 1])) {
            s = s.slice(0, -1);
        }
        return s;
    }

    render() {
        return (
            <div>
                <span>List</span>
                <button onClick={this.updateList.bind(this)}>update</button>

                {this.state.transactions.map(function (transaction, index) {

                    var decodedMessageText = Trytes.decodeTextFromTryteString(trim(transaction.signatureMessageFragment, 9));
                    console.log(decodedMessageText);
                    var torrent = JSON.parse(decodedMessageText);

                    return <li key={index}><a href={torrent.magnetLink}>[{torrent.category}]{torrent.title}</a></li>;
                })}

                <hr />
            </div>
        );
    }
}

export default TorrentList;