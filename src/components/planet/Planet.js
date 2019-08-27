import React, { Component } from 'react'
import Vehicle from '../vehicle/Vehicle';
import './Planet.css'
import {connect} from 'react-redux'
import {addQuantity,subQuantity,updateTime} from '../actions/actionCreator'

const MAX_VEHICLES = 4;

class Planet extends Component {


    constructor(props){

          super(props);
          this.state = {
                id:0,
                distance:0,
                time:0,
                selected_planet:-1,
                selected_vehicle:-1
          }
    }

   
    componentWillMount(){
        this.setState({id:this.props.id})
    }
     
    updateVehicle = (cur_vehicle)=>{
                const time            = cur_vehicle!==-1 ? (this.state.distance/this.props.vehicles[cur_vehicle].speed) : 0;
                const prev_vehicle    = this.state.selected_vehicle;
                if(prev_vehicle!==-1){
                    this.props.addQuantity(prev_vehicle,'vehicle');
                    this.props.updateTime(-this.state.time);
                }
                if(cur_vehicle!==-1){
                    this.props.subQuantity(cur_vehicle,'vehicle');
                    this.props.updateTime(time)
                }
                
                this.setState({selected_vehicle:cur_vehicle,time:time})
    } 
        
     changeHandler = (event)=>{
                
                const cur_planet  = parseInt(event.target.value);
                const distance = cur_planet!==-1? this.props.planets[cur_planet].distance:0;       
                const prev_planet = this.state.selected_planet;
                if(prev_planet!==-1){
                    this.props.addQuantity(prev_planet,'planet');
                }
                if(cur_planet!==-1){
                    this.props.subQuantity(cur_planet,'planet');
                }
                this.props.addQuantity(this.state.selected_vehicle,'vehicle');
                this.props.updateTime(-this.state.time)
                this.setState((prevState)=>{
                    return {
                        id:prevState.id+MAX_VEHICLES, // for any change in planets update key for re render vehicles
                        selected_vehicle:-1,        
                        time:0,
                        selected_planet:cur_planet,
                        distance:distance

                    }
               })
               
        }

    


    render() {
        
        
        const planets = this.props.planets?this.props.planets.map((planet,index)=>{
                         let id = ""+index;
                        if(!planet.selected || this.state.selected_planet==id){
                           return <option key={id} value={id}>{planet.name} </option>
                        }
                        
        }):null;
        
        

        return (
            <div>
                <select  onChange={this.changeHandler} value={''+this.state.selected_planet}>
                    <option value='-1'>Select</option>
                     {planets} 
                </select>
                { this.state.selected_planet!==-1?
                  <Vehicle id={this.state.id} key={this.state.id} vehicles={this.props.vehicles} updateVehicle={this.updateVehicle} distance={this.state.distance}/>:null
                }
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps)=>{
    
    return {
        vehicles:state.vehicles,
        planets:state.planets,
        id:ownProps.id
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        addQuantity:(index,type)=>{
            dispatch(addQuantity(index,type))
        },
        subQuantity:(index,type)=>{
            dispatch(subQuantity(index,type))
        },
        updateTime:(val)=>{
            dispatch(updateTime(val));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Planet);