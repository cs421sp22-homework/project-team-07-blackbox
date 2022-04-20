import React, {Component} from 'react'
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'
import NavBarCustomer from "../navBar_footer/NavBarCustomer";
import NavBarStylist from 'styleBox/navBar_footer/NavBarStylist';
import Footer from '../navBar_footer/Footer';
import ConfirmForm from 'components/forms/ConfirmForm';
import Cookies from 'react-cookies';
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";

const Button = tw.button`mx-8 mt-10 mt-8 md:mt-8 sm:w-32 mt-6 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide 
shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl
absolute left-1/2`;
const BackButton = tw.button`mx-8 mt-10 mt-8 md:mt-8 sm:w-32 mt-6 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide`

// const PrimaryButton = styled(PrimaryButtonBase)(props => [
//     tw`w-56 mx-8 mt-10 mt-8 md:mt-8 text-sm inline-block bg-pink-500 hover:bg-gray-100 hover:text-pink-500 focus:bg-pink-500`,
//     props.buttonRounded && tw`rounded-full`
//   ]);

class ConfirmOrder extends Component {
    constructor(props) {
        super(props);

        this.state={

        }

        this.handleChange = this.handleChange.bind(this)
        this.checkUser = this.checkUser.bind(this)
        this.back = this.back.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    checkUser(){
        return Cookies.get('role');
    }

    back(){
        this.props.history.push({
            pathname:'/orderDetail',
            query: {
                id: this.state.orderId,
                orderStatus: 5
            }
        })
    }


    render() {
        console.log(this.props.location)
        return (
            <div>
                <NavBarAuthenticated/>
                {/* <div>stylist id: {this.props.stylistId}</div>
                    <div>stylist nickname: {state[1]}</div> */}
                <ConfirmForm orderId={this.props.location.state.orderId} history={this.props.history}/>
                <BackButton onClick={this.back}>Back</BackButton>
                <Footer/>
            </div>
        )
    }
}

export default ConfirmOrder
