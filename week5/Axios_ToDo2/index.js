const getData = () => {
    axios.get('http://api.bryanuniversity.edu/josh-to-do/list/')
    .then (res => buildPage(res.data))
    .catch(err => console.log(err))
}

getData()
const buildPage = (items) =>{
    console.log(items)

    let toDoContainer = document.getElementById('toDoContainer')
    toDoContainer.innerHTML = ''

    items.forEach(item => {
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
        
        toDoContainer.appendChild(itemContainer)

        if (item.isComplete == true){
            itemName.style.textDecoration = "line-through"
        } else{};

        
    })
}

// * POST - INFO

const postData = (e) => {
    e.preventDefault()

    let toDoInput = document.getElementById('toDoInput').value
    let toDoDescription = document.getElementById('toDoDescription').value
    let toDoComplete = document.getElementById('toDoComplete').checked

    let newToDo = {
        name: toDoInput,
        description: toDoDescription,
        isComplete: toDoComplete
    }

    axios.post('http://api.bryanuniversity.edu/josh-to-do/list/', newToDo)
    .then (res => getData())
    .catch(err => console.error(err))
}


let form = document.getElementById('toDoForm')
form.addEventListener('submit', postData)

// * PUT - ID + Info

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

    axios.put(`http://api.bryanuniversity.edu/josh-to-do/list/${id}`, updatedItem)
    .then (res => getData())
    .catch(err => console.error(err))
}

// * DELETE - ID

const deleteData= (e) => {
    let id = e.target.id

    axios.delete(`http://api.bryanuniversity.edu/josh-to-do/list/${id}`)
    .then (res => getData())
    .catch(err => console.error(err))
}

// item.isComplete ? updateBtnText = 'Mark Incomplete' : 
// updateBtnText = 'Mark Complete'

// if (item.isComplete = true){
//     itemName.style.textDecoration = "line-through"
// } else{};