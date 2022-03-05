import tw from 'twin.macro'
import React, {Component} from 'react'
import {ContainerWithSmallPadding} from "../misc/Layouts";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../../styles/tailwind.min.css"
import QuizPage1 from "./QuizPage1";
import QuizPage2 from "./QuizPage2";
import Alert from '@mui/material/Alert';
import QuizPage3 from "./QuizPage3";
import WomenCasual from "../../images/quiz/women/Casual.png"


class Quiz extends Component{
    constructor(props) {
        super(props);
        this.changeGender = this.changeGender.bind(this)
        this.changeFt = this.changeFt.bind(this)
        this.changeIn = this.changeIn.bind(this)
        this.changeWeight = this.changeWeight.bind(this)
        this.isNumber = this.isNumber.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.checkWeightValid = this.checkWeightValid.bind(this)
        this.checkHeightValid = this.checkHeightValid.bind(this)
        this.changeShirtSize = this.changeShirtSize.bind(this)
        this.changeBottomSize = this.changeBottomSize.bind(this)
        this.changeJeanSize = this.changeJeanSize.bind(this)
        this.changeShoeSize = this.changeShoeSize.bind(this)


        this.state = {
            gender: "Man",
            ft: "",
            in: "",
            weight: "",
            shirtSize: "Medium",
            bottomSize: "Medium",
            jeanSize: "Medium",
            shoeSize: "Medium",
            style: [],
            weightValid: true,
            heightValid: true,
            pageNum: 1,
        }
    }

    isNumber(n)
        { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

    changeGender(e){
        let gender = e.target.value;
        this.setState({
            gender: gender
        })
    }

    changeFt(e){

        this.setState({
            ft: e.target.value
        })
    }

    changeIn(e){
        this.setState({
            in: e.target.value
        })
    }

    changeWeight(e){
        this.setState({
            weight: e.target.value
        })
    }

    changeShirtSize(e){
        this.setState({
            shirSize: e.target.value
        })
    }

    changeBottomSize(e){
        this.setState({
            bottomSize: e.target.value
        })
    }

    changeJeanSize(e){
        this.setState({
            jeanSize: e.target.value
        })
    }

    changeShoeSize(e){
        this.setState({
            shoeSize: e.target.value
        })
    }

    //check if the entered weight is a valid number
    checkWeightValid(){
        if(this.isNumber(this.state.weight)===false || this.state.weight<0) {
            this.setState({weightValid: false})
            return false
        }
        else {
            this.setState({weightValid: true})
            return true
        }
    }

    //check if the entered height is a valid number
    checkHeightValid(){
        if(this.isNumber(this.state.ft)===false || this.state.ft<3 || this.state.ft>6 ||
            this.isNumber(this.state.in)===false || this.state.in<0 || this.state.in>11) {
            this.setState({heightValid: false})
            return false
        }
        else {
            this.setState({heightValid: true})
            return true
        }
    }

    nextPage(){
        let w_valid = this.checkWeightValid()
        let h_valid = this.checkHeightValid()
        if(this.state.pageNum === 1 && w_valid && h_valid || this.state.pageNum === 2) {
            this.setState({pageNum: this.state.pageNum + 1})
            return
        }

    }

    prevPage(){
        this.setState({pageNum: this.state.pageNum-1})
    }

    componentDidMount() {

    }

    render(){
        return (
            <div>
                <NavBar/>
                <ContainerWithSmallPadding>
                    {this.state.pageNum===1 && !this.state.weightValid && <Alert severity="warning">Pleas enter a valid weight.</Alert>}
                    {this.state.pageNum===1 && !this.state.heightValid && <Alert severity="warning">Pleas enter a valid height.</Alert>}
                     {this.state.pageNum===1 &&
                         <QuizPage1
                             gender = {this.state.gender}
                             ft = {this.state.ft}
                             in = {this.state.in}
                             weight = {this.state.weight}
                             changeGender = {this.changeGender}
                             changeFt={this.changeFt}
                             changeIn={this.changeIn}
                             changeWeight={this.changeWeight}
                             nextPage={this.nextPage}
                         />}
                    {this.state.pageNum===2 &&
                        <QuizPage2
                            changeShirtSize = {this.changeShirtSize}
                            changeBottomSize = {this.changeBottomSize}
                            changeShoeSize = {this.changeShoeSize}
                            changeJeanSize = {this.changeJeanSize}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                        />}
                    {this.state.pageNum===3 && this.state.gender==="Woman" &&
                        <QuizPage3
                            image = {WomenCasual}
                        />}
                </ContainerWithSmallPadding>
                <Footer/>
            </div>
        )
    }
}

export default Quiz


