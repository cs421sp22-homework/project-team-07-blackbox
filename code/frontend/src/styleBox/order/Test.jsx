import {Component} from "react";
import {API_URL} from "../../Constants";
import axios from "axios";

class Test extends Component{
    constructor(props) {
        super(props);
        this.handelChange = this.handelChange.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {
            items: []
        }
    }

    handelChange(e){
        console.log(e.target.files)
        const files = e.target.files;
        for(let i = 0; i < files.length; i++){
            let item = {
                "itemName": "a",
                "itemImage": files[i]
            }
            this.state.items.push(item)
            this.setState(this.state.items)
        }
        console.log(this.state.items)
    }

    submit(){
        console.log("clicked")
        let newData = new FormData();
        //console.log(this.state.items)
        newData.append("items", this.state.items)
        newData.append("array", ["1","2","2"])
        for (let pair of newData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
        axios.post(`${API_URL}/test`, newData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).catch(function(e){
            console.log(e)
        })
    }

    render(){
        return(
            <div>
                <input type="file" id="file" onChange={this.handelChange} multiple="multiple"/>
                <button type="button" onClick={this.submit}>upload</button>
            </div>
        )
    }
}

export default Test