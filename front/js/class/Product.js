/**
 * représentation du produit
 */
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct)
    }
    getFormatedPrice(){
        let price = Intl.NumberFormat().format(this.price)

        return price
    }
}

