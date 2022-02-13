import React, {Component} from "react";
import PropTypes from 'prop-types'
import {ProductConsumer} from "../util/context";
import styled from 'styled-components';
import {Link} from "react-router-dom";

export default class SpecilistProfileObject extends Component {

    render() {
        const {id,firstName,lastName,categories,customProfileName,userPhoto} = this.props.specialistProfileObject;
        let url;
        if(userPhoto) {
            url = process.env.REACT_APP_SERVER + '/file/download/' + userPhoto;
        } else {
            url = "default_profile.png"
        }
        return (
            <ProductWrapper className="col -9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">

                    <ProductConsumer>
                        {(value) => (
                            <Link to={{
                                pathname: '/specialist/' + id ,
                                state: {
                                    id: id
                                }
                            }}>
                                <div className="img-container p-5">

                                    <div className="card-footer d-flex justify-content-between">
                                        <div style={{display : "flex"}}>
                                            <img src={url} alt="alternatetext"
                                                 style={{
                                                     borderColor: "gold",
                                                     width: "10%",
                                                     borderWidth: "5px",
                                                     borderStyle: "solid"}}
                                            />
                                            <h4 className="align-self-center mb-0" style={{
                                                marginLeft: "10px",
                                                fontSize: "1.7em"
                                            }}>
                                                {firstName + " " + lastName + ": " + customProfileName}
                                            </h4>
                                        </div>
                                        <p style={{
                                            marginBottom: "0px",
                                            fontSize : "smaller"
                                        }}>
                                          Specjalizaje:
                                        </p>
                                        <p className="align-self-center mb-0" style={{
                                            marginLeft: "10px",
                                            marginTop: "0px"
                                        }}>
                                            {categories.join(', ')}
                                        </p>
                                    </div>

                                </div>
                            </Link>

                        )}
                    </ProductConsumer>
                </div>
            </ProductWrapper>
        )
    }
}

SpecilistProfileObject.propTypes = {
    specialistProfileObject:PropTypes.shape({
        id:PropTypes.number,
        firstName:PropTypes.string,
        lastName:PropTypes.string,
        categories:PropTypes.array,
        customProfileName:PropTypes.string,
        userPhoto:PropTypes.string
    }).isRequired
}


const ProductWrapper = styled.div`
.card{
    border-color:transparent;
    transition:all 0.5s linear;
    margin-left: 5%;
    margin-right: 5%;
}
.card-footer{
    background:transparent;
    border-top: transparent;
    transition:all 0.5s linear;
  color: black;
}
  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
 a:hover {
    text-decoration: underline;
  }
  a:active {
    text-decoration: underline;
  }
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background:rgba(247,247,247);
    }
}
.img-container{
    background-position: center;
    background-size:cover;
    position:relative;
    overflow:hidden
}
.card-img-top{
    transition:all 0.5s linear;
}
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.fav-btn{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border:none;
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition:all 0.5s linear;
}
.img-container:hover .fav-btn{
    transform:translate(0,0);
}
.fav-btn:hover{
    color: var(--mainBlue);
    cursor: pointer;
}
`;
