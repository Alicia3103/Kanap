/**
 * Affichage de la page d'aceuil
 */
//import { Product } from "../js/class/Product.js"; Importer la class
loadconfig().then(data =>{
    config=data
fetch(config.host+ "/api/products")
.then((response) => response.json())
.then((jsonListProduct)=>{
for(let jsonProduct of jsonListProduct ){
    const product = new Product(jsonProduct)
    addProduct(product)
}
})
})

function addProduct(product){
    const productId = product._id
    const imageUrl= product.imageUrl
    const altTxt = product.altTxt
    const name = product.name
    const description=product.description

    const anchor = createAnchor(productId)
    const article = document.createElement("article")
    const image = createImage( imageUrl , altTxt)
    const h3 = createName(name)
    const p = createDescription(description)
    
    appendToArticle(article,image,h3,p)
    appendArticleToAnchor(anchor,article)

}
/*creation de la balise a + identification du href*/
function createAnchor(productId){
    const anchor = document.createElement("a")
    anchor.href ="./product.html?id="+productId
    return anchor
}
/*Selection de la balise cible pour lui insérer la balise a avec son article a l'interieur*/
function appendArticleToAnchor (anchor, article){
  const items = document.getElementById("items")
    if(items != null){
    items.appendChild(anchor)
    anchor.appendChild(article)
    return anchor}
}
/*insérer l'image, et les balise h3 et p dans la balise article*/
function appendToArticle(article,image,h3,p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    return article
}
/*création de l'image avec sa source et don attribut*/
function createImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
/*creation du h3 contenant le nom du KANAP*/
function createName(name){
   const h3 = document.createElement("H3")
   h3.textContent = name
   h3.classList.add =("productName")
   return h3
}
/* creation du p contenant la description du KANAP*/
function createDescription(description){
    const p = document.createElement("p")
    p.textContent= description
    p.classList.add =("productDescription")
    return p
}

