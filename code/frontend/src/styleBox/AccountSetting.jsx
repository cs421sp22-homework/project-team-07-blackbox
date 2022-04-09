import React, {Component} from 'react'
import QuizForm from "./quiz/QuizForm";
import "../styles/tailwind.min.css";
import tw from 'twin.macro'
import AccountSettingService from "../api/styleBox/AccountSettingService";
import CustomerForm from "./customer/CustomerForm";
import NavBarCustomer from "./navBar_footer/NavBarCustomer";
import NavBarAuthenticated from "./navBar_footer/NavBarAuthenticated"
import Footer from "./navBar_footer/Footer";

class AccountSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // account information
            username: "",
            email: "",
            phone: "",
            address: "",
            payment: "",
            facebook: "",
            nickname: "",
            edit: false,
            avatar: ""
        }
        this.clickedit = this.clickedit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    uploadImage(event) {
        console.log(event.target.files[0])
        this.setState(
            {avatar : event.target.files[0]}
        )
        let newAvatar = new FormData();
        newAvatar.append("avatar", event.target.files[0])
        AccountSettingService.modifyAvatar(newAvatar)
            .then((response) => console.log("modify avatar", response))
    }

    clickedit() {
        console.log(this.state.edit);
        if (this.state.edit === false) {
            this.setState({edit: true});
        }
    }


    submitInfo() {
        let info = {
            token: sessionStorage.getItem('token'),
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            payment: this.state.payment,
            facebook: this.state.facebook,
            nickname: this.state.nickname,
        }
        this.setState({edit: false})
        AccountSettingService.modifyAccount(info)
    }

    componentDidMount() {
        AccountSettingService.getHomepage()
            .then(response => this.setState({
                username: response.data.username,
                address: response.data.address,
                phone: response.data.phone,
                email: response.data.email,
                payment: response.data.payment,
                facebook: response.data.facebook,
                nickname: response.data.nickname,

            }))
            .catch(error => console.log(error.response))
    }

    render() {
        return (
            <div>
                <NavBarAuthenticated/>
                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>
                        {this.state.edit == false &&
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-2 md:gap-6">
                                    <div className="md:col-span-1 ml-8">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-pink-700">Account Setting</h3>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2 ml-10 mr-10">
                                        <form action="#" method="POST">
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="first-name"
                                                                   className="block text-sm font-medium text-pink-700">Username</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.username}</text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="last-name"
                                                                   className="block text-sm font-medium text-pink-700">Nickname</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.nickname} </text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                            <label htmlFor="city"
                                                                   className="block text-sm font-medium text-pink-700">Email</label>
                                                            <text  className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.email} </text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                            <label htmlFor="region"
                                                                   className="block text-sm font-medium text-pink-700">Phone</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.phone} </text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                            <label htmlFor="postal-code"
                                                                   className="block text-sm font-medium text-pink-700">Facebook</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.facebook} </text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-4">
                                                            <label htmlFor="email-address"
                                                                   className="block text-sm font-medium text-pink-700">Shipping Address
                                                                address</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.address} </text>
                                                        </div>

                                                        <div className="col-span-6">
                                                            <label htmlFor="street-address"
                                                                   className="block text-sm font-medium text-pink-700">Payment Information:</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.payment} </text>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-pink-700 ml-6">  Modify avatar  </label>
                                                    <div
                                                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ml-6 mr-6 mb-8">
                                                        <div className="space-y-1 text-center">
                                                            <svg className="mx-auto h-12 w-12 text-gray-400"
                                                                 stroke="currentColor" fill="none" viewBox="0 0 48 48"
                                                                 aria-hidden="true">
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    stroke-width="2" stroke-linecap="round"
                                                                    stroke-linejoin="round"/>
                                                            </svg>
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor="file-upload"
                                                                       className="ml-4 sm:items-center cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                                                                    <span>Upload a file</span>
                                                                    <input id="file-upload" name="file-upload" accept="image/*"
                                                                           onChange = {this.uploadImage}
                                                                           type="file" className="sr-only"/>
                                                                </label>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PNG, JPG up to
                                                                10MB</p>
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
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-2 md:gap-6">
                                    <div className="md:col-span-1 ml-8">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Account Setting</h3>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2 ml-10 mr-10">
                                        <form action="#" method="POST">
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="first-name"
                                                                   className="block text-sm font-medium text-pink-700">Username</label>
                                                            <text className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md">
                                                                {this.state.username}</text>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="last-name"
                                                                   className="block text-sm font-medium text-pink-700">Nickname</label>
                                                            <input type="text" value={this.state.nickname} name="nickname" onChange = {this.handleChange}
                                                                   className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"/>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                            <label htmlFor="city"
                                                                   className="block text-sm font-medium text-pink-700">Email</label>
                                                            <input type="text" value={this.state.email} name="email" onChange = {this.handleChange}
                                                                   className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"/>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                            <label htmlFor="region"
                                                                   className="block text-sm font-medium text-pink-700">Phone</label>
                                                            <input type="text" value={this.state.phone} name="phone" onChange = {this.handleChange}
                                                                   className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"/>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                            <label htmlFor="postal-code"
                                                                   className="block text-sm font-medium text-pink-700">Facebook</label>
                                                            <input type="text" value={this.state.facebook} name="facebook" onChange = {this.handleChange}
                                                                   className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"/>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-4">
                                                            <label htmlFor="email-address"
                                                                   className="block text-sm font-medium text-pink-700">Shipping Address
                                                                address</label>
                                                            <input type="text" value={this.state.address} name="address" onChange = {this.handleChange}
                                                                   className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"/>
                                                        </div>

                                                        <div className="col-span-6">
                                                            <label htmlFor="street-address"
                                                                   className="block text-sm font-medium text-pink-700">Payment Information</label>
                                                            <input type="text" value={this.state.payment} name="payment" onChange = {this.handleChange}
                                                                   className="mt-2 h-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md md bg-gray-100"/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-pink-700 ml-6"> Modify avatar </label>
                                                    <div
                                                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ml-6 mr-6 mb-8">
                                                        <div className="space-y-1 text-center">
                                                            <svg className="mx-auto h-12 w-12 text-gray-400"
                                                                 stroke="currentColor" fill="none" viewBox="0 0 48 48"
                                                                 aria-hidden="true">
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    stroke-width="2" stroke-linecap="round"
                                                                    stroke-linejoin="round"/>
                                                            </svg>
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor="file-upload"
                                                                       className="ml-4 sm:items-center cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                                                                    <span>Upload a file</span>
                                                                    <input id="file-upload" name="file-upload" accept="image/*"
                                                                           onChange = {this.uploadImage}
                                                                           type="file" className="sr-only"/>
                                                                </label>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PNG, JPG up to
                                                                10MB</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                    <button type="submit" onClick={this.submitInfo}
                                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Save
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

export default AccountSetting
