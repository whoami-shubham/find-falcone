import {UPDATE_TIME,ADD_QUANTITY,SUB_QUANTITY,PENDING,FULFILLED,ERROR, SEARCHED,SEARCHING} from './actionType'
import {vehicles_url,planets_url} from '../production'


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }


export function addQuantity(index,type){
    return {
        type:ADD_QUANTITY,
        payload:{
            type:type,
            index:index
        }
    }
}
export function subQuantity(index,type){
    return {
        type:SUB_QUANTITY,
        payload:{
            type:type,
            index:index
        }
    }
}

export function searching(){
    return {
        type:SEARCHING,
        payload:{status:'Searching'}
    }
}

export function searched(data){
    if(data.status==undefined){ // api doesn't return status in case of error, so add it
        data.status='error'
    }
    return {
        type:SEARCHED,
        payload:data
    }
}



export function updateTime(val){
    return {
        type:UPDATE_TIME,
        payload:{
            time:val
        }
    }
}

export function pending(){
      return {
          type:PENDING,
          payload:{
              status:'Loading'
          }
      }
}

export function error(err){
    return {
        type:ERROR,
        payload:{
            status:'error',
            error:err
        }
    }
}

export function fulfilled(data){
    return {
        type:FULFILLED,
        payload:data
    }
}


export  function reset(){
    return (dispatch)=>{
            dispatch(pending());  // change status to pending
            const data = {
                    vehicles:[],
                    planets:[],
                    time:0,
                    status:'fulfilled',
                    error:''
            }
            fetch(vehicles_url)
            .then(res=>res.json())
            .then(res=>{ data.vehicles = getData(res,0); return fetch(planets_url)})
            .then(res=>res.json())
            .then(res=>{data.planets = getData(res,false); dispatch(fulfilled(data)) })
            .catch(err=>{dispatch(error(err)) })
        }
    }


export function findfalcone(token_url,find_url,data){
      return (dispatch)=>{

          dispatch(searching());   // change status to searching

          fetch(token_url, {
            method: 'POST',
            headers:headers,
            body:''
         } )
        .then(res=>res.json())
        .then((res)=>{ 
            data.token=res.token; 
            const body = JSON.stringify(data);

            return fetch(find_url, {
                        method: 'POST',
                        headers: headers,
                        body:body
                } )
        })
        .then(res=>res.json())
        .then((res)=>{dispatch(searched(res))})
        .catch(err=>{ console.log(err); dispatch(error(err)) })
        }
}





function getData(data,selected){ // add a extra field 'selected' in data to track easily
   data.forEach((item)=>{
       item.selected = selected
   })
   return data;
}




