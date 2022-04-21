fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((data)=>addProduct(data))

function addProduct(products){
    products.forEach((product) => {
        
    
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
})
}
function createAnchor(productId){
    const anchor = document.createElement("a")
    anchor.href ="./product.html?id="+productId
    return anchor
}
function appendArticleToAnchor (anchor, article){
  const items = document.querySelector("#items")
    if(items != null){
    items.appendChild(anchor)
    anchor.appendChild(article)
    return anchor}
}
function appendToArticle(article,image,h3,p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    return article
}

function createImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}
function createName(name){
   const h3 = document.createElement("H3")
   h3.textContent = name
   h3.classList.add =("productName")
   return h3
}
function createDescription(description){
    const p = document.createElement("p")
    p.textContent= description
    p.classList.add =("productDescription")
    return p
}
