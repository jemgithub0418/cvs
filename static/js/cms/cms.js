const pageContent = document.getElementById('page-content')

handleLogoForm()

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


// Getting Home Page Contents
function updateLogo(){
    var url = "/web-content/api/changelogo/"

    fetch(url)
    .then((response) => response.json())
    .then(function(data){

        const image = document.querySelector('#img')
        image.src = data[0].image

    })
}



function getLogoCard(){
    var url = "http://localhost:8000/web-content/api/changelogo/"


    return fetch(url)
    .then((response) => response.json())
    .then(function(data){

        // constructing nodes

        // create div card parent node
        var card = document.createElement('div')
        card.classList.add('card')
        // cardBody child
        var cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        var header = document.createElement('h5')
        header.innerText = 'School Logo'
        var label1 = document.createElement('small')
        label1.innerText = 'On display: '

        var image = document.createElement('img')
        image.src = data[0].image
        image.id = 'img'
        image.classList.add('card-img-top')
        image.style.maxWidth = '10rem'
        image.style.maxHeight = '10rem'

        var form = document.createElement('form')
        form.action = '/web-content/api/changelogo/'
        form.method = 'POST'
        form.enctype ='multipart/form-data'
        form.id ='logo-form'
        form.style.display = 'inline'

        var csrftokennode = document.createElement('input')
        csrftokennode.type = 'hidden'
        csrftokennode.value = csrftoken 

        var inputGroup = document.createElement('div')
        inputGroup.classList.add('input-group', 'mb-3')

        var imageField = document.createElement('input')
        imageField.type = 'file'
        imageField.name = 'image'
        imageField.classList.add('form-control')
        imageField.required = true
        imageField.id = 'inputGroupFile02'

        var uploadButton = document.createElement('button')
        uploadButton.type = 'submit'
        uploadButton.classList.add('input-group-text')
        uploadButton.for = 'inputGroupFile02'
        uploadButton.innerText = 'Upload'

        var label = document.createElement('label')
        label.for = 'inputGroupFile02'
        label.innerText = 'Change:'


        // combine elemnts together

        card.append(cardBody)
        cardBody.append(header)
        cardBody.append(label1)
        cardBody.append(image)
        cardBody.append(document.createElement('br'))
        cardBody.append(label)
        cardBody.append(form)
        form.append(csrftokennode)
        form.append(imageField)
        form.append(uploadButton)


        return card

    })
}


function getCarouselCard(){
    var url = "/web-content/api/home-carousel/"

    return fetch(url)
    .then((response) => response.json())
    .then(function(data){

        var carouselItems = data

        // // constructing nodes
        var card = document.createElement('div')
        card.id = 'carousel'
        card.classList.add('card')
        var cardBody = document.createElement('div')
        cardBody.id = 'card-body'
        cardBody.classList.add('card-body')
        var header = document.createElement('h5')
        header.innerText = 'Home Carousel'
        var onDisplay = document.createElement('small')
        onDisplay.innerText = 'On display: '
        var cardImage = document.createElement('img')
        cardImage.classList.add('card-img-top')
        cardImage.alt = '...'
        cardImage.style.maxWidth = '15rem'
        cardImage.style.maxHeight = '15rem'
        var cardLabel = document.createElement('small')
        cardLabel.innerText = ""
        var cardContent = document.createElement('small')
        cardContent.innerText = ""
        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var trashIconSpan = document.createElement('span')
        trashIconSpan.style.color = 'red'
        var trashIcon = document.createElement('i')
        trashIcon.classList.add('fas', 'fa-trash-alt')
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.classList.add('far', 'fa-edit')

        // construct nodes

        card.append(cardBody)
        cardBody.append(header)
        for (var i = 0; i < data.length; i++) {
            cardBody.append(onDisplay)
            cardImage.src = data[i].image
            cardBody.append(cardImage)
            cardBody.innerHTML += '<br>'
            cardBody.append(cardLabel)
            cardLabel.innerText = data[i].label
            cardBody.innerHTML += '<br>'
            cardBody.append(cardContent)
            cardContent.innerText = data[i].content
            cardBody.innerHTML += '<br>'
            cardBody.append(iconGroup)
            iconGroup.append(trashIconSpan)
            trashIconSpan.append(trashIcon)
            iconGroup.append(editIconSpan)
            editIconSpan.append(editIcon)
            cardBody.innerHTML += `<br><hr>`
        }


       return card
    })
}


function getMission(){
    var url = "/web-content/api/update-mission/"

}




// formsssssss
// change logo

function handleLogoForm(){
    var logoform = document.getElementById('logo-form')
    logoform.addEventListener('submit', function(e){
        e.preventDefault()
        let input = document.getElementById('inputGroupFile02');

        let data = new FormData();
        data.append('image',input.files[0]);

        var url = "/web-content/api/changelogo/"

        fetch(url,{
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
            },
            body:data
        })
        .then((response) => response.json())
        .then(function(data){
            updateLogo()
            e.target.reset()
            logo = document.getElementById('logo-div')
            logo.innerHTML = ""
            logo.innerHTML = `<img src="${data.image}" alt="no image provided" style="max-width: 7rem; max-height: 7rem;">`
        })
    })
}






function showHomeContent(){
    if ( document.getElementById("homeButton").className.match(/(?:^|\s)active(?!\S)/) ){

    }else{
        document.getElementById('homeButton').classList.add('active')
        pageContent.innerHTML = ""
        
        Promise.all([getLogoCard(), getCarouselCard()]).then((values) => {
            values.forEach(card=> pageContent.append(card))
        }).then(function(){
            handleLogoForm()
        })

    }
    if ( document.getElementById("aboutButton").className.match(/(?:^|\s)active(?!\S)/) ){
        document.getElementById("aboutButton").classList.remove('active')
    }


}

function showAboutContent(){
    if ( document.getElementById("aboutButton").className.match(/(?:^|\s)active(?!\S)/) ){
        return;
    }else{
        document.getElementById('aboutButton').classList.add('active')
        pageContent.innerHTML = ""
        pageContent.innerHTML += `
        this is about content
    `
    }
    if ( document.getElementById("homeButton").className.match(/(?:^|\s)active(?!\S)/) ){
        document.getElementById("homeButton").classList.remove('active')
    }
    
}