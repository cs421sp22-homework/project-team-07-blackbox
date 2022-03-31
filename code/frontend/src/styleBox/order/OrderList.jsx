import tw from 'twin.macro'
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import NavBarCustomer from 'styleBox/navBar_footer/NavBarCustomer';
import NavBarStylist from 'styleBox/navBar_footer/NavBarStylist';
import React, {Component} from "react";
import {Container as ContainerBase} from "components/misc/Layouts";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import OrderService from 'api/styleBox/OrderService';
import Cookies from 'react-cookies';
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";
import '../../styles/unread.css'

const Container = tw(ContainerBase)`min-h-screen bg-pink-900 text-white font-medium flex justify-center mt-8`;
const Content = tw.div`m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const TableRow = tw.th`text-sm font-medium text-gray-900 px-6 py-4 text-center`;
const TableValue = tw.td`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap`;
const ViewBtn = tw.button`inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`;

class OrderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPage: 5,
            sort: "",
            orderlst: [{
                nickname: "MangoC",
                orderPrice: 300,
                styleSet: ["Cool"],
                occasionSet: ["Casual"],
                description: "This is a sample description. Some quick example text to build on the card title and make up the bulk of the card's content. Want to desigin a cloth style for business meeting.",
                clothPriceLow: 200,
                clothPriceHigh: 300,
                time: "2022/3/5",
                orderId: 1,
                read: false,
                orderStatus: 0
            },
                {
                    nickname: "xxx",
                    orderPrice: 230,
                    styleSet: ["None", "Sexy"],
                    occasionSet: ["Dating"],
                    description: "Look beautiful",
                    clothPriceLow: 500,
                    clothPriceHigh: 800,
                    time: "2022/3/9",
                    orderId: 2,
                    read: true,
                    orderStatus: 0
                }]
        }
        this.sortBtn = this.sortBtn.bind(this)
        this.changePage = this.changePage.bind(this)
        this.showOrderList = this.showOrderList.bind(this)
        this.viewOrder = this.viewOrder.bind(this)
        this.showDescription = this.showDescription.bind(this)
        this.checkCustomer = this.checkCustomer.bind(this)
        this.showStatus = this.showStatus.bind(this)
    }


    changePage(event) {
        let myPage = this.state.currentPage
        if (event.target.name === "prevBtn") {
            this.setState({currentPage: this.state.currentPage - 1})
            myPage = myPage - 2
        }
        if (event.target.name === "nextBtn") {
            this.setState({currentPage: this.state.currentPage + 1})
        }
        this.showOrderList(myPage, this.state.sort)
    }

    sortBtn(event) {
        console.log(event.currentTarget.getAttribute('name'))
        if (event.currentTarget.getAttribute('name') === "timeBtn") {
            this.showOrderList(this.state.currentPage - 1, "time")
        }
        if (event.currentTarget.getAttribute('name') === "viewBtn") {
            this.showOrderList(this.state.currentPage - 1, "isRead")
        }
    }

    showOrderList(pageValue, sortValue) {
        OrderService.getOrderList(pageValue, sortValue)
            .then(response => {
                console.log(response)
                this.setState({
                    orderlst: response.data.data,
                    totalPage: response.data.totalPages
                })
            })
            .catch(error => console.log(error.response))
    }

    componentDidMount() {
        this.showOrderList(0, "")
    }

    viewOrder(orderId) {
        // console.log(orderId)
        this.props.history.push({pathname: "/orderDetail", query: {id: orderId}})
    }

    showDescription(info) {
        if (info.length > 10) {
            return info.substring(0, 9) + " ..."
        }
        return info
    }

    // return user type
    checkCustomer() {
        return Cookies.load('role') === 'Customer';
    }

    showStatus(orderStatus) {
        switch (orderStatus) {
            case 1 :
                return "To be accepted"
            case 2 :
                return "Rejected"
            case 3 :
                return "To be paid"
            case 4 :
                return "In process"
            case 5 :
                return "To be confirmed"
            case 6 :
                return "Completed"
            default :
                return "Incorrect status"
        }
    }

    render() {
        return (
            <AnimationRevealPage>
                <NavBarAuthenticated/>
                <Container>
                    <Content>
                        <MainContainer>
                            <MainContent>
                                <h2 className="text-3xl font-bold mt-0 mb-6">My Order</h2>
                                <h5 className="text-xl font-bold mb-8">View your order list</h5>

                                <div
                                    className="flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8 py-2 inline-block min-w-full sm:px-6 lg:px-8 overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-white border-b bg-gray-50">
                                        <tr>
                                            <TableRow> Id </TableRow>
                                            <TableRow> OrderId </TableRow>
                                            <TableRow> Nickname </TableRow>
                                            <TableRow> OrderPrice </TableRow>
                                            <TableRow> Styles </TableRow>
                                            <TableRow> Locations </TableRow>
                                            <TableRow> Description </TableRow>
                                            <TableRow> ClothPrice (Low) </TableRow>
                                            <TableRow> ClothPrice (High) </TableRow>
                                            <TableRow> Time <button name="timeBtn" onClick={this.sortBtn}>
                                                <FontAwesomeIcon icon={Icons.faSort}/></button></TableRow>
                                            <TableRow> View <button name="viewBtn" onClick={this.sortBtn}>
                                                <FontAwesomeIcon icon={Icons.faSort}/></button></TableRow>
                                            <TableRow> Status </TableRow>
                                            <TableRow> Action </TableRow>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.orderlst.map((order, index) => (
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <TableValue>{index}</TableValue>
                                                <TableValue>{order.orderId}</TableValue>
                                                <TableValue>{order.nickname}</TableValue>
                                                <TableValue>{order.orderPrice}</TableValue>
                                                <TableValue>{this.showDescription(order.styleSet.join(', '))}</TableValue>
                                                <TableValue>{this.showDescription(order.occasionSet.join(', '))}</TableValue>
                                                <TableValue>{this.showDescription(order.description)}</TableValue>
                                                <TableValue>{order.clothPriceLow}</TableValue>
                                                <TableValue>{order.clothPriceHigh}</TableValue>
                                                <TableValue>{this.showDescription(order.time)}</TableValue>
                                                <TableValue>{order.read.toString()}</TableValue>
                                                <TableRow> {
                                                    this.showStatus(order.orderStatus)
                                                } </TableRow>
                                                <TableValue>
                                                    <ViewBtn
                                                        onClick={() => this.viewOrder(order.orderId)}>View</ViewBtn>
                                                    {order.read ? <div/> : <div className="badge">!</div>}
                                                </TableValue>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-center my-6">
                                    <nav>
                                        <ul className="flex list-style-none">
                                            {(this.state.currentPage === 1)
                                                ? <li className="page-item disabled">
                                                    <button
                                                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                                                        tabindex="-1" aria-disabled="true">Previous
                                                    </button>
                                                </li>
                                                : <li class="page-item">
                                                    <button name='prevBtn'
                                                            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                                            onClick={this.changePage}>Previous
                                                    </button>
                                                </li>}

                                            <li class="page-item"><p
                                                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 pointer-events-none focus:shadow-none">{this.state.currentPage}</p>
                                            </li>

                                            {(this.state.currentPage >= this.state.totalPage)
                                                ? <li className="page-item disabled">
                                                    <button
                                                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                                                        tabindex="-1" aria-disabled="true">Next
                                                    </button>
                                                </li>
                                                : <li class="page-item">
                                                    <button name='nextBtn'
                                                            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                                            onClick={this.changePage}>Next
                                                    </button>
                                                </li>
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </MainContent>
                        </MainContainer>
                    </Content>
                </Container>
            </AnimationRevealPage>
        )
    }

}

export default OrderList;
