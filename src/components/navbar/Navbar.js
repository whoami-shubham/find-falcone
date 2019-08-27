import React, { Component } from 'react'
import './Navbar.css'

export default class Navbar extends Component {

    render() {
        return (
                
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="https://www.geektrust.in">GeekTrust </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link navbar-brand" href="#" onClick={this.props.reset}> Reset <span className="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>
          </nav>
        )
    }
}