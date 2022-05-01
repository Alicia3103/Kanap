 /*Recupération de l'id dans l'url*/
 const queryString = window.location
 const url = new URL (queryString)
 const itemId = url.searchParams.get("id")

 const prodcutApiPath = "http://localhost:3000/api/products/"+ itemId
/*Récupération des données liées au produit dans l'API*/
 fetch(prodcutApiPath)
 .then((response) => response.json())
 .then((jsonProduct)=>{
     const product = new Product (jsonProduct)
     infoProduct(product)
 }
)

 function infoProduct(product){
 
    const imageUrl= product.imageUrl
    const altTxt = product.altTxt
    const nameProduct = product.name
    const descriptionProduct=product.description
    const priceProduct = product.getFormatedPrice()
    const colors = product.colors
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
    const newProduct = {
        key:itemId+"-"+colors,
        id: itemId,
        color: colors,
        quantity: Number(quantity),
      }
      orderValid(colors,quantity,newProduct)
       
    
    })
    //vérification de la validité des champs
    function orderValid(colors,quantity,newProduct){
        if(colors ===""){
            alert("Veuillez sélectionner une couleur ")
            return false
        }
        if(quantity >100 || quantity<=0){
            alert("Veuillez sélectionner une quantité comprise entre 1 et 100")
            return false
        }
        else{
            addProductToCart(newProduct)}
    }
    
    //ajout du produit au localStorage
    function addProductToCart(newProduct){
            // récupération de la clé produit et de ses données
            let array = []
            array = localStorage.getItem('Panier existant')
            array=JSON.parse(array)
            console.log(array)
            //si la clé(id-couleur) existe déjà on va incrémenter la nouvelle quantité
            if(array == null){
                //conversion en objet 
                let newArray=[newProduct]
               // console.log(newArray)
            localStorage.setItem('Panier existant', JSON.stringify(newArray));
            alert("Produit ajouté au panier")
    
              
            }
            //si la clé n'est pas déjà présente, on envois les informations directrement dans le storage.
            else{
                let double = false
            
                for (const obj of array) {
                    if(obj.key === newProduct.key){
                    
                    const newQty = obj.quantity + newProduct.quantity
                    obj.quantity=newQty
                    console.log(obj.quantity)
                    localStorage.setItem('Panier existant', JSON.stringify(array));
                    alert("Produit ajouté au panier")
                    return true
                    }
                    
                }
                console.log(double)
                        if (double === false){
                        array.push(newProduct)
                        localStorage.setItem('Panier existant', JSON.stringify(array));
                        alert("Produit ajouté au panier")
                        }

                
    
            }
            
        /*window.location.href = "cart.html"*/
    
    }
    
    /*
  function remplacer(obj, newProduct,double){
      if (obj.key === newProduct.key){
          newKey = obj.key + newProduct.key
          obj.key = newKey
          return obj.key
      }
      else{
          return double=false
      }
  }*/