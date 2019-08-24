import React, { Component } from 'react'
import Planet from './Planet';
import {connect} from 'react-redux'
import {findfalcone} from './actions/actionCreator'

const token_url = "https://findfalcone.herokuapp.com/token";
const find_url  = "https://findfalcone.herokuapp.com/find";

const MAX_PLANETS = 4;

export class Home extends Component {
    constructor(props){
        super(props);
    }

Planets_Selected(){  // to active and disable find button
    let count = 0;
    this.props.store.vehicles.forEach((vehicle)=>{  // if  vehicle is selected than planet must be selected
            count = count + vehicle.selected;
    })
    return count==MAX_PLANETS;

}

findFalcone = ()=>{
    let planet_names  = []
    let vehicle_names = []
    this.props.store.planets.forEach((planet)=>{
        if(planet.selected){
            planet_names.push(planet.name)
        }
    })
    this.props.store.vehicles.forEach((vehicle)=>{
        if(vehicle.selected>0){
            let count = vehicle.selected;
            while(count>0){
                vehicle_names.push(vehicle.name)
                count--;
            }
        }
    })
    const body = {
        token:'',
        planet_names:planet_names,
        vehicle_names:vehicle_names
    }
    this.props.findfalcone(token_url,find_url,body);
    

}

    render() {

        let planets = [];

        for(let id=1;id<=MAX_PLANETS;id++){
             
            const key = id ; 

            planets.push(

                <div className="w-20" key={key}>
                    <p><b>Destination {id}</b></p>
                    <Planet id={key} />
                </div>

          )
          
        }
        

        return (
            <div className="container">
                <center>
                        <h3 className="py-5">Select planets you want to search in</h3>
                    </center>
                    <div className="row">
                            {planets}
                        <div className="w-20">
                            <p className="stick_right"><b>Time taken</b></p><br/>
                            <span className="badge badge-pill badge-primary btn stick_right">{this.props.store.time}</span>
                        </div>
                    </div>
                    <center className="my-5">
                        <button className="btn badge badge-pill badge-primary" onClick={this.findFalcone} disabled={this.Planets_Selected()?false:true}>Find</button><br/>
                    </center>
            </div>
        )

    }
}

const mapStateToProps = (state)=>{
    
    return {
        store:state,
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        findfalcone:(token_url,find_url,data)=>{
              dispatch(findfalcone(token_url,find_url,data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);