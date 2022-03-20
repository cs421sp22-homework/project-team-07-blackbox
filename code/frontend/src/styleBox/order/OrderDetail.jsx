import tw from 'twin.macro'
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import NavBarCustomer from '../navBar_footer/NavBarCustomer';
import NavBarStylist from 'styleBox/navBar_footer/NavBarStylist';
import React, {Component} from "react";
import {Container as ContainerBase} from "components/misc/Layouts";
import OrderService from 'api/styleBox/OrderService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Cookies from 'react-cookies';
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";

const Container = tw(ContainerBase)`min-h-screen bg-pink-900 text-white font-medium flex justify-center mt-8`;
const Content = tw.div`m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg justify-center flex-1`;


class OrderDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cusNickname: "Samplename",
            orderPrice: 100,
            styleSet: ["Cool"],
            occasionSet: ["Casual", "Business"],
            description: "This is a sample description. Some quick example text to build on the card title and make up the bulk of the card's content. Want to desigin a cloth style for business meeting.",
            clothPriceLow: 200,
            clothPriceHigh: 300,
            time: "2022/3/14",
            gender: "Female",
            ftSize: "24",
            inSize: "11",
            weight: "50",
            shirtSize: "10",
            bottomSize: "30",
            jeanSize: "15",
            shoeSize: "11",
            orderId: this.props.location.query.id
        }
        this.checkCustomer = this.checkCustomer.bind(this)
        this.backToOrders = this.backToOrders.bind(this)
    }

    // return user type
    checkCustomer() {
        return Cookies.load('role')==='Customer';
    }

    // Back to orderList when click back btn
    backToOrders() {
        this.props.history.push("/orders");
    }

    componentDidMount() {
        OrderService.getOrderDetail(this.state.orderId)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        cusNickname: response.data.cusNickname,
                        orderPrice: response.data.orderPrice,
                        styleSet: response.data.styleSet,
                        occasionSet: response.data.occasionSet,
                        description: response.data.description,
                        clothPriceLow: response.data.clothPriceLow,
                        clothPriceHigh: response.data.clothPriceHigh,
                        time: response.data.time,
                        gender: response.data.gender,
                        ftSize: response.data.ftSize,
                        inSize: response.data.inSize,
                        weight: response.data.weight,
                        shirtSize: response.data.shirtSize,
                        bottomSize: response.data.bottomSize,
                        jeanSize: response.data.jeanSize,
                        shoeSize: response.data.shoeSize
                    })
                        
                }
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }


    render() {
        return (
            <AnimationRevealPage>
                <NavBarAuthenticated/>
                <Container>
                    <Content>
                        <div className="p-6 mx-16 my-16 flex-initial shadow-lg rounded-lg bg-gray-50 text-gray-700">
                            <div className="grid grid-cols-3">
                                <h2 className="font-semibold text-2xl mb-5 px-3 py-5">Order
                                    # {this.state.orderId} Detail</h2>
                                <p className='text-base flex items-end mb-8'>(Created In {this.state.time})</p>
                                <div className='grid grid-cols-3 mb-3'>
                                    <button type="button"
                                            className="m-5 p-2 bg-blue-600 text-white text-base leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Accept
                                    </button>
                                    <button type="button"
                                            className="m-5 p-2 bg-red-600 text-white text-base leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Reject
                                    </button>
                                    <button onClick={this.backToOrders} type="button"
                                            className="m-5 p-2 bg-gray-200 text-gray-700 text-base leading-tight rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Back
                                        to Orders
                                    </button>
                                </div>
                            </div>

                            <hr className="py-3 border-gray-300"/>

                            <div className="grid grid-cols-3 px-5">
                                <div className='grid grid-cols-3'>
                                    <p className='text-base'><FontAwesomeIcon icon={Icons.faUserGroup}/> Customer: </p>
                                    <p className='col-span-2 text-base text-gray-600'> &nbsp; &#8194; {this.state.cusNickname}</p>
                                </div>

                                <div className='grid grid-cols-3'>
                                    <p className='text-base'><FontAwesomeIcon icon={Icons.faTShirt}/>&#8194; Styles:
                                    </p>
                                    <p className='col-span-2 text-base text-gray-600'> {this.state.styleSet.join(', ')}</p>
                                </div>

                                <div className='grid grid-cols-3'>
                                    <p className='text-base'><FontAwesomeIcon
                                        icon={Icons.faLocationDot}/>&#8194; Locations: </p>
                                    <p className='col-span-2 text-base text-gray-600'> {this.state.occasionSet.join(', ')}</p>
                                </div>
                            </div>

                            <div className="px-5 mt-8 mb-2 grid grid-cols-3">
                                <div className='grid grid-cols-3'>
                                    <p className='text-base'><FontAwesomeIcon icon={Icons.faDollarSign}/> Order Price:
                                    </p>
                                    <p className='col-span-2 text-base text-gray-600'> &nbsp; &#8194; {this.state.orderPrice}</p>
                                </div>

                                <div className='grid grid-cols-2'>
                                    <p className='text-base'><FontAwesomeIcon icon={Icons.faDollarSign}/> ClothPrice
                                        (Low): </p>
                                    <p className='text-base text-gray-600'> &nbsp; {this.state.clothPriceLow}</p>
                                </div>

                                <div className='grid grid-cols-2'>
                                    <p className='text-base'><FontAwesomeIcon icon={Icons.faDollarSign}/> ClothPrice
                                        (High): </p>
                                    <p className='text-base text-gray-600'> &nbsp; {this.state.clothPriceHigh}</p>
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <div className="block p-6 m-3 rounded-lg shadow-lg bg-gray-100">
                                    <h5 className="text-gray-900 text-base leading-tight font-medium mb-2">Description: </h5>
                                    <p className="text-gray-700 text-base mb-4">{this.state.description}</p>
                                </div>
                            </div>


                            <hr className="my-6 border-gray-300"/>
                            <div className="flex justify-start">
                                <div className="block p-6 m-3 rounded-lg shadow-lg bg-gray-100">
                                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Customer
                                        Info: </h5>
                                    {this.checkCustomer
                                        ?
                                        <h5 className="text-gray-900 text-base leading-tight font-medium my-8 mx-10">(This
                                            part is available to your stylist. Customer can look the information from
                                            'Menu -- Profile' section.) </h5>
                                        :
                                        <div>
                                            <div className="grid grid-cols-4 m-5">
                                                <div className='grid grid-cols-5'>
                                                    <p className='col-span-2 text-base'><FontAwesomeIcon
                                                        icon={Icons.faUserGroup}/> Gender: </p>
                                                    <p className='text-base text-gray-600'>  {this.state.gender}</p>
                                                </div>

                                                <div className='grid grid-cols-4'>
                                                    <p className='col-span-2 text-base'><FontAwesomeIcon
                                                        icon={Icons.faLaptopMedical}/>&#8194; FtSize: </p>
                                                    <p className='text-base text-gray-600'> {this.state.ftSize}</p>
                                                </div>

                                                <div className='grid grid-cols-3'>
                                                    <p className='text-base'><FontAwesomeIcon
                                                        icon={Icons.faBookMedical}/>&#8194; InSize: </p>
                                                    <p className='col-span-2 text-base text-gray-600'> &#8194; {this.state.inSize}</p>
                                                </div>

                                                <div className='grid grid-cols-4'>
                                                    <p className='col-span-2 text-base'><FontAwesomeIcon
                                                        icon={Icons.faClinicMedical}/> &#8194; Weight: </p>
                                                    <p className='text-base text-gray-600'> {this.state.weight}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 m-5">
                                                <div className='grid grid-cols-7'>
                                                    <p className='col-span-3 text-base'><FontAwesomeIcon
                                                        icon={Icons.faTShirt}/> ShirtSize: </p>
                                                    <p className='text-base text-gray-600'> &#8194; {this.state.shirtSize}</p>
                                                </div>

                                                <div className='grid grid-cols-7'>
                                                    <p className='col-span-4 text-base'><FontAwesomeIcon
                                                        icon={Icons.faSocks}/>&#8194; BottomSize: </p>
                                                    <p className='text-base text-gray-600'> {this.state.bottomSize}</p>
                                                </div>

                                                <div className='grid grid-cols-5'>
                                                    <p className='col-span-3 text-base'><FontAwesomeIcon
                                                        icon={Icons.faShirt}/>&#8194; JeanSize: </p>
                                                    <p className='text-base text-gray-600'> {this.state.jeanSize}</p>
                                                </div>

                                                <div className='grid grid-cols-5'>
                                                    <p className='col-span-3 text-base'><FontAwesomeIcon
                                                        icon={Icons.faSocks}/>&#8194; ShoeSize: </p>
                                                    <p className='text-base text-gray-600'> {this.state.shoeSize}</p>
                                                </div>
                                            </div>
                                        </div>

                                    }


                                </div>
                            </div>
                        </div>
                    </Content>
                </Container>
            </AnimationRevealPage>
        )
    }
}

export default OrderDetail;
