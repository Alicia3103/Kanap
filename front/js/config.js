async function loadconfig(){
    let result= await fetch("../js/config.json")
    return result.json()
}