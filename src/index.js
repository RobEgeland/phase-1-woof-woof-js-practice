let dogBar = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')
let img = document.createElement('img');
let h2 = document.createElement('h2');
let button = document.createElement('button')


document.addEventListener('DOMContentLoaded', grabDogs)

function grabDogs() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => data.forEach(data => initialDog(data)))
}

function initialDog(data) {
    let span = document.createElement('span')
    span.innerText = data.name
    span.id = data.id
    span.className = data.isGoodDog
    dogBar.appendChild(span)
}

dogBar.addEventListener('click', getDogInfo)

function getDogInfo(e) {
    fetch(`http://localhost:3000/pups/${e.target.id}`)
    .then(res => res.json())
    .then(data => renderDogInfo(data))
}


function renderDogInfo(data) {

    img.src = data.image
    h2.innerText = data.name
    button.id = data.id
    
    if(data.isGoodDog === true){
        button.innerText = 'Good Dog!'
    }else(
        button.innerText = 'Bad Dog!'
    )


    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
}

dogInfo.addEventListener('click', toggleDog)

function toggleDog(e) {
    if(e.target.innerText === 'Good Dog!'){
        e.target.innerText = 'Bad Dog!'
        e.isGoodDog = false;

    }else{
        e.target.innerText = 'Good Dog!'
        e.isGoodDog = true;
    }

    fetch(`http://localhost:3000/pups/${e.target.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application.json'
        },
        body: JSON.stringify(e)
    })
    
}

document.querySelector('#filter-div').addEventListener('click', filterDog)
let dogArray = dogBar.childNodes


function filterDog(e) {
    
    if(e.target.innerText === 'Filter good dogs: OFF'){
        e.target.innerText = 'Filter good dogs: ON'
        for (const dog of dogArray) {
            console.log(dog)
            if(dog.className === 'false') {
                dog.style.visibility = 'hidden';
            }
        }
    }else if(e.target.innerText === 'Filter good dogs: ON'){
        e.target.innerText = 'Filter good dogs: OFF'
        for (const dog of dogArray) {
            console.log(dog)
            if(dog.className === 'false') {
                dog.style.visibility = 'visible';
            }
    }
}
}