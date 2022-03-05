import React, {Component} from 'react'
import QuizForm from "./QuizForm";
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'


class CustomerProfile extends Component{
    constructor(props) {
        super(props);

        this.state={
            gender="Female",
            ftSize="23",
            inSize="20",
            weight="60",
            shirtSize="80",
            bottomSize="20",
            jeanSize="40",
            shoeSize="35",
            style=["casual, business"],
            edit = false,
        }
    }
    //componentDidMount(){
    clickedit(){
        if(this.edit==false){
            this.setState({edit:true});
        }
    }

    changeGender(e){
        let gender = e.target.value;
        this.setState({
            gender:gender
        })
    }

    changeFtsize(e){
        let ftSize = e.target.value;
        this.setState({
            ftSize:ftSize
        })
    }

    changeInsize(e){
        let inSize = e.target.value;
        this.setState({
            inSize:inSize
        })
    }

    changeWeight(e){
        let weight = e.target.value;
        this.setState({
            weight:weight
        })
    }

     changeShirtsize(e){
         let shirtSize = e.target.value;
         this.setState({
             shirtSize:shirtSize
         })
     }

     changeBottomsize(e){
         let bottomSize = e.target.value;
         this.setState({
             bottomSize:bottomSize
         })
     }

     changeJeansize(e){
         let jeanSize = e.target.value;
         this.setState({
             jeanSize:jeanSize
         })
     }

     changeShoesize(e){
         let shoeSize = e.target.value;
         this.setState({
             shoeSize:shoeSize
         })
     }

     changeStyle(e){
         let style = e.target.value;
         this.setState({
             style:style
         })
     }

     redirect(){
     }

    submitInfo(){
        let info = {gender: this.state.gender,
            ft: this.state.ft,
            in: this.state.in,
            weight: this.state.weight,
            shirtSize: this.state.shirtSize,
            bottomSize: this.state.bottomSize,
            jeanSize: this.state.jeanSize,
            shoeSize: this.state.shoeSize,
            style: this.state.style
        }
        this.setState({edit:false})
        CustomerProfileService.modifyProfile(info)
        this.redirect();
    }

    CustomerProfileService.getHomepage({
    .then(response=>this.setState({
        gender: response.data.gender,
        ftSize: response.data.ftSize,
        inSize: response.data.inSize,
        weight: response.data.weight,
        shirtSize: response.data.shirtSize,
        bottomSize: response.data.bottomSize,
        jeanSize: response.data.jeanSize,
        shoeSize: response.data.shoeSize,
        style: response.data.style
    }))
    .catch(error => console.log(error.response))
    }



    render() {
        return (
            <QuizForm>
                <span>
                    {this.state.edit == false &&
                    <form>
                        <div className=" grid grid-cols-2 gap-1">
                            <label>Gender:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.gender}</text>
                            </div>
                            <label>Height:</label>
                            <div className="grid grid-cols-4">
                                <text >{this.state.ftSize}</text>
                                <label>FT.</label>
                                <text >{this.state.inSize}</text>
                                <label>IN.</label>
                            </div>
                            <label>Weight:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.weight}</text>
                                <label>LBS.</label>
                            </div>
                            <label>Shirt Size:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.shirtSize}</text>
                            </div>
                            <label>Bottom Size:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.bottomSize}</text>
                            </div>
                            <label>Jean Size:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.jeanSize}</text>
                            </div>
                            <label>Shoe Size:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.shoeSize}</text>
                            </div>
                            <label>Preference Style:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.style +" "}</text>
                            </div>
                            <button onClick={this.clickedit}>Edit</button>
                        </div>
                    </form>
                    }

                    {this.state.edit == true &&
                    <form>
                        <div className=" grid grid-cols-2 gap-1">
                            <label>Gender:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.gender} onChange = {this.changeGender}/>
                            </div>
                            <label>Height:</label>
                            <div className="grid grid-cols-4">
                                <input type="text" value={this.state.ftSize} onChange = {this.changeFtsize}/>
                                <label>FT.</label>
                                <input type="text" value={this.state.inSize} onChange = {this.changeInsize}/>
                                <label>IN.</label>
                            </div>
                            <label>Weight:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.weight} onChange = {this.changeWeight}/>
                                <label>LBS.</label>
                            </div>
                            <label>Shirt Size:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.shirtSize} onChange = {this.changeShirtsize}/>
                            </div>
                            <label>Bottom Size:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.bottomSize} onChange = {this.changeBottomsize}/>
                                <text >{this.state.bottomSize}</text>
                            </div>
                            <label>Jean Size:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.jeanSize} onChange = {this.changeJeansize}/>
                            </div>
                            <label>Shoe Size:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.shoeSize} onChange = {this.changeShoesize}/>
                            </div>
                            <label>Preference Style:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.style} onChange = {this.changeStyle}/>
                            </div>
                            <button onClick={this.submitInfo}>Submit</button>
                        </div>
                    </form>
                    }


                </span>

            </QuizForm>
        )
    }
}

export default CustomerProfile