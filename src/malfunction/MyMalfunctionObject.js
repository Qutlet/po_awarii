import {Component} from "react";
import PropTypes from 'prop-types'
import {ProductConsumer} from "../util/context";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import axios from "axios";

export default class MyMalfunctionObject extends Component {

    delete = (obj) => {
        obj.preventDefault()
        const id = this.props.myMalfunctionObject.id;
        axios.delete("http://localhost:8080/malfunctions/" + id + "/delete", {
            headers: {
                'Authorization': 'Token ' + this.props.token
            }
        }).then(r =>
            console.log(r.data)
        )
        window.location.reload(false);
    }

    render() {
        console.log(this.props)
        const {id,name,description,categories,location,status} = this.props.myMalfunctionObject;
        if (status === "PENDING") {
            return (
                <ProductWrapper className="col -9 mx-auto col-md-6 col-lg-3 my-3">
                    <div className="card">

                        <ProductConsumer>
                            {(value) => (
                                <Link to={{
                                    pathname: '/my-malfunctions/' + id ,
                                    state: {
                                        id: id
                                    }
                                }}>
                                    <div className="img-container p-5">

                                        <div className="card-footer d-flex justify-content-between">
                                            <h4 className="align-self-center mb-0" style={{
                                                margin: "0px",
                                                fontSize: "1.5em"
                                            }}>
                                                {name}
                                            </h4>
                                            <p className="align-self-center mb-0">
                                                {categories.join(', ')}
                                            </p>
                                            <p className="align-self-center mb-0">
                                                {location}
                                            </p>
                                        </div>
                                        <div>
                                            <Link to={{
                                                pathname: '/my-malfunctions/' + id + '/edit' ,
                                                state: {
                                                    id: id
                                                }
                                            }}>
                                                <button>edit</button>
                                            </Link>
                                            <button onClick={this.delete}>Delete</button>
                                        </div>
                                    </div>
                                </Link>

                            )}
                        </ProductConsumer>
                    </div>
                </ProductWrapper>
            )
        } else {
            return (
                <ProductWrapper className="col -9 mx-auto col-md-6 col-lg-3 my-3">
                    <div className="card">

                        <ProductConsumer>
                            {(value) => (
                                <Link to={{
                                    pathname: '/my-malfunctions/' + id ,
                                    state: {
                                        id: id
                                    }
                                }}>
                                    <div className="img-container p-5">

                                        <div className="card-footer d-flex justify-content-between">
                                            <h4 className="align-self-center mb-0" style={{
                                                margin: "0px",
                                                fontSize: "1.5em"
                                            }}>
                                                {name}
                                            </h4>
                                            <p className="align-self-center mb-0">
                                                {categories.join(', ')}
                                            </p>
                                            <p className="align-self-center mb-0">
                                                {location}
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
}

MyMalfunctionObject.propTypes = {
    myMalfunctionObject:PropTypes.shape({
        id:PropTypes.number,
        name:PropTypes.string,
        description:PropTypes.string,
        categories:PropTypes.array,
        location:PropTypes.string,
        status:PropTypes.string
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
