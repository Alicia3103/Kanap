panier()

function panier(){
    let cart = []
    cart = localStorage.getItem('Panier existant')
    cart=JSON.parse(cart)
    console.log(cart)  

    for( let i = 0; i <cart.length; i++){
        const item = cart[i]
        identifyItem(item)
        
    }  


}

function identifyItem(item) {
    
        const prodcutApiPath = "http://localhost:3000/api/products/"+ item.id
    /*Récupération des données liées au produit dans l'API*/
         fetch(prodcutApiPath)
        .then((response) => response.json())
        .then((jsonProduct)=>{
            const product = new Product (jsonProduct)
            product.quantity = item.quantity
            product.color = item.color
            cartArticle(product)
        })
  
}


function cartArticle(product){
    const cart = document.getElementById("cart__items")
    const article = document.createElement("article")
    //items params
    const productId = product.id
    const productColor =product.color
    const productQuantity = product.quantity
    const productName =product.name 
    const productAltTxt = product.altTxt
    const productImageUrl = product.imageUrl
    const itemPrice = product.price

   
    createArticle(product,cart, article)
    articleImage(article,product)
    articleContent(article,product)
       
    return cart
}

function createArticle(product,cart, article){

    article.className = "cart__item"
    article.dataset.id=product.id
    article.dataset.color = product.color
    
    cart.appendChild(article)
    return cart

}

function articleImage(article,product){

    const div = document.createElement("div")
    div.className ="cart__item__img"
    const img =document.createElement("img")
    img.src= product.imageUrl
    img.alt=product.altTxt
    div.appendChild(img)
    article.appendChild(div)
    return article
}

function articleContent(article,product){
    const divContent = document.createElement("div")
    divContent.className ="cart__item__content"
    articleDescription(divContent,product)
    articleSettings(divContent,product)

    article.appendChild(divContent)
    return article
}
function articleDescription(divContent,product){
    const divDescription =document.createElement("div")
    divDescription.className ="cart__item__content__description"
    const h2Name =document.createElement("h2")
    h2Name.textContent=product.name
    const pColor =document.createElement("p")
    pColor.textContent=product.color
    const pPrice=document.createElement("p")
    pPrice.textContent=product.price +"€"
    divDescription.appendChild(h2Name)
    divDescription.appendChild(pColor)
    divDescription.appendChild(pPrice)
    divContent.appendChild(divDescription)
    return divContent
}
function articleSettings(divContent,product){
    const divSettings =document.createElement("div")
    divSettings.className ="cart__item__content__settings"
    
    const divQuantity =document.createElement("div")
    divQuantity.className ="cart__item__content__settings__quantity"
    divSettings.appendChild(divQuantity)

    const pQuantity =document.createElement("p")
    pQuantity.textContent="Qté :"
    divQuantity.appendChild(pQuantity)

    const pInputQuantity =document.createElement("input")
    pInputQuantity.type= "number"
    pInputQuantity.className= "itemQuantity"
    pInputQuantity.name ="itemQuantity"
    pInputQuantity.min="1"
    pInputQuantity.max="100"
    pInputQuantity.value=product.quantity 
    divQuantity.appendChild(pInputQuantity)
    
   // pInputQuantity.addEventListener("change", (Product)=>(console.log("attention"+Product.id)))

    const divDelete =document.createElement("div")
    divDelete.className ="cart__item__content__settings__delete"
     divSettings.appendChild(divDelete)

    const pDelete =document.createElement("p")
    pDelete.className="deleteItem"
    pDelete.textContent="Supprimer"
    divDelete.appendChild(pDelete)
   
    divContent.appendChild(divSettings)
    return divContent
}
