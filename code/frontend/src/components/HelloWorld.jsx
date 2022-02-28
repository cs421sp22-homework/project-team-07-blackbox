import React, {Component} from 'react'
import HelloWorldService from "../api/styleBox/HelloWorldService";

class HelloWorld extends Component{
    constructor(props){
        super(props)
        this.state={
            info: '',
        }
    }

    componentDidMount(){
        HelloWorldService.executeHelloWorldService()
            .then(response=>this.setState({info: response.data}))
            .catch(error => console.log(error.response))
    }


    render(){
        return(
            <h1>{this.state.info}</h1>
        )
    }
}

export default HelloWorld

