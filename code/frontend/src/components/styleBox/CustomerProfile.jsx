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
                            <label>Gender:</label>
                            <div className="grid grid-cols-2">
                                <text >Female</text>
                            </div>
                            <label>Password:</label>
                            <div className="grid grid-cols-2">
                                <text >123456</text>
                            </div>
                            <label>Height:</label>
                            <div className="grid grid-cols-4">
                                <text >5</text>
                                <label>FT.</label>
                                <text >3</text>
                                <label>IN.</label>
                            </div>
                            <label>Weight:</label>
                            <div className="grid grid-cols-2">
                                <text >70</text>
                                <label>LBS.</label>
                            </div>
                            <label>Shirt Size:</label>
                            <div className="grid grid-cols-2">
                                <text >Large</text>
                            </div>
                            <label>Bottom Size:</label>
                            <div className="grid grid-cols-2">
                                <text >Large</text>
                            </div>
                            <label>Jean Size:</label>
                            <div className="grid grid-cols-2">
                                <text >Large</text>
                            </div>
                            <label>Shoe Size:</label>
                            <div className="grid grid-cols-2">
                                <text >Medium</text>
                            </div>
                            <label>Preference Style:</label>
                            <div className="grid grid-cols-2">
                                <text >Casual</text>
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