import React, {Component} from 'react'
import {ContainerWithSmallPadding} from "../misc/Layouts";
import NavBarCustomer from "./NavBarCustomer";
import Footer from "./Footer";
import "../../styles/tailwind.min.css"
import QuizPage1 from "./QuizPage1";
import QuizPage2 from "./QuizPage2";
import Alert from '@mui/material/Alert';
import QuizPage3 from "./QuizPage3";
import WomenCasual from "../../images/quiz/women/Casual.png"
import WomenLady from "../../images/quiz/women/Lady.png"
import WomenSexy from "../../images/quiz/women/Sexy.png"
import MenCasual from "../../images/quiz/men/Casual.png"
import MenFormal from "../../images/quiz/men/Formal.png"
import MenSports from "../../images/quiz/men/Sports.png"
import KidsAcademic from "../../images/quiz/kids/Academic.png"
import KidsCool from "../../images/quiz/kids/Cool.png"
import KidsSports from "../../images/quiz/kids/Sports.png"
import "../../api/styleBox/QuizService"
import cookie from 'react-cookies'

import QuizFinish from "./QuizFinish";
import QuizService from "../../api/styleBox/QuizService";

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
        this.addStyle = this.addStyle.bind(this)
        this.removeStyle = this.removeStyle.bind(this)
        this.redirect = this.redirect.bind(this)
        this.submitInfo = this.submitInfo.bind(this)

        this.state = {
            gender: "Man",
            ft: "",
            in: "",
            weight: "",
            shirtSize: "Medium",
            bottomSize: "Medium",
            jeanSize: "Medium",
            shoeSize: "Medium",
            style: [], //Causal, Lady, Sports, Cool, Academic
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
        console.log(this.state.shirtSize)
        this.setState({
            shirtSize: e.target.value
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
        console.log(this.state.shoeSize)
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
        if((this.state.pageNum === 1 && w_valid && h_valid) || this.state.pageNum === 2 || this.state.pageNum === 3
            || this.state.pageNum === 4 || this.state.pageNum === 5 || this.state.pageNum === 6) {
            this.setState({pageNum: this.state.pageNum + 1})
        }
        console.log(this.state.gender)

    }

    prevPage(){
        if(this.state.pageNum >= 1)
            this.setState({pageNum: this.state.pageNum-1})
    }

    addStyle(newStyle){
        this.setState({answered: true})
        if(this.state.style.indexOf(newStyle) === -1){
            this.setState({
                style: [...this.state.style, newStyle]
            })
        }
        console.log(this.state.style)
    }

    removeStyle(deleteStyle) {
        this.setState({answered: true})
        this.setState({style: this.state.style.filter(function(s) {
                return s !== deleteStyle
            })});
        console.log(this.state.style)
    }

    redirect(){
        this.props.history.push(`/`)
    }

    componentDidMount() {

    }

    submitInfo(){
        let info = {
            gender: this.state.gender,
            ftSize: this.state.ft,
            weight: this.state.weight,
            shirtSize: this.state.shirtSize,
            bottomSize: this.state.bottomSize,
            jeanSize: this.state.jeanSize,
            shoeSize: this.state.shoeSize,
            styleSet: this.state.style,
            inSize: this.state.in,
        }

        QuizService.executeQuizService(info)
        this.redirect();
    }

    render(){

        return (
            <div>
                <NavBarCustomer/>
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
                            shirtSize = {this.state.shirtSize}
                            bottomSize = {this.state.bottomSize}
                            shoeSize = {this.state.shoeSize}
                            jeanSize = {this.state.jeanSize}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                        />}
                    {/*Men*/}
                    {this.state.pageNum===3 && this.state.gender==="Man" &&
                        <QuizPage3
                            image = {MenCasual}
                            addStyle = {() => this.addStyle("Casual")}
                            removeStyle = {() => this.removeStyle("Casual")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {this.state.pageNum===4 && this.state.gender==="Man" &&
                        <QuizPage3
                            image = {MenSports}
                            addStyle = {() => this.addStyle("Sports")}
                            removeStyle = {() => this.removeStyle("Sports")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {this.state.pageNum===5 && this.state.gender==="Man" &&
                        <QuizPage3
                            image = {MenFormal}
                            addStyle = {() => this.addStyle("Formal")}
                            removeStyle = {() => this.removeStyle("Formal")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {/*Women*/}
                    {this.state.pageNum===3 && this.state.gender==="Woman" &&
                        <QuizPage3
                            image = {WomenCasual}
                            addStyle = {() => this.addStyle("Casual")}
                            removeStyle = {() => this.removeStyle("Casual")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {this.state.pageNum===4 && this.state.gender==="Woman" &&
                        <QuizPage3
                            image = {WomenLady}
                            addStyle = {() => this.addStyle("Lady")}
                            removeStyle = {() => this.removeStyle("Lady")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {this.state.pageNum===5 && this.state.gender==="Woman" &&
                        <QuizPage3
                            image = {WomenSexy}
                            addStyle = {() => this.addStyle("Sexy")}
                            removeStyle = {() => this.removeStyle("Sexy")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {/*Kids*/}
                    {this.state.pageNum===3 && this.state.gender==="Kid" &&
                        <QuizPage3
                            image = {KidsSports}
                            addStyle = {() => this.addStyle("Sports")}
                            removeStyle = {() => this.removeStyle("Sports")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {this.state.pageNum===4 && this.state.gender==="Kid" &&
                        <QuizPage3
                            image = {KidsAcademic}
                            addStyle = {() => this.addStyle("Academic")}
                            removeStyle = {() => this.removeStyle("Academic")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}
                    {this.state.pageNum===5 && this.state.gender==="Kid" &&
                        <QuizPage3
                            image = {KidsCool}
                            addStyle = {() => this.addStyle("Cool")}
                            removeStyle = {() => this.removeStyle("Cool")}
                            nextPage = {this.nextPage}
                            prevPage = {this.prevPage}
                        />}

                    {this.state.pageNum===6 &&
                        <QuizFinish
                            redirect = {this.redirect}
                            prevPage = {this.prevPage}
                            submitInfo = {this.submitInfo}
                        />}
                </ContainerWithSmallPadding>
                <Footer/>
            </div>
        )
    }
}

export default Quiz


