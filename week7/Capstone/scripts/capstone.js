async function initRickAndMorty(){
    let rickMortyData
    try{
        rickMortyData = await apiRequest(`https://rickandmortyapi.com/api/character?page=1`)
        let characterName = rickMortyData.results
        let array = []
        for (i = 0; i < characterName.length; i++){
            let namesList = (characterName[i].name)
            array.push(namesList)
        }
            buildDropDown(array)
        }
    catch(error){
        console.log(error)
    }
}

//Axios Request
async function apiRequest(url) {
    return new Promise( (resolve, reject) => {
        axios.get(url)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
}

initRickAndMorty()
initSecondaryAPI()

function buildDropDown(data){
    dropdown = document.getElementById('selection')
    dropdown.length = 0

    let array = data
    let option
    let newList = []
    
    let defaultOption = document.createElement('option')
    defaultOption.textContent = "Select an Option"
    defaultOption.value = 'null'
    dropdown.add(defaultOption)
    for (let i = 0; i < array.length; i++){
        option = document.createElement('option')
        option.textContent = array[i]
        option.id = array[i]
        option.value = option.textContent
        dropdown.add(option)
        newList.push(array[i])
    }
}

async function initSecondaryAPI() {
    let data
    try{
        data = await apiRequest(`http://api.bryanuniversity.edu/FSW115_Capstone/list`)
        buildPage(data)
        //console.log(data)
    }
    catch(error){
        console.log(error)
    }
}

function buildPage(data){
    
    let outputContainer = document.getElementById("outputContainer")
    outputContainer.innerHTML = ''

    data.forEach(item => {
        let itemContainer = document.createElement('div')
        itemContainer.classList.add('list-card')

        let itemName = document.createElement('h2')
        itemName.textContent = item.name
        itemContainer.appendChild(itemName)

        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete Me'
        deleteBtn.id = item._id
        deleteBtn.addEventListener('click', deleteData)
        itemContainer.appendChild(deleteBtn)

        let updateBtn = document.createElement('button')
        let updateBtnText = ''
        item.isComplete ? updateBtnText = 'Mark Incomplete' : updateBtnText = 'Mark Complete'
        updateBtn.textContent = updateBtnText
        updateBtn.id = item._id
        updateBtn.value = item.isComplete
        updateBtn.addEventListener('click', updateData)
        itemContainer.appendChild(updateBtn)
        
        outputContainer.appendChild(itemContainer)
    })
}


//Post
function postData () {
    let htmlSelection = document.getElementById('selection').value
    if(htmlSelection !=="null"){
        let newToDo ={
            name: htmlSelection,
            isComplete: true
        }

        axios.post('http://api.bryanuniversity.edu/FSW115_Capstone/list', newToDo)
        .then(res =>initSecondaryAPI())
        .catch(err => console.log(err))
    } 
}

let selection = document.getElementById('selection')
selection.addEventListener('change', postData)

//PUT
const updateData = (e) => {
    let id = e.target.id
    let value = e.target.value

    console.log(id)
    console.log(value)

    let newStatus = null

    if(value === 'true'){
        newStatus = false
    } else {
        newStatus = true
    }

    let updatedItem = {
        isComplete: newStatus
    }

    axios.put(`http://api.bryanuniversity.edu/FSW115_Capstone/list/${id}`, updatedItem)
    .then (res => initSecondaryAPI())
    .catch(err => console.error(err))
}

//Delete
const deleteData= (e) => {
    let id = e.target.id

    axios.delete(`http://api.bryanuniversity.edu/FSW115_Capstone/list/${id}`)
    .then (res => initSecondaryAPI())
    .catch(err => console.error(err))
}





//---------Dropdown
// let data = await response.json();
// let result = data.checks.map((check) => {
//   return {
//     name: check.name,
//     tag: check.tags,
//   };
// });
// let hcList = document.getElementById("hclist");
// Object.keys(result).map((key) => hcList.add(new Option(result[key], key)));
// return result;
// }
// getHcList().then((result) => console.log(result));