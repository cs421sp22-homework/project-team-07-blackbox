import React, {Component} from 'react'
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'
import NavBarCustomer from "../navBar_footer/NavBarCustomer";
import Footer from '../navBar_footer/Footer';
import CreateOrderForm from 'components/forms/CreateOrderForm';


class CreateOrder extends Component {
    constructor(props) {
        super(props);

        this.state={

        }

        this.handleChange = this.handleChange.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    submitInfo() {
        let info = {
            token: sessionStorage.getItem('token'),
            gender: this.state.gender,
            ftSize: this.state.ftSize,
            inSize: this.state.inSize,
            weight: this.state.weight,
            shirtSize: this.state.shirtSize,
            bottomSize: this.state.bottomSize,
            jeanSize: this.state.jeanSize,
            shoeSize: this.state.shoeSize,
            styleSet: this.state.styleSet.split(',')
        }
        console.log(this.state.styleSet)
        this.setState({edit: false})
    }

    componentDidMount() {

    }


    render() {
        return (
            <div>
                <NavBarCustomer/>
                    {/* <div>stylist id: {this.props.stylistId}</div>
                    <div>stylist nickname: {state[1]}</div> */}
                    <CreateOrderForm stylist={this.props.location} history={this.props.history}/>
                    
                <Footer/>
            </div>
        )
    }
}

export default CreateOrder