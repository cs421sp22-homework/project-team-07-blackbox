import React, {Component} from 'react'
import tw from "twin.macro";
import "../../styles/tailwind.min.css"
import 'flowbite'

const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between ml-4 mt-4`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;

class NavBarCustomer extends Component{

    render(){
        return(
            <NavRow>
                <div tw="flex flex-wrap justify-center lg:justify-end items-center -mr-12">
                    <NavLink target="_self"
                             href="/">
                        Homepage
                    </NavLink>
                    <NavLink target="_self"
                             href="/stylistList">
                    </NavLink>
                    <NavLink target="_self" href="#">
                        Shopping
                    </NavLink>
                    <NavLink target="_self" href="#">
                        Community
                    </NavLink>

                    <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                            className="text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                            type="button">Account <svg className="ml-2 w-4 h-4" fill="none"
                                                                stroke="currentColor" viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg></button>


                    <div id="dropdownDivider"
                         className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1" aria-labelledby="dropdownDividerButton">
                            <li>
                                <a href="/customer/profile"
                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Style Profile</a>
                            </li>
                            <li>
                                <a href="/account"
                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Account Setting</a>
                            </li>
                            <li>
                                <a href="/orders" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Orders</a>
                            </li>
                            <li>
                            <a href="/followStylist"
                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">FollowStylist</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cart</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </NavRow>
        )
    }
}

export default NavBarCustomer