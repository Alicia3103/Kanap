panier()

async function panier(){
    let cart = []
    cart = localStorage.getItem('Panier existant')
    cart=JSON.parse(cart)  
   

    for( let i = 0; i <cart.length; i++){
        let item = cart[i]



        const prodcutApiPath = "http://localhost:3000/api/products/"+ item.id
         /*Récupération des données liées au produit dans l'API*/
        await fetch(prodcutApiPath)
        .then((response) => response.json())
        .then((jsonProduct)=>{
            let product = new Product (jsonProduct)
            product.quantity = item.quantity
            product.color = item.color
            product.key = item.id+"-"+item.color
         
            cartArticle( product)

        }) 
        
    }  
    totalCart()
}

function cartArticle(product){
    const cartItem = document.getElementById("cart__items")
    const article = document.createElement("article")
     
    createArticle(product,cartItem, article)
    articleImage(article,product)
    articleContent(article,product,article)
       
    return cartItem
}
function createArticle(product,cartItem, article){

    article.className = "cart__item"
    article.dataset.id= product._id
    article.dataset.color = product.color
    
    cartItem.appendChild(article)
    return cartItem

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
function articleContent(article,product,article){
    const divContent = document.createElement("div")
    divContent.className ="cart__item__content"
    articleDescription(divContent,product)
    articleSettings(divContent,product,article)

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
    pPrice.textContent=product.getFormatedPrice() +"€"
    divDescription.appendChild(h2Name)
    divDescription.appendChild(pColor)
    divDescription.appendChild(pPrice)
    divContent.appendChild(divDescription)
    return divContent
}
function articleSettings(divContent,product,article){
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
    
    modificationQuantité(pInputQuantity,product)

    const divDelete =document.createElement("div")
    divDelete.className ="cart__item__content__settings__delete"
    divSettings.appendChild(divDelete)

    const pDelete =document.createElement("p")
    pDelete.className="deleteItem"
    pDelete.textContent="Supprimer"
    divDelete.appendChild(pDelete)

    suppressionProduit(pDelete,product,article)
   
    divContent.appendChild(divSettings)
    return divContent
}

 async function totalCart(){
    let array=JSON.parse(localStorage.getItem('Panier existant'))
    let totalPrice = 0
    let totalQuantity =0
    
    for(let item of array){
    const prodcutApiPath = "http://localhost:3000/api/products/"+ item.id
    /*Récupération des données liées au produit dans l'API*/
    await fetch(prodcutApiPath)
        .then((response) => response.json())
        .then((jsonProduct)=>{
            const product = new Product (jsonProduct)
            product.quantity = item.quantity
            product.color = item.color
            product.key = item.id+"-"+item.color
            item.price = product.price
        })

    const itemTotal =item.price * item.quantity
    totalPrice += Number(itemTotal)
    totalQuantity += Number(item.quantity)  
    }     

    const pTotalQuantity = document.getElementById("totalQuantity")
    pTotalQuantity.textContent= totalQuantity
    const pTotalPrice = document.getElementById("totalPrice")
    pTotalPrice.textContent= Intl.NumberFormat().format(totalPrice)
 }
function modificationQuantité(pInputQuantity,product){
    pInputQuantity.addEventListener("change", ()=>{

        let array=JSON.parse(localStorage.getItem('Panier existant'))
        for (const obj of array) {
         if(obj.key === product.key){
             obj.quantity= pInputQuantity.value
             localStorage.setItem('Panier existant', JSON.stringify(array))
             
             alert("Quantité modifiée")
             totalCart()
         }
     }  
    })
}
function suppressionProduit(pDelete,product,article){
    pDelete.addEventListener("click", ()=>{

        let array=JSON.parse(localStorage.getItem('Panier existant'))
        article.remove()
        for (const obj of array) {
         if(obj.key === product.key){
            let newArray = array.filter((item) => item.key !== product.key);   
            localStorage.setItem('Panier existant', JSON.stringify(newArray));
            alert("Produit supprimé")
            totalCart()
         }
     }  
    })
}
