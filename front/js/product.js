 const queryString = window.location
 const url = new URL (queryString)
 const productId = url.searchParams.get("id")
 console.log(productId)

 const prodcutApiPath = "http://localhost:3000/api/products/"+ productId

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

    createImage( imageUrl , altTxt)
    completeName(nameProduct)
    completePrice(priceProduct)
    completeDescription(descriptionProduct)
    completeOptionOfColors(colors)
    }
 
 function createImage(imageUrl, altTxt){
   
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt 

    const itemImage = document.querySelector(".item__img")
    itemImage.appendChild(image)
} 
function completeName(nameProduct){
    const title = document.querySelector("#title")
    title.textContent = nameProduct
}
function completePrice(priceProduct){
    const price = document.querySelector("#price")
    price.textContent = priceProduct
}
function completeDescription(descriptionProduct){
    const description = document.querySelector("#description")
    description.textContent = descriptionProduct
}
function completeOptionOfColors(colors){
    const selection = document.querySelector("#colors")
    
    colors.forEach((color)=>{
    const option = document.createElement("option")
    option.value = color
    option.textContent = color
    selection.appendChild(option)
})
}