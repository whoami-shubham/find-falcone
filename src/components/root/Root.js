import React, { Component } from 'react'
import Home from '../home/Home';
import {connect} from 'react-redux'
import {reset} from '../actions/actionCreator'
import GameOver from '../GameOver';
import Error from '../Error';
import Loading from '../Loading';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';


class Root extends Component {
  constructor(props){
    super(props);
    this.state = {
        id:1           // for re render the planet component when reset() is called
    }
}

reset = ()=>{
this.props.reset();
this.setState((prevState)=>{
     return {
         id:prevState.id+1
     }
})
}

componentWillMount(){
     this.props.reset();
}

isgameOver = ()=>{
    if(this.props.store.status=='success' || this.props.store.status=='false'){
       return true;
    }
    return false;
}

isLoading = ()=>{
  const {status} = this.props.store;
  return (status=='Loading' || status=='Searching')
}

isError = ()=>{
    console.log(this.props.store.error)
    return this.props.store.error.trim().length>0;
}

render() {

    
    return (
        <div>
            <Navbar reset={this.reset}/>
            <div className="container-fluid">
                <center>
                    <h1 className="my-3">Finding Falcone!</h1>
                </center>
                 {this.isLoading()?<Loading message={this.props.store.status}/>:null}
                 {this.isgameOver() ?<GameOver  reset = {this.reset} store={this.props.store} />:null}
                 {this.isError()?<Error  message={this.props.store.error}/>:null}
                 {!this.isgameOver() && !this.isError() && !this.isLoading()?<Home key={this.state.id} />:null}
            </div>
            <Footer />
        </div>
    )

}
}

const mapStateToProps = (state)=>{

    return {
        store:state
    }
}

const mapDispatchToProps = (dispatch) =>{

  return {
      reset:()=>{
          dispatch(reset())
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Root);
