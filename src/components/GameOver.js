import React, { Component } from 'react'

export default class GameOver extends Component {

    render() {
        // contents to show show after find button pressed 
        const {status,time} = this.props.store

        const planet_name = status=='success'?<p>Planet found : {this.props.store.planet_name}</p>:null;
        return (
            <div>
                <center>
                    <p>{status=='success'?'Success ! Congratulation Mission complete':'Oops ! Better Luck Next Time'}</p>
                    <p>Time taken : {time}</p>
                    { status=='success'?planet_name:null }
                    <p>
                    <button className="btn badge badge-pill badge-primary" onClick={this.props.reset}>Play Again</button><br/>
                    </p>
                </center>
            </div>
        )
    }
}
