import {Component} from "react";
import PropTypes from 'prop-types'
import {ProductConsumer} from "./context";
import styled from 'styled-components';
import {Link} from "react-router-dom";

export default class MalfunctionObject extends Component {

    render() {
        const {id,name,description,categories,location} = this.props.malfunctionObject;
        return (
            <ProductWrapper className="col -9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">

                    <ProductConsumer>
                        {(value) => (
                            <Link to={{
                                pathname: '/malfunction/' + id ,
                                state: {
                                    id: id
                                }
                            }}>
                                <div className="img-container p-5" onClick={ () =>
                                    value.handleDetail(id)
                                }>



                                    {/* <button className="fav-btn" disabled={inFavourites?true:false} onClick={()=>{
                            value.addToFavourite(id);
                            value.openModal(id);
                        }}>
                            {inFavourites?(<p className="text-capitalize mb-0" disabled>{" "}polubiono</p>):(<i className="fas fa-heart"/>)}
                        </button> */}
                                </div>
                            </Link>

                        )}
                    </ProductConsumer>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {name}
                        </p>
                        <p className="align-self-center mb-0">
                            {description}
                        </p>
                        <p className="align-self-center mb-0">
                            {categories}
                        </p>
                        <p className="align-self-center mb-0">
                            {location}
                        </p>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

 MalfunctionObject.propTypes = {
    malfunctionObject:PropTypes.shape({
        id:PropTypes.number,
        name:PropTypes.string,
        description:PropTypes.string,
        categories:PropTypes.array,
        location:PropTypes.string
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
