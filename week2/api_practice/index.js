
var catData = [{
    "breed": "Abyssinian",
    "country": "Ethiopia",
    "origin": "Natural/Standard",
    "coat": "Short",
    "pattern": "Ticked"
}]

console.log(catData)
var catList = document.getElementById("cats")

for (let x = 0; x < catData.length; x++){
    catList.innerHTML += "<li>" + catData[x].breed + "<li>"
}