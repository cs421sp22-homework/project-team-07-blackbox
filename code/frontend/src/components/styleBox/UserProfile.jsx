import React, {Component} from 'react'

class HelloWorld extends Component{
    constructor(props){
        super(props)
        this.state={
            info: '',
        }
    }

    // componentDidMount(){
    //     HelloWorldService.executeHelloWorldService()
    //         .then(response=>this.setState({info: response.data}))
    //         .catch(error => console.log(error.response))
    // }


    render(){
        return(
            <div>
                <h1>Sample User Profile</h1>
                <h2>Welcome {this.props.location.state.username}</h2>
            </div>
        )
    }
}

export default HelloWorld
