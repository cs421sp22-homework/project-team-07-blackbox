import React, {Component} from 'react'
import QuizForm from "../quiz/QuizForm"
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'
import CustomerProfileService from "../../api/styleBox/CustomerProfileService";
import CustomerForm from "./CustomerForm";
import NavBarCustomer from "../navBar_footer/NavBarCustomer";
import Footer from 'styleBox/navBar_footer/Footer';


class CustomerProfile extends Component {
    constructor(props) {
        super(props);

        this.state={
            gender:"Female",
            ftSize:"23",
            inSize:"20",
            weight:"60",
            shirtSize:"80",
            bottomSize:"20",
            jeanSize:"40",
            shoeSize:"35",
            style:["casual, business"],
            edit : false,

        }

        this.clickedit = this.clickedit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
    }

    //componentDidMount(){
    clickedit() {
        if (this.state.edit === false) {
            this.setState({edit: true});
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }


    // redirect() {
    // }

    submitInfo() {
        let info = {
            token: sessionStorage.getItem('token'),
            gender: this.state.gender,
            ftSize: this.state.ftSize,
            inSize: this.state.inSize,
            weight: this.state.weight,
            shirtSize: this.state.shirtSize,
            bottomSize: this.state.bottomSize,
            jeanSize: this.state.jeanSize,
            shoeSize: this.state.shoeSize,
            styleSet: this.state.styleSet.split(',')
        }
        console.log(this.state.styleSet)
        this.setState({edit: false})
        CustomerProfileService.modifyProfile(info)
        // this.redirect();
    }

    componentDidMount() {
        CustomerProfileService.getHomepage()
            .then(response => this.setState({
                gender: response.data.gender,
                ftSize: response.data.ftSize,
                inSize: response.data.inSize,
                weight: response.data.weight,
                shirtSize: response.data.shirtSize,
                bottomSize: response.data.bottomSize,
                jeanSize: response.data.jeanSize,
                shoeSize: response.data.shoeSize,
                styleSet: response.data.styleSet
            }))
            .catch(error => console.log(error.response))

    }


    render() {
        return (
            <div>
                <NavBarCustomer/>
                <CustomerForm>
                    <span>
                        {this.state.edit == false &&
                            <form>
                                <div className=" grid grid-cols-2 gap-1">
                                    <label>Gender:</label>
                                    <div className="grid grid-cols-2">
                                        <text>{this.state.gender}</text>
                                    </div>
                                    <label>Height:</label>
                                    <div className="grid grid-cols-4">
                                        <text>{this.state.ftSize}</text>
                                        <label>FT.</label>
                                        <text>{this.state.inSize}</text>
                                        <label>IN.</label>
                                    </div>
                                    <label>Weight:</label>
                                    <div className="grid grid-cols-2">
                                        <text>{this.state.weight}</text>
                                        <label>LBS.</label>
                                    </div>
                                    <label>Shirt Size:</label>
                                    <div className="grid grid-cols-2">
                                        <text>{this.state.shirtSize}</text>
                                    </div>
                                    <label>Bottom Size:</label>
                                    <div className="grid grid-cols-2">
                                        <text>{this.state.bottomSize}</text>
                                    </div>
                                    <label>Jean Size:</label>
                                    <div className="grid grid-cols-2">
                                        <text>{this.state.jeanSize}</text>
                                    </div>
                                    <label>Shoe Size:</label>
                                    <div className="grid grid-cols-2">
                                        <text>{this.state.shoeSize}</text>
                                    </div>
                                    <label>Preference Style:</label>
                                    <div className="grid grid-cols-2">
                                        <text>{this.state.styleSet + " "}</text>
                                    </div>
                                </div>
                                <button onClick={this.clickedit}>Edit</button>
                            </form>
                        }

                        {this.state.edit == true &&
                            <form>
                                <div className=" grid grid-cols-2 gap-1">
                                    <label>Gender:</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" value={this.state.gender} name="gender" onChange={this.handleChange}/>
                                    </div>
                                    <label>Height:</label>
                                    <div className="grid grid-cols-4">
                                        <input type="text" value={this.state.ftSize} name="ftSize" onChange={this.handleChange}/>
                                        <label>FT.</label>
                                        <input type="text" value={this.state.inSize} name="inSize" onChange={this.handleChange}/>
                                        <label>IN.</label>
                                    </div>
                                    <label>Weight:</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" value={this.state.weight} name="weight" onChange={this.handleChange}/>
                                        <label>LBS.</label>
                                    </div>
                                    <label>Shirt Size:</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" value={this.state.shirtSize} name="shirtSize" onChange={this.handleChange}/>
                                    </div>
                                    <label>Bottom Size:</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" value={this.state.bottomSize} name="bottomSize" onChange={this.handleChange}/>
                                    </div>
                                    <label>Jean Size:</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" value={this.state.jeanSize} name="jeanSize" onChange={this.handleChange}/>
                                    </div>
                                    <label>Shoe Size:</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" value={this.state.shoeSize} name="shoeSize" onChange={this.handleChange}/>
                                    </div>
                                    <label>Preference Style:</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" value={this.state.styleSet} name="styleSet" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <button onClick={this.submitInfo}>Submit</button>
                            </form>

                        }


                    </span>

                </CustomerForm>
                <Footer/>
            </div>
        )
    }
}

export default CustomerProfile