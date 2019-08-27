import React, { Component } from 'react'
import './Vehicle.css'
export default class Vehicle extends Component {


    constructor(props){
          super(props);
          this.state = {
                selected_vehicle:-1,
          }
    }
        
     changeHandler = (event)=>{
                const cur_vehicle = parseInt(event.target.value);
                this.props.updateVehicle(cur_vehicle);
                this.setState({selected_vehicle:cur_vehicle})
        }



    render() {        
        const vehicles = this.props.vehicles?this.props.vehicles.map((vehicle,index)=>{

                         const name = "vehicle"+this.props.id
                         const val  = "" + index
                         let className = "radio left";
                         let disabled  = false;
                        if( (vehicle.total_no==0 || this.props.distance>vehicle.max_distance) && this.state.selected_vehicle!=index){
                            className = className + " disabled";
                            disabled  = true;
                        }
                        return (
                                
                            <div key={index} className={className}>
                                <label htmlFor={vehicle.name} >
                                    <input type="radio" name={name} value={val} onChange={this.changeHandler} disabled={disabled} /> 
                                      {vehicle.name} ({vehicle.total_no})
                                </label>
                                <br/>
                            </div>
                    )
                        
        }):null;

        return (
            <div>
                {vehicles}
            </div>
        )
    }
}

