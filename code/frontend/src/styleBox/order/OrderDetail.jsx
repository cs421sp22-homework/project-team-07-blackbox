import tw from 'twin.macro'
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import React, {Component} from "react";
import {Container as ContainerBase} from "components/misc/Layouts";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Cookies from 'react-cookies';
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";
import OrderService from 'api/styleBox/OrderService';

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
            orderId: this.props.location.query.id,
            isWindowed: false,
            isAccept: -1,
            orderStatus: this.props.location.query.orderStatus,
            // orderStatus: 4
        }
        this.checkCustomer = this.checkCustomer.bind(this)
        this.backToOrders = this.backToOrders.bind(this)
        this.btnPressed = this.btnPressed.bind(this)
    }

    // return user type
    checkCustomer() {
        console.log("cus??", Cookies.load('role')==='Customer')
        return Cookies.load('role')==='Customer';
    }

    // Back to orderList when click back btn
    backToOrders() {
        this.props.history.push("/orders");
    }

    // Manage button pressed
    btnPressed(event){
        if(event.currentTarget.getAttribute('name') === "manageBtn"){
            this.setState({isWindowed: true});
        }
        else if(event.currentTarget.getAttribute('name') === "payBtn"){
            this.props.history.push({pathname:"/payOrder", query: { id : this.state.orderId, lowPrice: this.state.clothPriceLow, highPrice: this.state.clothPriceHigh, styName: this.state.cusNickname, price: this.state.orderPrice}})
        }
        else if(event.currentTarget.getAttribute('name') === "cancelBtn"){
            this.setState({isWindowed: false});
        }
        else if(event.currentTarget.getAttribute('name') === "acceptBtn"){
            this.setState({isWindowed: false, isAccept: 1});
            OrderService.manageOrder(this.state.orderId, 1);

        }
        else if(event.currentTarget.getAttribute('name') === "rejectBtn"){
            this.setState({isWindowed: false, isAccept: 0});
            OrderService.manageOrder(this.state.orderId, 0);
        }
        else if(event.currentTarget.getAttribute('name') === "createReportBtn"){
            this.props.history.push({pathname:"/createReport", query: { id : this.state.orderId, styName: this.state.cusNickname}})
        }
        else if(event.currentTarget.getAttribute('name') === "confirmBtn"){
            this.props.history.push({pathname:"/confirmOrder", state: { orderId : this.state.orderId }})
        }
        else if(event.currentTarget.getAttribute('name') === "viewReportBtn"){
            this.props.history.push({pathname:"/viewReport", query: { id : this.state.orderId }})
        }
    }

    componentDidMount() {
        console.log(this.state.orderStatus)
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
                        shoeSize: response.data.shoeSize,
                        isAccept: response.data.isAccept,
                        orderStatus: response.data.orderStatus
                    })
                    console.log(response)

                }
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    render() {
        return (
            <AnimationRevealPage>
                {this.state.isAccept === -1 && this.state.isWindowed?
                    <div>
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Manage Your Order</h3>
                                <div className="mt-2">
                                <p className="text-sm text-gray-500">Please accept or reject this order. Press cancel if you don't decide the action.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" name='acceptBtn' onClick={this.btnPressed} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Accept</button>
                            <button type="button" name='rejectBtn' onClick={this.btnPressed} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Reject</button>
                            <button type="button" name='cancelBtn' onClick={this.btnPressed} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div> : <div></div>
                }


                <NavBarAuthenticated/>
                <Container>
                    <Content>
                        <div className="p-6 mx-16 my-16 flex-initial shadow-lg rounded-lg bg-gray-50 text-gray-700">
                            <div className="grid grid-cols-3">
                                <h2 className="font-semibold text-2xl mb-5 px-3 py-5">Order
                                    # {this.state.orderId} Detail</h2>
                                <p className='text-base flex items-end mb-8'>(Created In {this.state.time})</p>
                                <div className='grid grid-cols-3 mb-3'>
                                    {/*{console.log("c?", this.checkCustomer)}*/}
                                    {// cust & case 5: view report
                                        this.state.orderStatus === 5 ?
                                            <button type="button"
                                                name='viewReportBtn'
                                                className="m-5 p-2 bg-yellow-500 text-white text-base leading-tight rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                onClick={this.btnPressed}>
                                                    View Report
                                            </button>
                                            : <div></div>}



                                    { /* button part: based on order status */
                                        // stylist & case 1: wait sty to accept/reject
                                        this.state.isAccept === -1 && this.state.orderStatus === 1 && (!this.checkCustomer())?
                                            <button type="button"
                                                    name='manageBtn'
                                                    className="m-5 p-2 bg-blue-600 text-white text-base leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    onClick={this.btnPressed}>
                                                        Manage
                                            </button>

                                        // all & case 2: stylist reject, don't show
                                        : this.state.orderStatus === 2 ? <div> </div>

                                        // customer & case 3: stylist accept, wait cus to pay
                                        : this.state.orderStatus === 3 && (this.checkCustomer())?
                                            <button type="button"
                                                name='payBtn'
                                                className="m-5 p-2 bg-blue-600 text-white text-base leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                onClick={this.btnPressed}>
                                                    Pay
                                            </button>

                                        // customer & case 4: cus pay, wait sty to create report
                                        : this.state.orderStatus === 4 && (!this.checkCustomer())?
                                                <button type="button"
                                                    name='createReportBtn'
                                                    className="m-5 p-2 bg-blue-600 text-white text-base leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    onClick={this.btnPressed}>
                                                        Create Report
                                                </button>

                                        // customer & case 5: sty create, wait cus to rate
                                        : this.state.orderStatus === 5 && (this.checkCustomer())?
                                            <button type="button"
                                                name='confirmBtn'
                                                className="m-5 p-2 bg-blue-600 text-white text-base leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                onClick={this.btnPressed}>
                                                    Confirm and Rate
                                            </button>

                                        // all & case 6: cus rate, finish
                                        : this.state.orderStatus === 6 ? 
                                            <button type="button"
                                                name='viewReportBtn'
                                                className="m-5 p-2 bg-yellow-500 text-white text-base leading-tight rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                                onClick={this.btnPressed}>
                                                    View Report
                                            </button>

                                        : <div> </div>
                                    }

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
                                    {this.checkCustomer()
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
