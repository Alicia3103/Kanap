panier()
formSend()

async function panier(){
    let cart = []
    cart = localStorage.getItem('Panier existant')
    cart=JSON.parse(cart)  
   

    for( let i = 0; i <cart.length; i++){
        let item = cart[i]



        const prodcutApiPath = await loadconfig(item).then(data =>{
            config=data
            return config.host+"/api/products/"+ item.id})
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
    
    modificationQuantité(pInputQuantity,product,article)

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
    
    const prodcutApiPath = await loadconfig(item).then(data =>{
        config=data
        return config.host+"/api/products/"+ item.id})
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
function modificationQuantité(pInputQuantity,product,article){
    pInputQuantity.addEventListener("change", ()=>{

        let array=JSON.parse(localStorage.getItem('Panier existant'))
        let quantity=pInputQuantity.value
        if(quantity >= 1 && quantity < 101 ){

            for (const obj of array) {
                if(obj.key === product.key){
                    obj.quantity= pInputQuantity.value
                    localStorage.setItem('Panier existant', JSON.stringify(array))
                    
                    alert("Quantité modifiée")
                    totalCart()
                }
            }       
        }
        else{
                       
        alert("veuillez entrer une quantité entre 1 et 100")
        for (const obj of array) {
        if(obj.key === product.key){
        pInputQuantity.value=obj.quantity      
        }
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
async function formSend(){
    let firstNameValue =null
    let lastNameValue =null
    let adresseValue =null
    let villeValue =null
    let emailValue =null
    await formChecker(firstNameValue,lastNameValue,adresseValue,villeValue,emailValue)
  
}
async function formChecker(firstNameValue,lastNameValue,adresseValue,villeValue,emailValue){


    let firstName = document.getElementById("firstName")
    
    firstName.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("firstNameErrorMsg")
        let valeurFirstName=e.target.value
        
        if(!valeurFirstName.match(/^[a-zA-Z]+$/)){
            errorMsg.textContent="Ce champ ne doit contenir que des lettres"
            firstNameValue=null
        }
        else{
            errorMsg.textContent=""
            firstNameValue=e.target.value
        }
      
    })

    let lastName = document.getElementById("lastName")
    
     lastName.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("lastNameErrorMsg")
        let valeurLastName=e.target.value
        
        if(!valeurLastName.match(/^[a-zA-Z]+$/)){
            errorMsg.textContent="Ce champ ne doit contenir que des lettres"
            lastNameValue=null
        }
        else{
            errorMsg.textContent=""
            lastNameValue=e.target.value
        }
       
    })

    let adresse = document.getElementById("address")
    
    adresse.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("addressErrorMsg")
        let valeuradresse=e.target.value
        
        if(!valeuradresse.match(/^[a-zA-Z0-9\s,'-]*$/)){
            errorMsg.textContent="Veuillez rentrer une adresse valide"
            adresseValue=null
        }
        else{
            errorMsg.textContent=""
            adresseValue=e.target.value
        }
      
    })
    let ville = document.getElementById("city")
    
    ville.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("cityErrorMsg")
        let valeurville=e.target.value
        
        if(!valeurville.match(/^(\d{4,5}) [a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)){
            errorMsg.textContent="Veuillez rentrer votre code postal suivi du nom de ville"
            villeValue=null
        }
        else{
            errorMsg.textContent=""
            villeValue=e.target.value
        }
    })
        let email = document.getElementById("email")
         email.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("emailErrorMsg")
        let valeuremail=e.target.value
        
        if(!valeuremail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)){
            errorMsg.textContent="Veuillez rentrer une adresse valide"
            emailValue=null
            
        }
        else{
            errorMsg.textContent=""
            emailValue=e.target.value
            
        }
        
        
    })
    

    const form = document.getElementById("order")

    form.addEventListener("click", (e) => {
       
        e.preventDefault()
        
        let cartId=[]
        let array=JSON.parse(localStorage.getItem('Panier existant'))
        for (const obj of array) {
            const objId= obj.id
            cartId.push(objId)
        }
            //verifier si le panier contient des choses
         if(cartId.length===0){
            
            alert("attention, votre panier est vide")

            }
        
        else if(cartId.length>0){
    
            if (firstNameValue && lastNameValue && adresseValue && villeValue && emailValue ) {
                let contact = {
                    firstName:firstNameValue,
                    lastName: lastNameValue,
                    address: adresseValue,
                    city: villeValue,
                    email: emailValue,
                };
                
                
                const commande ={contact,
                    products:cartId}
                
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commande),
                  })
                .then((res) => res.json())
                .then((data)=>{
                    window.location.href = "confirmation.html"+"?orderId="+data.orderId;
                    localStorage.clear();
                })
            
              } 
              else {
                alert("veuillez remplir correctement tous les champs");
              }
        
        }
      });
   
    
}
