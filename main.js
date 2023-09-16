let plus = document.querySelector('.bi-plus-square-fill')
let input = document.querySelector('.form-control')
let ToDosRow = document.querySelector('.TodosRow')




let ToDosArray = []
plus.addEventListener('click' , function(){
    let inputValue = input.value

    let newObj = {
        id: ToDosArray.length + 1,
        name: inputValue,
        complete: false
    }

    ToDosArray.push(newObj)
    setInLocal(ToDosArray)
    createElement(ToDosArray)

    input.value = ''
    input.focus()
    // console.log(ToDosArray);
})

function setInLocal(list){
    localStorage.setItem('todos' , JSON.stringify(list))
}

function createElement (list) {
    
    ToDosRow.innerHTML = ''


    list.forEach(function (todo) {
        let DivPArent = document.createElement('div')
        DivPArent.setAttribute('class' , "col-12 newTodo")

        let p = document.createElement('p')
        p.innerHTML = todo.name

        let IconsDiv = document.createElement('div')
        let iconCheck = document.createElement('i')
        iconCheck.setAttribute('class',"bi bi-check-circle-fill")
        iconCheck.setAttribute('onclick' , `CheckElem(${todo.id})`)

        let iconXCircle = document.createElement('i')
        iconXCircle.setAttribute('class','bi bi-x-circle-fill ms-2')
        // iconXCircle.addEventListener('click' ,  removeElem (todo.id))
        iconXCircle.setAttribute('onclick' , `removeElem(${todo.id})`)
        // iconXCircle.setAttribute('onclick' , 'removeElem(' + todo.id + ')' )



        if (todo.complete) {
            DivPArent.setAttribute('class' , "col-12 newTodo2")
            iconCheck.setAttribute('class' , 'bi bi-arrow-clockwise')
            DivPArent.style.order = '2'
        }




        IconsDiv.append(iconCheck , iconXCircle)

        DivPArent.append(p,IconsDiv)
        ToDosRow.append(DivPArent)
    })
}



function CheckElem (todoId) {
    let localStorageGet = JSON.parse(localStorage.getItem('todos'))

    ToDosArray = localStorageGet

    ToDosArray.forEach(function (x) {
        if (x.id === todoId){
            x.complete = !x.complete
        }
    })

    setInLocal(ToDosArray)

    createElement(ToDosArray)
}




function removeElem (todoID) {
    let localStorageGet = JSON.parse(localStorage.getItem('todos'))

    ToDosArray = localStorageGet

    let returnId = ToDosArray.findIndex(function (todo) {
        return todo.id === todoID
    })


    ToDosArray.splice(returnId, 1)

    setInLocal(ToDosArray)

    createElement(ToDosArray)
}


function getLocal () {
    let GetItem = JSON.parse(localStorage.getItem('todos'))
    
    if (GetItem){
        ToDosArray = GetItem
    } else {
        ToDosArray = []
    }

    createElement(ToDosArray)
}

window.addEventListener('load' , getLocal)
