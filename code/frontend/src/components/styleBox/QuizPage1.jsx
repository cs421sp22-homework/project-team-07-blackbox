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
                        <div className=" grid grid-cols-2 gap-2">
                            <label>You identify yourself as</label>
                            <div className="grid grid-cols-2">
                                <select onChange={this.props.changeGender}>
                                    <option value="Man">Man</option>
                                    <option value="Woman">Woman</option>
                                    <option value="Kid">Kid</option>
                                </select>
                                <div></div>
                            </div>
                            <label>How tall are you?</label>
                            <div className="grid grid-cols-4">
                                <input type="text" value={this.props.ft} onChange = {this.props.changeFt}/>
                                <label>FT.</label>
                                <input type="text" value={this.props.in} onChange = {this.props.changeIn}/>
                                <label>IN.</label>
                            </div>
                            <label>What's your weight?</label>
                            <div className="grid grid-cols-4">
                                <input type="text" value={this.props.weight} onChange={this.props.changeWeight}/>
                                <label>LBS.</label>
                            </div>
                        </div>
                    </form>
                    <button onClick={this.props.nextPage}>Next</button>
                </span>

            </QuizForm>
        )
    }
}

export default QuizPage1