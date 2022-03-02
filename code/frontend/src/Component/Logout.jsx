import React, {Component} from 'react'
import HelloWorldService from "../api/styleBox/HelloWorldService";
import axios from 'axios';

class Logout extends Component{
    constructor(props){
        super(props)
        this.state={
            info: 'Logout',
        }
        this.logout = this.logout.bind(this)
    }

    

    logout(){
        axios.get(`http://localhost:8080/user/logout`).then((response)=>{console.log(response)}).catch(()=>{console.log("error")})
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

export default Logout