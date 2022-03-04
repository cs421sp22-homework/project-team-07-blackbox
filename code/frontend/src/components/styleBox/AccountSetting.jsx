import React, {Component} from 'react'
import QuizForm from "./QuizForm";
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'


class QuizPage1 extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }



    render() {
        return (
            <QuizForm>
                <span>
                    <form>
                        <div className=" grid grid-cols-2 gap-1">
                            <label>Account:</label>
                            <div className="grid grid-cols-2">
                                <text >Choral</text>
                            </div>
                            <label>Password:</label>
                            <div className="grid grid-cols-2">
                                <text >123456</text>
                            </div>
                            <label>Phone:</label>
                            <div className="grid grid-cols-2">
                                <text >4423455645</text>
                            </div>
                            <label>Email:</label>
                            <div className="grid grid-cols-2">
                                <text >Choral@gmail.com</text>
                            </div>
                            <label>Shipping Address:</label>
                            <div className="grid grid-cols-2">
                                <text >Johns Hopkins University</text>
                            </div>
                            <label>Payment Information:</label>
                            <div className="grid grid-cols-2">
                                <text >6213218312312</text>
                            </div>

                        </div>
                    </form>
                    <button onClick={this.props.nextPage}>Edit</button>
                </span>

            </QuizForm>
        )
    }
}

export default QuizPage1