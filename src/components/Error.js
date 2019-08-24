import React, { Component } from 'react'

export default class Error extends Component {
    render() {
        return (
            <div>
                <center>
                    <h1>Error :( </h1>
                    <p>{this.props.message}</p>
                </center>
            </div>
        )
    }
}
