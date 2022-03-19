import React, {Component} from 'react'
import tw from "twin.macro";

import Cookies from "react-cookies";
import NavBar from "./NavBar";
import NavBarCustomer from "./NavBarCustomer";
import NavBarStylist from "./NavBarStylist";

export const checkCustomer = ()=>{
    return Cookies.load('role')==='Customer';
}


class NavBarAuthenticated extends Component{
    constructor(props) {
        super(props);
        this.checkIdentity = this.checkIdentity.bind(this)
    }

    checkIdentity(){
        if(!Cookies.load('role'))
            return 0;
        if(Cookies.load('role') === 'Customer')
            return 1;
        if(Cookies.load('role') === 'Stylist')
            return 2;
    }

    render(){
        return(
            <div>
                {this.checkIdentity() === 0 && <NavBar/>}
                {this.checkIdentity() === 1 && <NavBarCustomer/>}
                {this.checkIdentity() === 2 && <NavBarStylist/>}
            </div>
        );
    }


}

export default NavBarAuthenticated