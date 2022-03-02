import React, {Component} from 'react'
import HelloWorldService from "../api/styleBox/HelloWorldService";
import axios from 'axios';

class HelloWorld extends Component{
    constructor(props){
        super(props)
        this.state={
            info: 'hello',
        }
        this.getmessage = this.getmessage.bind(this)
        this.login = this.login.bind(this)
    }

    componentDidMount(){
        HelloWorldService.executeHelloWorldService()
            .then(response=>this.setState({info: response.data}))
            .catch(error => console.log(error.response))
    }

    

    getmessage(){
        axios.get(`http://localhost:8080/index`).then((response)=>{console.log(response)}).catch(()=>{console.log("error")})
    }

    login(){
        axios.post(`http://localhost:8080/login`, {username: "zy", password: "123456"}).then((response)=>{console.log(response)}).catch(()=>{console.log("error")})
    }

    render(){
        return(
            <div>
            <h1>{this.state.info}</h1>
            <p><button type='submit' className='btn btn-primary my-3' onClick={this.getmessage}>get Hello</button></p>
            <p><button type='submit' className='btn btn-primary my-3' onClick={this.login}>login</button></p>
                </div>
        )
    }
}

export default HelloWorld

