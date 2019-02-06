import React, { Component } from 'react';

const Trytes = require('trytes');

class SubmitForm extends Component {

    constructor(props) {
        super(props);
        console.log("iota from SendButton Component", this.props.iota);

        this.state = {
            category: 'tv',
            title: 'Some crazy film',
            magnetLink: 'magnet:?xt=urn:btih:c12fe1c06bba254a9dc9f519b335aa7c1367a88a'
        }
    }

    send() {
        const tag = 'iti-1.0.0';
        const seed = 'BBBBB99999BBBBB99999BBBBB99999BBBBB99999BBBBB99999BBBBB99999BBBBB99999BBBBB99999Z';
        const depth = 4;
        const minWeightMagnitude = 14;

        const message = {
            category: this.state.category,
            title: this.state.title,
            magnetLink: this.state.magnetLink
        }

        const transaction = {
            // Recipient address
            address: this.props.address,
            // Value sent to recipient
            value: 0,
            message: Trytes.encodeTextAsTryteString(JSON.stringify(message)),
            tag: 'FOO9BAR9TEST'
        }

        const transfers = [transaction];


        this.props.iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers, (error, success) => {
            if (error) {
                console.error("sendTransfer: error", error);
            } else {
                console.log("sendTransfer: success", success);
            }
        });
    }

    setCategory(event) {
        this.setState({ category: event.target.value });
    }

    setTitle(event) {
        this.setState({ title: event.target.value });
    }

    setMagnetLink(event) {
        this.setState({ magnetLink: event.target.value });
    }

    render() {
        return (
            <div>
                <span>Category</span>
                <select name="category" onChange={this.setCategory.bind(this)} value={this.state.category}>
                    <option value="movies">Movies</option>
                    <option value="tv">TV</option>
                    <option value="music">Music</option>
                </select>
                <br />

                <span>Title</span>
                <input type="text" placeholder="title" name="title" onChange={this.setTitle.bind(this)} value={this.state.title}></input>
                <br />

                <span>Magnet link URI</span>
                <input type="text" placeholder="magnet link" name="link" onChange={this.setMagnetLink.bind(this)} value={this.state.magnetLink}></input>
                <br />

                <button onClick={this.send.bind(this)}>Submit</button>
            </div>
        );
    }
}

export default SubmitForm;
