import {UPDATE_TIME,ADD_QUANTITY,SUB_QUANTITY,PENDING,FULFILLED,ERROR,SEARCHED,SEARCHING} from '../actions/actionType'


const initState = {
    vehicles:[],
    planets:[],
    time:0,
    status:'',
    error:''
}


const appReducer =  (state=initState, action)=>{

    if(action.type===ADD_QUANTITY){
        //   console.log("ADD : ",action.payload)
        if(action.payload.index<0){
            return {...state};
        }
        if(action.payload.type==='vehicle'){
            return updateVehicle(action.payload.index,1,state);
        }
        if(action.payload.type==='planet'){
            return updatePlanet(action.payload.index,false,state);
        }

    }
    if(action.type===SUB_QUANTITY){
        // console.log("SUB : ",action.payload)
        if(action.payload.index<0){
            return {...state};
        }
        if(action.payload.type==='vehicle'){
            return updateVehicle(action.payload.index,-1,state);
        }
        if(action.payload.type==='planet'){
            return updatePlanet(action.payload.index,true,state);
        }
        
    }
    if(action.type===UPDATE_TIME){
        const new_time = state.time + action.payload.time;
              return {
                  ...state,
                  time: new_time
              }
    }
    if(action.type===PENDING || action.type===ERROR || action.type===FULFILLED || action.type===SEARCHING || action.type===SEARCHED){
        return {
            ...state,
            ...action.payload
        }
    }
    
    return {...state};

}

function updateVehicle(index,increment_by,prevState){
        let prev_quantity = prevState.vehicles[index].total_no;
        let new_quantity  = (prev_quantity + increment_by) >=0 ? prev_quantity + increment_by : prev_quantity;
        let vehicles = [...prevState.vehicles];
        vehicles[index].total_no = new_quantity;
        vehicles[index].selected = vehicles[index].selected-(new_quantity-prev_quantity);
        return {
                ...prevState,
                vehicles
        }   

}

function updatePlanet(index,selected,prevState){
            let planets = [...prevState.planets];
            planets[index].selected = selected;
            return {
                    ...prevState,
                    planets
          }
}


export default appReducer;
