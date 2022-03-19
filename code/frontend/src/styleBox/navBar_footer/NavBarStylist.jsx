import React, {Component} from 'react'
import tw from "twin.macro";
import "../../styles/tailwind.min.css"
import 'flowbite'
import "../../styles/globalStyles.css"
// import 'bootstrap/dist/css/bootstrap.min.css'
import './Dropdown'
import Dropdown from "./Dropdown";

const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between ml-4 mt-4`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;

class NavBarStylist extends Component{

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
                            link: "#/action-3"
                        }



                        ]}/>


                </div>
            </NavRow>
        )
    }
}

export default NavBarStylist