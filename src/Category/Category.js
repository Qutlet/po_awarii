import {Component} from "react";

export default class Category extends Component {

    render() {
        const value = this.props.value;
        return (
            <div style={{
                display: "flex"
            }}>
                <input type="checkbox" id="scales" name="scales"/>
                <label htmlFor="scales">{value}</label>
            </div>
        )
    }
}