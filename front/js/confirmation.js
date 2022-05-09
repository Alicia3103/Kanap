//récupération des informations contenu dans l'url (orderId)
const queryString = window.location
const url = new URL (queryString)
const orderId = url.searchParams.get("orderId")
 
 afficherOrderId(orderId)
 
 function afficherOrderId(orderId){
     //implémenter l'orderId dans le span dédié
    document.getElementById("orderId").textContent=orderId
 }
