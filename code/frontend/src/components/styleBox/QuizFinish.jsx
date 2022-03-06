import React, {Component} from 'react'
import QuizForm from "./QuizForm";
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'

const heading = tw.div`mb-2 text-3xl text-pink-700`;
const HeadingLine = tw(heading)``;

const Button = tw.button`bg-pink-500 hover:bg-pink-700 text-white font-bold border border-pink-700 rounded text-lg mt-4 mx-20 py-3 px-8`

class QuizFinish extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <QuizForm>
                <span>
                    <HeadingLine>The quiz is finished</HeadingLine>
                    <HeadingLine>Thank you for your answer!</HeadingLine>
                    <div className="grid grid-cols-2">
                        <Button onClick={this.props.prevPage}>Prev</Button>
                        <Button onClick={this.props.submitInfo}>Submit</Button>
                    </div>
                </span>

            </QuizForm>
        )
    }
}

export default QuizFinish