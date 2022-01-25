import React, { Component } from 'react';


const ProductContext = React.createContext();

const developPath = "http://localhost:8080";
//Provider
//Consumer


class ProductProvider extends Component {
    state = {
        products: [],
      //  detailProduct: detailProduct,
        favourites: [],
        modalOpen: false,
    //    modalProdact: detailProduct,
        favSubTotal: 0,
        favTax: 0,
        favTotal: 0,
    }
    componentDidMount() {
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id)
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        })
    }
    // addToFavourite = (obj, offid) => {
    //     obj.inFavorites = true;
    //     obj.count1 = 1;
    //     const price = obj.price;
    //     obj.total = price;
    //     obj.offid = offid;
    //     this.state.favourites.push(obj)
    //  }
     openModal = (obj) => {
        const product = obj;
        this.setState(() => {
            return { modalProdact: product, modalOpen: true }
        },
            () => {

            });
    }
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        });
    }
    // increment = (id) => {
    //     let tempFav = [...this.state.favourites]
    //     const selectedCar = tempFav.find(item => item.id === id)
    //
    //     const index = tempFav.indexOf(selectedCar)
    //     const product = tempFav[index];
    //
    //     product.count1 = product.count1 + 1
    //     product.total = product.count1 * product.price
    //
    //     this.setState(() => {
    //         return {
    //             favourites: [...tempFav]
    //         }
    //     }, () => {
    //         this.addTotals()
    //     })
    // }
    // decrement = (id) => {
    //     let tempFav = [...this.state.favourites]
    //     const selectedCar = tempFav.find(item => item.id === id)
    //
    //     const index = tempFav.indexOf(selectedCar)
    //     const product = tempFav[index];
    //
    //     product.count1 = product.count1 - 1
    //     if (product.count1 === 0) {
    //         this.removeCar(id)
    //     }
    //     else {
    //         product.total = product.count1 * product.price
    //         this.setState(() => {
    //             return {
    //                 favourites: [...tempFav]
    //             }
    //         }, () => {
    //             this.addTotals()
    //         })
    //     }
    // }
    // removeCar = (obj) => {
    //     let tempProducts = this.state.products;
    //     let tempFav = this.state.favourites
    //
    //     tempFav = tempFav.filter(function(el) {return el != obj});
    //
    //
    //     obj.inFavorites = false;
    //     obj.count1 = 0
    //     obj.total = 0
    //     this.setState(() => {
    //         return {
    //             favourites: tempFav,
    //             products: tempProducts
    //         }
    //     }, () => {
    //         this.addTotals()
    //     })
    // }
    // clearFav = (id) => {
    //     this.setState(() => {
    //         return { favourites: [] }
    //     }, () => {
    //         this.setProducts();
    //         this.addTotals();
    //     })
    // }
    // addTotals = () => {
    //     let subTotal = 0
    //     this.state.favourites.map(item => (subTotal += item.total))
    //     const tempTax = subTotal * 0.07
    //     const tax = parseFloat(tempTax.toFixed(2))
    //     const total = subTotal + tax
    //     this.setState(() => {
    //         return {
    //             favSubTotal: subTotal,
    //             favTax: tax,
    //             favTotal: total,
    //
    //         }
    //     })
    // }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
              //  addToFavourite: this.addToFavourite,
                openModal: this.openModal,
                closeModal: this.closeModal,
               // increment: this.increment,
               // decrement: this.decrement,
               // removeCar: this.removeCar,
               // clearFav: this.clearFav,
            }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };