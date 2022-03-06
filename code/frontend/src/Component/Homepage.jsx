import React, {Component} from 'react'
import HelloWorldService from "../api/styleBox/HelloWorldService";
import axios from 'axios';
import AuthenticationService from '../api/styleBox/AuthenticationService';

class Homepage extends Component{
    constructor(props){
        super(props)
        this.state={
            info: 'Homepage',
        }
        this.logout = this.logout.bind(this)
    }

    

    logout(){
        AuthenticationService
        .deleteAuthentication()
        .then((response)=>{
            console.log(response)
            this.props.history.push(`/login`)
        })
        .catch(()=>{console.log("error")})
    }

    render(){
        return(
            <div>
            <h1>{this.state.info}</h1>
            <p><button type='submit' className='btn btn-primary my-3' onClick={this.logout}>logout</button></p>
                </div>
        
        )
    }
}

export default Homepage