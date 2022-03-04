import React, {Component} from 'react'
import QuizForm from "./QuizForm";
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'

const heading = tw.div`mb-20 text-2xl text-pink-700`;
const HeadingLine = tw(heading)``;

class QuizPage3 extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <QuizForm>
                <span>
                    <HeadingLine>Do you like this style?</HeadingLine>

                    <div className="grid grid-cols-2">
                        <button onClick={this.props.prevPage}>Prev</button>
                        <button onClick={this.props.nextPage}>Next</button>
                    </div>
                </span>

            </QuizForm>
        )
    }
}

export default QuizPage3