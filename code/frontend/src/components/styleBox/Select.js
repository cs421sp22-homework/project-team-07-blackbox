import React, {Component} from 'react'


class　Select extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }

    render(){
        return(
            <div>
                <select onChange={()=>this.props.onClick}>
                    <option value=""></option>
                </select>
            </div>
        )
    }

}

export default Select