import React, {Component} from 'react'
import tw from "twin.macro";


const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between ml-4 mt-4`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;
const PrimaryNavLink = tw(
    NavLink
)`text-gray-100 bg-pink-500 px-6 py-3 border-none rounded hocus:bg-pink-900 focus:shadow-inner mt-6 md:mt-4 lg:mt-0`;
class NavBar extends Component{

    render(){
        return(
            <NavRow>
                <div tw="flex flex-wrap justify-center lg:justify-end items-center -mr-12">
                    <NavLink target="_self"
                             href="/">
                        Homepage
                    </NavLink>
                    <NavLink target="_self"
                             href="#">
                        Stylists
                    </NavLink>
                    <NavLink target="_self" href="#">
                        Shopping
                    </NavLink>
                    <NavLink target="_self" href="#">
                        Community
                    </NavLink>
                    <div tw="md:hidden flex-auto h-0"></div>
                    <PrimaryNavLink target="_self" href="/login">
                        Login
                    </PrimaryNavLink>
                </div>
            </NavRow>
        )
    }
}

export default NavBar