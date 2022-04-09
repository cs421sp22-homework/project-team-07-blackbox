import React, {Component} from 'react'
import QuizForm from "../quiz/QuizForm"
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'
import CustomerProfileService from "../../api/styleBox/ProfileService";
import CustomerForm from "./CustomerForm";
import NavBarCustomer from "../navBar_footer/NavBarCustomer";
import Footer from 'styleBox/navBar_footer/Footer';
import {PrimaryButton as PrimaryButtonBase} from "../../components/misc/Buttons";
import Multiselect from "multiselect-react-dropdown";


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
            styles: [{name: 'Academic', id: 1},
                {name: 'Casual', id: 2},
                {name: 'Sexy', id: 3},
                {name: 'Sports', id: 4},
                {name: 'Formal', id: 5}],
            selectedStyles: [],
            edit : false,

        }

        this.clickedit = this.clickedit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
        this.onSelectStyle = this.onSelectStyle.bind(this)
        this.onRemoveStyle = this.onRemoveStyle.bind(this)
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
        console.log(this.state.selectedStyles);
        let info = {
            gender: this.state.gender,
            ftSize: this.state.ftSize,
            inSize: this.state.inSize,
            weight: this.state.weight,
            shirtSize: this.state.shirtSize,
            bottomSize: this.state.bottomSize,
            jeanSize: this.state.jeanSize,
            shoeSize: this.state.shoeSize,
            styleSet: this.state.selectedStyles.map((st) => {
                return {styleName: st}
            })
        }
        console.log(info)
        this.setState({edit: false})
        CustomerProfileService.modifyCustomerProfile(info)
        // this.redirect();
    }

    componentDidMount() {
        CustomerProfileService.getHomepage()
            .then((response) => {
                this.setState({
                    gender: response.data.gender,
                    ftSize: response.data.ftSize,
                    inSize: response.data.inSize,
                    weight: response.data.weight,
                    shirtSize: response.data.shirtSize,
                    bottomSize: response.data.bottomSize,
                    jeanSize: response.data.jeanSize,
                    shoeSize: response.data.shoeSize,
                    selectedStyles: response.data.styleSet,
                });
                console.log(response.data)
            })
            .catch(error => console.log(error.response))

    }

    onSelectStyle(selectedList, selectedItem) {
        this.setState({
            selectedStyles: selectedList.map((st) => {
                if (st.hasOwnProperty('name')) {
                    return st.name
                } else {
                    return st
                }
            })
        })
    }

    onRemoveStyle(selectedList, selectedItem) {
        this.setState({
            selectedStyles: selectedList.map((st) => {
                if (st.hasOwnProperty('name')) {
                    return st.name
                } else {
                    return st
                }
            })
        })
    }

    render() {
        return (
            <div>
                <NavBarCustomer/>
                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>
                        {this.state.edit == false &&
                            <div className="mt-10 sm:mt-0 xl:ml-80 xl:mr-80">
                                <div className="md:grid md:grid-cols-2 md:gap-6">
                                    <div className="md:col-span-1 ml-8">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-pink-700">My Profile</h3>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2 ml-10 mr-10">
                                        <form action="#" method="POST">
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="first-name"
                                                                   className="block text-sm font-medium text-pink-700">Gender</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.gender}</text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="last-name"
                                                                   className="block text-sm font-medium text-pink-700">Weight</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.weight} </text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="city"
                                                                   className="block text-sm font-medium text-pink-700">Height.</label>
                                                            <div className="grid grid-cols-6 gap-6">
                                                                <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500
                                                            block w-full shadow-sm sm:text-sm border-gray-300 rounded-md col-span-6 sm:col-span-2">
                                                                    {this.state.ftSize}</text>
                                                                <text className="block text-sm font-medium text-pink-700 sm:col-span-1 mt-3">FT.</text>
                                                                <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                                                            shadow-sm sm:text-sm border-gray-300 rounded-md sm:col-span-2">
                                                                    {this.state.inSize}</text>
                                                                <text className="block text-sm font-medium text-pink-700 sm:col-span-1 mt-3">IN.</text>
                                                            </div>

                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                            <label htmlFor="region"
                                                                   className="block text-sm font-medium text-pink-700">Shirt Size</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.shirtSize} </text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                            <label htmlFor="postal-code"
                                                                   className="block text-sm font-medium text-pink-700">Bottom Size</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.bottomSize} </text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="email-address"
                                                                   className="block text-sm font-medium text-pink-700">Jean Size</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.jeanSize} </text>
                                                        </div>

                                                        <div className="col-span-6">
                                                            <label htmlFor="street-address"
                                                                   className="block text-sm font-medium text-pink-700">Preference Style</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.selectedStyles + " "} </text>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                    <button type="submit" onClick={this.clickedit}
                                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }

                        {this.state.edit == true &&
                            <div className="mt-10 sm:mt-0 xl:ml-80 xl:mr-80 h-full">
                                <div className="md:grid md:grid-cols-2 md:gap-6">
                                    <div className="md:col-span-1 ml-8">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-pink-700">My Profile</h3>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2 ml-10 mr-10 lg:h-auto">
                                        <form action="#" method="POST">
                                            <div className="shadow sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="first-name"
                                                                   className="block text-sm font-medium text-pink-700">Gender</label>
                                                            <select className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                                                            shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"
                                                                    value={this.state.gender} name="gender" onChange={this.handleChange}>
                                                                <option value="male">male</option>
                                                                <option value="female">female</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="last-name"
                                                                   className="block text-sm font-medium text-pink-700">Weight</label>
                                                            <input className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500
                                                            block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"
                                                                  type="text" value={this.state.weight} name="weight" onChange={this.handleChange}/>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="city"
                                                                   className="block text-sm font-medium text-pink-700">Height.</label>
                                                            <div className="grid grid-cols-6 gap-6">
                                                                <input className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500
                                                            block w-full shadow-sm sm:text-sm border-gray-300 rounded-md col-span-6 sm:col-span-2 bg-gray-100"
                                                                      type="text" value={this.state.ftSize} name="ftSize" onChange={this.handleChange}/>
                                                                <text className="block text-sm font-medium text-pink-700 sm:col-span-1 mt-3">FT.</text>
                                                                <input className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                                                            shadow-sm sm:text-sm border-gray-300 rounded-md sm:col-span-2 bg-gray-100"
                                                                       type="text" value={this.state.inSize} name="inSize" onChange={this.handleChange}/>
                                                                <text className="block text-sm font-medium text-pink-700 sm:col-span-1 mt-3">IN.</text>
                                                            </div>

                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                            <label htmlFor="region"
                                                                   className="block text-sm font-medium text-pink-700">Shirt Size</label>
                                                            {/*<input className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500*/}
                                                            {/*block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"*/}
                                                            {/*       type="text" value={this.state.shirtSize} name="shirtSize" onChange={this.handleChange}/>*/}
                                                            <select className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                                                            shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"
                                                                    value={this.state.shirtSize} name="shirtSize" onChange={this.handleChange}>
                                                                <option value="large">Large</option>
                                                                <option value="middle">Middle</option>
                                                                <option value="small">Small</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                            <label htmlFor="postal-code"
                                                                   className="block text-sm font-medium text-pink-700">Bottom Size</label>
                                                            {/*<input className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full*/}
                                                            {/*shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"*/}
                                                            {/*      type="text" value={this.state.bottomSize} name="bottomSize" onChange={this.handleChange}/>*/}
                                                            <select className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                                                            shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"
                                                                    value={this.state.bottomSize} name="bottomSize" onChange={this.handleChange}>
                                                                <option value="large">Large</option>
                                                                <option value="middle">Middle</option>
                                                                <option value="small">Small</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="email-address"
                                                                   className="block text-sm font-medium text-pink-700">Jean Size</label>
                                                            {/*<input className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block*/}
                                                            {/*w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100 bg-gray-100"*/}
                                                            {/*       type="text" value={this.state.jeanSize} name="jeanSize" onChange={this.handleChange}/>*/}
                                                            <select className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                                                            shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"
                                                                    value={this.state.jeanSize} name="jeanSize" onChange={this.handleChange}>
                                                                <option value="large">Large</option>
                                                                <option value="middle">Middle</option>
                                                                <option value="small">Small</option>
                                                            </select>

                                                        </div>

                                                        <div className="col-span-6">
                                                            <label htmlFor="street-address"
                                                                   className="block text-sm font-medium text-pink-700">Preference Style</label>
                                                            {console.log("style", this.state.selectedStyles)}
                                                            <Multiselect
                                                                className="h-full font-small text-sm lg:text-sm xl:text-sm
                                                                text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2"
                                                                options={this.state.styles} // Options to display in the dropdown
                                                                selectedValues={this.state.selectedStyles.map((st, index) => {
                                                                    return {id: index, name: st}
                                                                })} // Preselected value to persist in dropdown
                                                                onSelect={this.onSelectStyle} // Function will trigger on select event
                                                                onRemove={this.onRemoveStyle} // Function will trigger on remove event
                                                                displayValue="name" // Property name to display in the dropdown options
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                    <button type="submit" onClick={this.submitInfo}
                                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600
                                                            hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        }


                <Footer/>
            </div>
        )
    }
}

export default CustomerProfile
