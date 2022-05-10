panier()
formSend()

async function panier(){
    let cart = []
    cart = localStorage.getItem('Panier existant')
    cart=JSON.parse(cart)  
   
    //création d'un article pour chaque produit du panier (local storage)
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

    //création de l'article et appel des différents composants (a travers des fonctions)
    const cartItem = document.getElementById("cart__items")
    const article = document.createElement("article")
     
    createArticle(product,cartItem, article)
    articleImage(article,product)
    articleContent(article,product,article)
       
    return cartItem
}
function createArticle(product,cartItem, article){
    //ajout des identifications spécifique de l'article (id et color)
    article.className = "cart__item"
    article.dataset.id= product._id
    article.dataset.color = product.color
    
    cartItem.appendChild(article)
    return cartItem

}
function articleImage(article,product){
    // ajout de l'image a l'article
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
    //création du conetnu de l'article et appel des fonctions d'affichages des détails de l'article
    const divContent = document.createElement("div")
    divContent.className ="cart__item__content"
    
    articleDescription(divContent,product)
    articleSettings(divContent,product,article)

    article.appendChild(divContent)
    return article
}

function articleDescription(divContent,product){
    //créationdu contenu des différents articles du panier(nom, couleur et quantité)
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
    // création de la div quantité et appel de la fonction de modification de qté
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
    // création de la div supprimer et appel de la fonction de suppression d'article
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

//calcul du prix total
 async function totalCart(){
    // récupération du contenu du panier
    let array=JSON.parse(localStorage.getItem('Panier existant'))
    let totalPrice = 0
    let totalQuantity =0
    
    for(let item of array){
        loadconfig().then(data =>{
            config=data
        })
            //Récupération des données liées au produit dans l'API
        await fetch(config.host+"/api/products/"+ item.id)
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

 //fonction de modification de la quantité d'articles
function modificationQuantité(pInputQuantity,product){

    // ecoute de la modification de la valeur de l'input quantité
    pInputQuantity.addEventListener("change", ()=>{

        let array=JSON.parse(localStorage.getItem('Panier existant'))
        let quantity=pInputQuantity.value
        //quantité demandé conforme
        if(quantity >= 1 && quantity < 101 ){

            for (const obj of array) {
                if(obj.key === product.key){
                    obj.quantity= pInputQuantity.value
                    localStorage.setItem('Panier existant', JSON.stringify(array))
                    
                    alert("Quantité modifiée")
                    //modification du total du panier
                    totalCart()
                }
            }       
        }

        //quantité non conforme, alerte entrer une quantité correcte
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
//fonction de suppression d'un article (dans le DOM et dans le localStorage)
function suppressionProduit(pDelete,product,article){

    pDelete.addEventListener("click", ()=>{

        let array=JSON.parse(localStorage.getItem('Panier existant'))
        article.remove()
        for (const obj of array) {
         if(obj.key === product.key){
            let newArray = array.filter((item) => item.key !== product.key);   
            localStorage.setItem('Panier existant', JSON.stringify(newArray));
            alert("Produit supprimé")
            //modification du total du panier
            totalCart()
         }
     }  
    })
} 

function formSend(){
    let firstNameValue =null
    let lastNameValue =null
    let addressValue =null
    let cityValue =null
    let emailValue =null

    formChecker(firstNameValue,lastNameValue,addressValue,cityValue,emailValue)


   
  
}
function formChecker(firstNameValue,lastNameValue,addressValue,cityValue,emailValue){

    //conformité du prénom
    let firstName = document.getElementById("firstName")
    
    firstName.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("firstNameErrorMsg")
        let valeurFirstName=e.target.value
        
        if(!valeurFirstName.match(/^[a-zA-Z]+$/) && valeurFirstName.length!==0){
            errorMsg.textContent="Ce champ ne doit contenir que des lettres"
            firstNameValue=null
        }
        else{
            errorMsg.textContent=""
            firstNameValue=e.target.value
        }
      
    })

    //conformité du nom de famille
    let lastName = document.getElementById("lastName")
    
     lastName.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("lastNameErrorMsg")
        let valeurLastName=e.target.value
        
        if(!valeurLastName.match(/^[a-zA-Z]+$/) && valeurLastName.length!==0){
            errorMsg.textContent="Ce champ ne doit contenir que des lettres"
            lastNameValue=null
        }
        else{
            errorMsg.textContent=""
            lastNameValue=e.target.value
        }
       
    })

    //conformité de l'adresse
    let address = document.getElementById("address")
    
    address.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("addressErrorMsg")
        let valeuraddress=e.target.value
        
        if(!valeuraddress.match(/^[a-zA-Z0-9\s,'-èéàö]*$/)&& valeuraddress.length!==0){
            errorMsg.textContent="Veuillez rentrer une adresse valide, sans ponctuation"
            addressValue=null
        }
        else{
            errorMsg.textContent=""
            addressValue=e.target.value
        }
      
    })

    //conformité de la ville
    let city = document.getElementById("city")
    
    city.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("cityErrorMsg")
        let valeurcity=e.target.value
        
        if(!valeurcity.match(/^(\d{4,5}) [a-zA-Zéèàö]+(?:[\s-][a-zA-Zéèàö]+)*$/) && valeurcity.length!==0){
            errorMsg.textContent="Veuillez rentrer votre code postal suivi du nom de ville"
            cityValue=null
        }
        else{
            errorMsg.textContent=""
            cityValue=e.target.value
        }
    })
    //conformité de l'email
        let email = document.getElementById("email")
         email.addEventListener("input", (e)=>{
        
        const errorMsg = document.getElementById("emailErrorMsg")
        let valeuremail=e.target.value
        
        if(!valeuremail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) && valeuremail.length!==0){
            errorMsg.textContent="Veuillez rentrer une adresse mail valide"
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
            //si le panier ne contient aucun article
         if(cartId.length===0){
            
            alert("attention, votre panier est vide")

            }
        
            // si le panier contient des articles
        else if(cartId.length>0){
            // si les champs du formulaire sont bien remplis
            if (firstNameValue && lastNameValue && addressValue && cityValue && emailValue ) {
                let contact = {
                    firstName:firstNameValue,
                    lastName: lastNameValue,
                    address: addressValue,
                    city: cityValue,
                    email: emailValue,
                };
                
                
                const commande ={contact,
                    products:cartId}
                // envois des infos de commande a l'api et recepetion du numéro de commande

                
                loadconfig().then(data =>{
                    config=data
                })
                fetch(config.host+ "/api/products/order", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commande),
                  })
              
                .then((res) => res.json())
                .then((data)=>{
                    //redirection vers la page de confirmattion
                    window.location.href = "confirmation.html"+"?orderId="+data.orderId;
                    localStorage.clear();
                })
            
            
              } 
              // si les champs du formulaire ne sont pas bien remplis
              else {
                alert("veuillez remplir correctement tous les champs");
              }
        
        }
      });
    
    
}
