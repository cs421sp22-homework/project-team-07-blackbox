import React, {Component} from 'react'
import QuizForm from "./QuizForm";
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'
import styled from "styled-components";
import {css} from "styled-components/macro";
import Alert from "@mui/material/Alert";
import "../../api/styleBox/QuizService"


const heading = tw.div`mb-20 text-2xl text-pink-700`;
const HeadingLine = tw(heading)``;

const PageButton = tw.button`bg-pink-500 hover:bg-pink-700 text-white font-bold border border-pink-700 rounded text-lg mt-12 mx-8 py-3 px-8`
const AnsButton = styled.button`
    ${css`background-color: rgb(250 204 21);`} 
    ${tw`hover:bg-yellow-700 focus:bg-red-600 active:bg-yellow-700 text-white font-bold border rounded text-sm my-10 mx-8 py-3 px-2 `}
`;

const Image = styled.div`
  ${props => css`background-image: url("${props.image}"); `}
  ${tw`h-80 bg-center bg-contain bg-no-repeat relative rounded-t`}
`;

class QuizPage3 extends Component{
    constructor(props) {
        super(props);
        this.state={
            answered: false,
            alert: false
        }
        this.yesButtonClicked = this.yesButtonClicked.bind(this)
        this.noButtonClicked = this.noButtonClicked.bind(this)
        this.nextPageClicked = this.nextPageClicked.bind(this)
    }

    yesButtonClicked(){
        this.setState({answered:true})
        this.props.addStyle();
        document.getElementById("yes").style.backgroundColor="red"
        document.getElementById("yes").style.borderColor = "yellow"
        document.getElementById("no").style.backgroundColor="rgb(250 204 21)"
    }

    noButtonClicked(){
        this.setState({answered:true})
        this.props.removeStyle();
        document.getElementById("no").style.backgroundColor="red"
        document.getElementById("no").style.borderColor = "yellow"
        document.getElementById("yes").style.backgroundColor="rgb(250 204 21)"
    }

    nextPageClicked(){
        if(this.state.answered === false)
            this.setState({alert: true})
        else
            this.props.nextPage();
    }



    render() {
        return (
            <QuizForm>
                {this.state.alert && <Alert severity="warning">Please select an answer.</Alert>}
                <span>
                    <HeadingLine>Do you like this style?</HeadingLine>
                    <Image image = {this.props.image}/>
                    <div className="grid grid-cols-4">
                        <div></div>
                        <AnsButton id="yes" onClick={this.yesButtonClicked}>Yes</AnsButton>
                        <AnsButton id="no" onClick={this.noButtonClicked}>No</AnsButton>
                        <div></div>
                    </div>
                    <div className="grid grid-cols-2">
                        <PageButton onClick={this.props.prevPage}>Prev</PageButton>
                        <PageButton onClick={this.nextPageClicked}>Next</PageButton>
                    </div>
                </span>

            </QuizForm>
        )
    }
}

export default QuizPage3