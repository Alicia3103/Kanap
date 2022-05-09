
const queryString = window.location
const url = new URL (queryString)
const orderId = url.searchParams.get("orderId")
 
 afficherOrderId(orderId)
 
 function afficherOrderId(orderId){
    document.getElementById("orderId").textContent=orderId
 }
