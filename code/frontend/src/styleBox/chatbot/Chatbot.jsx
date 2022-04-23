import React, {Component} from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components';
import ChatbotService from 'api/styleBox/ChatbotService';
import axios from "axios";
import {FLASK_API_URL} from "../../Constants";
// import {getValue} from "@testing-library/user-event/dist/utils";

const theme = {
    background: '#f5f8fb',
    headerBgColor: '#FFB6C1',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#FFB6C1',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',

};

// Set some properties of the bot
const config = {
    floating: true,

};

class Chatbot extends Component {
    constructor(props){
        super(props)

        this.state = {
            answer: "origin answer"
        }
        // function part
        this.getAnsFromBot = this.getAnsFromBot.bind(this)
    }

    async getAnsFromBot(ques){
        let ans = "";
        let info = {question: ques};

        // await axios.get(`${FLASK_API_URL}/chatbot`, {params: info})
        //     .then(response => {
        //         console.log(response.data.ans)
        //         return response.data
        //     })
        await axios.get(`${FLASK_API_URL}/chatbot`, {params: info})
            .then(response=>{
                this.setState({answer: response.data.ans})
                console.log(this.state.answer)
            })
        //console.log(typeof res.data.ans)
    }

    async getAns(ques){
        let ans = ""
        await this.getAnsFromBot(ques)
        console.log("end2")
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <div className="fixed bottom-0 right-0 z-50">
                    <ChatBot
                        steps={[
                            {
                                id: 'hello',
                                message: 'Hi, guest. How can I help you ?',
                                trigger: '1',
                            },
                            {
                                id: '1',
                                options: [
                                    { value: 1, label: 'Account', trigger: 'account' },
                                    { value: 2, label: 'Browse stylist', trigger: 'sty' },
                                    { value: 3, label: 'Orders', trigger: 'orders' },
                                    { value: 4, label: 'Ask questions', trigger: 'qus' },
                                    { value: 5, label: 'Finish', trigger: 'finish' },
                                ],
                            },
                            {
                                id: 'account',
                                message: 'Ok, I will introduce two roles: customer and stylist',
                                trigger: 'role',
                            },
                            {
                                id: 'role',
                                component: (
                                    <div className='text-xs'>
                                        1. For customer: you can browse stylist list, select stylist you like, and make an order.
                                        After the order is accepted, you need to pay and wait. Check order list to track status.
                                        If order is finished, rate it and share your experience! <br />

                                        2. For stylist: you can manage orders, either accept or reject. You should upload design file after finishing design.
                                        You can also update you profile and share your previous design.
                                    </div>
                                ),
                                trigger: '1',
                            },
                            {
                                id: 'sty',
                                message: 'Sure.',
                                trigger: 'styIntro',
                            },
                            {
                                id: 'styIntro',
                                component: (
                                    <div className='text-xs'> Click 'stylists' button in the menu bar to view all stylists.</div>
                                ),
                                trigger: '1',
                            },
                            {
                                id: 'orders',
                                component: (
                                    <div className='text-xs'> Login first, click 'Account' in the menu bar. Your will find the order button.
                                        Click to view all orders you have and check status, view detail or make an action.</div>
                                ),
                                trigger: '1',
                            },
                            {
                                id: 'qus',
                                message: 'Ok. Type your question below',
                                trigger: 'ques',
                            },
                            {
                                id: 'ques',
                                user: true,
                                trigger: 'ans',
                            },
                            {
                                id: 'ans',
                                message:  ({ previousValue, steps }) => {
                                    this.getAns(previousValue)
                                    return "Let me check..."

                                },
                                trigger: 'real-ans',
                            },
                            {
                                id: 'real-ans',
                                message: ({ previousValue, steps }) =>{
                                    let start = new Date().getTime();
                                    while(new Date().getTime() < start + 1000){
                                        console.log("wait")
                                    }
                                    return this.state.answer
                                },
                                trigger: 'confirm',
                            },
                            {
                                id: 'confirm',
                                message: 'Solve your question?',
                                trigger: 'solve',
                            },
                            {
                                id: 'solve',
                                options: [
                                    { value: 1, label: 'Yes', trigger: '1' },
                                    { value: 2, label: 'No', trigger: 'further' },
                                ],
                            },
                            {
                                id: 'further',
                                options: [
                                    { value: 1, label: 'Ask again.', trigger: 'qus' },
                                    { value: 2, label: 'We contact you.', trigger: 'email' },
                                ],
                            },
                            {
                                id: 'email',
                                message: 'Type your email so we will contact you soon.',
                                trigger: 'userEmail',
                            },
                            {
                                id: 'userEmail',
                                user: true,
                                trigger: '2',
                            },
                            {
                                id: '2',
                                message: 'Your email is {previousValue}. Continue if you want to know more.',
                                trigger: '1',
                            },
                            {
                                id: 'finish',
                                message: 'Bye!',
                                end: true,
                            },

                        ]}


                        {...config}
                    />
                </div>
            </ThemeProvider>
        )
    }

}
export default Chatbot;