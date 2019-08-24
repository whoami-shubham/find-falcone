import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (
            <div>
                <center>
                    <h3>{this.props.message}...</h3>
                </center>
            </div>
        )
    }
}
