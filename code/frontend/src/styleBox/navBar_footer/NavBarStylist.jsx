import React, {Component} from 'react'
import tw from "twin.macro";
import "../../styles/tailwind.min.css"
import 'flowbite'
import "../../styles/globalStyles.css"
// import 'bootstrap/dist/css/bootstrap.min.css'
import './Dropdown'
import Dropdown from "./Dropdown";
import AuthenticationService from "../../api/styleBox/AuthenticationService";
import orderService from "../../api/styleBox/OrderService";

const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between ml-4 mt-4`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;

class NavBarStylist extends Component{

    constructor(props) {
        super(props);

        this.state = {
            newNoti: true
        }
        this.getNoti = this.getNoti.bind(this)
    }

    getNoti() {
        orderService.getNotification().then(
            (response) => {
                console.log(response)
                this.setState({newNoti: response.data.newNotification})
            }
        )
    }

    componentDidMount() {
        this.getNoti()
    }

    render(){
        return(
            <NavRow>
                <div className="flex flex-wrap justify-center lg:justify-end items-center -mr-12">
                    <NavLink target="_self"
                             href="/">
                        Homepage
                    </NavLink>
                    <NavLink target="_self"
                             href="/stylistList">
                        Stylists
                    </NavLink>
                    <NavLink target="_self" href="#">
                        Shopping
                    </NavLink>
                    <NavLink target="_self" href="#">
                        Community
                    </NavLink>
                    <Dropdown MenuName="Account" items={[
                        {
                        ItemName: "Stylist Profile",
                        link: "/stylist/profile"
                        },
                        {
                            ItemName: "Account Setting",
                            link: "/account"
                        },
                        {
                            ItemName: "Orders",
                            link: "/orders"
                        },
                        {
                            ItemName: "Sign out",
                            link: "/",
                            onClick: AuthenticationService.logOut
                        }


                        ]} noti = {this.state.newNoti}/>


                </div>
            </NavRow>
        )
    }
}

export default NavBarStylist
