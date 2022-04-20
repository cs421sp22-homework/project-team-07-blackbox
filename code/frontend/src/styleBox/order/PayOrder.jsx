import tw from 'twin.macro'
import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";
import { Container as ContainerBase} from "components/misc/Layouts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderService from 'api/styleBox/OrderService';
import Footer from "../navBar_footer/Footer";
const Container = tw(ContainerBase)`min-h-screen bg-pink-900 text-white font-medium flex justify-center mt-8`;
const Content = tw.div`m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg justify-center flex-1`;
const Label = tw.p`bg-gray-100 block text-sm font-medium text-gray-700 p-2`;
const FormLabel = tw.label`block text-sm font-medium text-gray-700`;
const FormInput = tw.input`p-2 mt-1 border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50 block w-full shadow-sm text-sm rounded-md`;
const BackButton = tw.button`mx-8 mt-10 mt-8 md:mt-8 sm:w-32 mt-6 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide`

class PayOrder extends Component {
    constructor(props){
        super(props);

        this.state = {
            designFee: this.props.location.query.price,
            stylistName: this.props.location.query.styName,
            orderId: this.props.location.query.id,
            lowPrice: this.props.location.query.lowPrice,
            highPrice: this.props.location.query.highPrice
        }

        this.payBtnPressed = this.payBtnPressed.bind(this)
        this.back = this.back.bind(this)
    }

    payBtnPressed(event){
        event.preventDefault();
        OrderService.payOrder(this.state.orderId)
        .then((response)=>{
            console.log(response)
            alert("Successfully pay the order!");
            this.props.history.push({pathname:"/orders"})
        })
        .catch((error)=>{
            console.log(error.response)
        })

    }

    back(){
        this.props.history.push({
            pathname:'/orderDetail',
            query: {
                id: this.state.orderId,
                orderStatus: 3
            }
        })
    }

    render(){
        return(
            <AnimationRevealPage>
                <NavBarAuthenticated/>
                <Container>
                <Content>
                    <div className="hidden sm:block p-10" aria-hidden="true">
                        <h2 className="font-semibold text-2xl px-5 py-5 text-center">Pay Your Order # {this.state.orderId}</h2>
                        <div className="border-t text-center border-gray-300" />
                    </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1 ml-10">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Payment Summary</h3>
                                <p className="mt-1 text-xs text-gray-600">&#8194;(Check your order information and enter payment method.)</p>
                                <div className='mb-3 mt-5 shadow rounded-md'>
                                    <Label>&#8194; Design fee</Label>
                                    <p className='m-3 text-sm font-medium text-gray-700'> &#8194; $ {this.state.designFee} </p>
                                    <Label>&#8194; Assigned stylist</Label>
                                    <p className='m-3 text-sm font-medium text-gray-700'> &#8194; {this.state.stylistName} </p>
                                    <Label>&#8194; Total clothes cost: range ({this.state.lowPrice} - {this.state.highPrice}) </Label>
                                    <p className='m-3 text-sm font-medium text-gray-700 pb-3'> &#8194; (- - - NA, only pay the design fee here - - -) </p>
                                </div>

                            </div>
                        </div>
                    <div className="mt-5 md:mt-0 md:col-span-2 border-l border-gray-200  mb-7 pr-10">
                        <form onSubmit={this.payBtnPressed}>
                        <div className="ml-5 shadow-lg overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <FormLabel>Payment method</FormLabel>
                                        <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option>Credit Card</option>
                                            <option>Paypal</option>
                                            <option>Apple Pay</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3"></div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <FormLabel>Card number</FormLabel>
                                        <FormInput type="text" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Name on card</label>
                                        <FormInput type="text" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                                        <FormInput type="text" required/>
                                    </div>

                                    <div className="col-span-6">
                                        <FormLabel>Shipping Address</FormLabel>
                                        <FormInput type="text" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <FormLabel>City</FormLabel>
                                        <FormInput type="text" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <FormLabel>State / Province</FormLabel>
                                        <FormInput type="text" required/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <FormLabel>ZIP / Postal code</FormLabel>
                                        <FormInput type="text" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Confirm and Pay
                                </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </Content>
                    <BackButton onClick={this.back}>Back</BackButton>
                    <Footer/>
                </Container>
            </AnimationRevealPage>
        )
    }
}

export default PayOrder;
