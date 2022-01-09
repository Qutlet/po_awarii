import React, {Component} from "react";
import PropTypes from "prop-types";
import "../css/Details.css"

export default class PhotoObject extends Component {
    render() {
        const {name} = this.props.photo;
        let url;
        if(name) {
            url = "http://localhost:8080/file/download/" + name;
        } else {
            url = "default_profile.png"
        }
        return (
            <div className="gallery">
                <img src={url} width="100" height="100" alt={"photo"}/>
            </div>
        )
    }
}

PhotoObject.propTypes = {
    photo:PropTypes.shape({
        name:PropTypes.string,
    }).isRequired
}