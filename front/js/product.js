 /*Recupération de l'id dans l'url*/
 const queryString = window.location
 const url = new URL (queryString)
 const productId = url.searchParams.get("id")

 const prodcutApiPath = "http://localhost:3000/api/products/"+ productId
/*Récupération des données liées au produit dans l'API*/
 fetch(prodcutApiPath)
 .then((response) => response.json())
 .then((data)=>infoProduct(data))

 function infoProduct(data){
    const imageUrl= data.imageUrl
    const altTxt = data.altTxt
    const nameProduct = data.name
    const descriptionProduct=data.description
    const priceProduct =data.price
    const colors = data.colors
    /*appel des fonctions de remplissage d'informations*/
    createImage( imageUrl , altTxt)
    completeName(nameProduct)
    completePrice(priceProduct)
    completeDescription(descriptionProduct)
    completeOptionOfColors(colors)
   
    }
 /*création de la balise image et son contenu + insertion dans la balise de destination*/
 function createImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt 

    const itemImage = document.querySelector(".item__img")
    itemImage.appendChild(image)
} 
/*remplissage des champs avec les données produits*/
function completeName(nameProduct){
    const title = document.getElementById("title")
    title.textContent = nameProduct
}
function completePrice(priceProduct){
    const price = document.getElementById("price")
    price.textContent = priceProduct
}
function completeDescription(descriptionProduct){
    const description = document.getElementById("description")
    description.textContent = descriptionProduct
}
/*remplissage choix des options couleurs*/
function completeOptionOfColors(colors){
    const selection = document.getElementById("colors")
    /*récupération de chaques options de couleurs des produits et création pour chaque d'une balise*/
    colors.forEach((color)=>{
    const option = document.createElement("option")
    option.value = color
    option.textContent = color
    selection.appendChild(option)
})
}
//mémoriser l'ajout au panier lors du click
const button =document.getElementById("addToCart")

button.addEventListener("click", (e)=>{
    const colors = document.getElementById("colors").value
    let quantity = document.getElementById("quantity").value
    const key=productId+"-"+colors
    const product = {
        id: productId,
        color: colors,
        quantity: Number(quantity),
      }
    orderInvalid(colors,quantity)
    const validOrder = orderInvalid(colors,quantity)
    orderValid(validOrder,key,product)
    
    
})
function orderInvalid(colors,quantity){
    if(colors ===""){
        alert("Veuillez sélectionner une couleur ")
        return false
    }
    if(quantity >100 || quantity<=0){
        alert("Veuillez sélectionner une quantité comprise entre 1 et 100")
        return false
    }
    else{
        return true}
}
function orderValid(validOrder,key,product){
    if (validOrder === true){
        
        localStorage.setItem(key, JSON.stringify(product))
        alert("produit ajouté au panier")


       window.location.href = "cart.html"}
}

  
