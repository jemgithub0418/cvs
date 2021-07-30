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
        cardBody.id = 'carousel-card-body'
        cardBody.classList.add('card-body')
        var header = document.createElement('h5')
        header.innerText = 'Home Carousel'
        var onDisplay = document.createElement('span')
        onDisplay.innerText = 'On display: '
        var cardImage = document.createElement('img')
        cardImage.classList.add('card-img-top')
        cardImage.alt = '...'
        // cardImage.id = ""
        cardImage.style.maxWidth = '15rem'
        cardImage.style.maxHeight = '15rem'
        var cardLabel = document.createElement('span')
        cardLabel.innerText = ""
        // cardLabel.id = ""
        var cardContent = document.createElement('span')
        cardContent.innerText = ""
        // cardContent.id = ""
        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var trashIconSpan = document.createElement('span')
        trashIconSpan.style.color = 'red'
        var trashIcon = document.createElement('i')
        trashIcon.classList.add('fas', 'fa-trash-alt')
        trashIcon.setAttribute('data-process', "delete")
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#exampleModal')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('data-process', "update")
        var spacing = document.createElement('small')
        spacing.innerHTML = `&nbsp`

        // construct nodes

        card.append(cardBody)
        cardBody.append(header)
        for (var i = 0; i < data.length; i++) {
            var itemId = data[i].id
            cardImage.setAttribute('id', "img-".concat(itemId))
            cardLabel.setAttribute('id', "label-".concat(itemId))
            cardContent.setAttribute('id', "content-".concat(itemId))
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
            iconGroup.append(spacing)
            iconGroup.append(editIconSpan)
            editIconSpan.append(editIcon)
            editIcon.setAttribute('onClick', `popCarouselDetailModal(${itemId})`)
            cardBody.innerHTML += `<br><hr>`
        }

        return card
    })
}


function getMissionCard(){
    var url = `/web-content/api/update-mission/${missionId}/`

    return fetch(url)
    .then((response) => response.json())
    .then(function(data){

        var card = document.createElement('div')
        card.id = 'mission'
        card.classList.add('card')
        var cardBody = document.createElement('div')
        cardBody.id = 'mission-card-body'
        cardBody.classList.add('card-body')
        var header = document.createElement('h5')
        header.innerText = 'Mission'
        var onDisplay = document.createElement('small')
        onDisplay.innerText = 'On display: '
        var mission = document.createElement('p')
        mission.id = 'mission-content'
        mission.innerText = data.mission
        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#exampleModal')
        editIcon.setAttribute('onclick', `popMissionModal()`)

        card.append(cardBody)
        cardBody.append(header)
        cardBody.append(onDisplay)
        cardBody.append(mission)
        cardBody.append(iconGroup)
        iconGroup.append(editIconSpan)
        editIconSpan.append(editIcon)

        return card

    })
}


function getVisionCard(){
    var url = `/web-content/api/update-vision/${visionId}/`

    return fetch(url)
    .then((response) => response.json())
    .then(function(data){

        var card = document.createElement('div')
        card.id = 'vision'
        card.classList.add('card')
        var cardBody = document.createElement('div')
        cardBody.id = 'vision-card-body'
        cardBody.classList.add('card-body')
        var header = document.createElement('h5')
        header.innerText = 'Vision'
        var onDisplay = document.createElement('small')
        onDisplay.innerText = 'On display: '
        var vision = document.createElement('p')
        vision.id = 'vision-content'
        vision.innerText = data.vision
        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#exampleModal')
        editIcon.setAttribute('onclick', `popVisionModal()`)

        card.append(cardBody)
        cardBody.append(header)
        cardBody.append(onDisplay)
        cardBody.append(vision)
        cardBody.append(iconGroup)
        iconGroup.append(editIconSpan)
        editIconSpan.append(editIcon)

        return card
    })
}

// popping modals

function popCarouselDetailModal(id){
    var updateCarouselImageModal = document.getElementById('exampleModal')

    updateCarouselImageModal.addEventListener('shown.bs.modal', function(){

        var saveButton = document.getElementById('saveButton')
        saveButton.setAttribute('for', 'carousel-details')
        saveButton.setAttribute('onClick', `saveUpdateCarouselModal()`)
        var title = document.getElementById('modal-title')
        var body = document.getElementById('modal-body')
        var onDisplay = document.createElement('small')
        onDisplay.innerText = `On display: `
        var form = document.createElement('form')
        form.action = `web-content/api/home-carousel/detail/${id}/`
        form.id = "carousel-detail-form"
        form.method = "PUT"
        var labelForInputLabel = document.createElement('span')
        labelForInputLabel.innerText = "Label:"

        var inputLabel = document.createElement('input')
        var labelId = "label-".concat(id)
        inputLabel.type = "text"
        inputLabel.classList.add("form-control")
        inputLabel.required = true
        inputLabel.id = `label-input-${id}`
        inputLabel.value = document.getElementById(labelId).innerText
        var labelForInputContent = document.createElement('span')
        labelForInputContent.innerText = "Content: "
        var inputContent = document.createElement('textarea')
        var contentId = "content-".concat(id)
        inputContent.id = `content-input-${id}`
        inputContent.classList.add("textinput", "textInput", "form-control")
        inputContent.rows = "5"
        inputContent.required = true
        inputContent.ariaLabel = "With textarea"
        var contentValue = document.getElementById(contentId).innerText
        inputContent.innerText = contentValue
        var image = document.createElement('img')
        var imageId = "img-".concat(id)
        var imageValue = document.getElementById(imageId)
        image.src = imageValue.src
        image.style.maxHeight = "15rem"
        image.style.maxWidth = "15rem"
        // var labelForInputImage = document.createElement('span')
        // labelForInputImage.innerText = "Image file: "
        // var inputImage = document.createElement('input')
        // inputImage.type = "file"
        // inputImage.classList.add('form-control')
        // inputImage.required = true
        // inputImage.id = `image-input-${id}`
        // inputImage. = document.getElementById(`img-${id}`).src
        //         <span>Change:</span>
        // <input type="file" name="image" class="form-control" required id="inputGroupFile02"> 

        title.innerHTML= ""
        body.innerHTML = ""

        title.innerText = "Update carousel details"
        body.append(form)
        form.append(onDisplay)
        form.append(image)
        form.innerHTML += "<br>"
        // form.append(labelForInputImage)
        // form.append(inputImage)
        form.append(labelForInputLabel)
        form.append(inputLabel)
        form.append(labelForInputContent)
        form.append(inputContent)

        handleCarouselForm(id)

    })
}

function popMissionModal(){
    var updateMissionModal = document.getElementById('exampleModal')
    var missionContent = document.getElementById('mission-content')

    updateMissionModal.addEventListener('shown.bs.modal', function(){
        var saveButton = document.getElementById('saveButton')
        saveButton.setAttribute('for', 'mission-form')
        saveButton.setAttribute('onclick', `saveMissionModal()`)
        var title = document.getElementById('modal-title')
        var body = document.getElementById('modal-body')
        var onDisplay = document.createElement('div')
        onDisplay.classList.add('input-group')
        var form = document.createElement('form')
        form.action = `/web-content/api/update-mission/${missionId}/`
        form.id = 'mission-form'
        form.method = 'PUT'
        var label = document.createElement('span')
        label.innerText = "On display:"
        label.innerHTML += '&nbsp;&nbsp;'
        var inputMission = document.createElement('textarea')
        inputMission.id= 'mission-form-content'
        inputMission.classList.add('form-control')
        inputMission.rows = '5'
        inputMission.required = true
        // inputMission.setAttribute('value', "none")
        inputMission.ariaLabel = 'With textarea'
        inputMission.value = missionContent.innerText
        onDisplay.append(label)
        onDisplay.append(inputMission)
        form.append(onDisplay)

        title.innerHTML = ""
        body.innerHTML = ""

        title.innerText = "Update School Mission"
        body.append(form)
        handleMissionForm()
    })
}

function popVisionModal(){
    var updateVisionModal = document.getElementById('exampleModal')
    var visionContent = document.getElementById('vision-content')

    updateVisionModal.addEventListener('shown.bs.modal', function() {
        var saveButton = document.getElementById('saveButton')
        saveButton.setAttribute('for', 'vision-content')
        saveButton.setAttribute('onclick', `saveVisionModal()`)
        var title = document.getElementById('modal-title')
        var body = document.getElementById('modal-body')
        var onDisplay = document.createElement('div')
        onDisplay.classList.add('input-group')
        var form = document.createElement('form')
        form.action = `/web-content/api/update-mission/${visionId}/`
        form.id = 'vision-form'
        form.method = 'PUT'
        var label = document.createElement('span')
        label.innerText = "On display:"
        label.innerHTML += '&nbsp;&nbsp;'
        var inputVision = document.createElement('textarea')
        inputVision.id= 'vision-form-content'
        inputVision.classList.add('form-control')
        inputVision.rows = '5'
        // inputMission.setAttribute('value', "none")
        inputVision.ariaLabel = 'With textarea'
        inputVision.value = visionContent.innerText
        onDisplay.append(label)
        onDisplay.append(inputVision)
        form.append(onDisplay)

        title.innerHTML = ""
        body.innerHTML = ""

        title.innerText = "Update School Vision"
        body.append(form)
        handleVisionForm()
    })

}




// formsssssss


// update carousel items
function handleCarouselForm(id){
    var carouselform = document.getElementById('carousel-detail-form')
    carouselform.addEventListener('submit', function(e){
        e.preventDefault()

        var label = document.getElementById(`label-input-${id}`).value
        var content = document.getElementById(`content-input-${id}`).value
        var url = `/web-content/api/home-carousel/detail/${id}/`

        fetch(url, {
            method: "patch",
            headers : {
                "Content-type" : 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                'label': label,
                'content': content,
            }),
        })
        .then((response)=> response.json())
        .then(function(data){
            var label = document.getElementById(`label-${data.id}`)
            var content = document.getElementById(`content-${data.id}`)

            label.innerText = data.label
            content.innerText = data.content

        })
    })

}


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

// update mission
function handleMissionForm(){
    var textArea = document.getElementById('mission-form-content')
    var missionform = document.getElementById('mission-form')

    textArea.addEventListener('input', function(e){
        var mission = document.getElementById('mission-form-content').value
        mission = this.mission
    })

    missionform.addEventListener('submit', function(e){
        e.preventDefault()
        var url = `/web-content/api/update-mission/${missionId}/`
        var mission = document.getElementById('mission-form-content').value

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
                'X-CSRFToken' : csrftoken,
            },
            body: JSON.stringify({'mission': mission}),
        })
        .then((response) => response.json())
        .then(function(data){
            var myModal = document.getElementById('exampleModal')

        })
    })
}

// update vision
function handleVisionForm(){
    var textArea = document.getElementById('vision-form-content')
    var visionForm = document.getElementById('vision-form')

    textArea.addEventListener('input', function(e){
        var vision = document.getElementById('vision-form-content').value
        vision = this.vision
    })

    visionForm.addEventListener('submit', function(e){
        e.preventDefault()
        var url = `/web-content/api/update-vision/${visionId}/`
        var vision = document.getElementById('vision-form-content').value
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
                'X-CSRFToken' : csrftoken,
            },
            body: JSON.stringify({'vision': vision}),
        })
        .then((response) => response.json())
        .then(function(data){

        })
    })
}



function saveMissionModal(){
    var form = document.getElementById('mission-form')
    form.dispatchEvent(new Event('submit'));
}

function saveVisionModal(){
    var form = document.getElementById('vision-form')
    form.dispatchEvent(new Event('submit'));
}


function saveUpdateCarouselModal(){
    var form = document.getElementById("carousel-detail-form")
    form.dispatchEvent(new Event('submit'))
}



function showHomeContent(){
    if ( document.getElementById("homeButton").className.match(/(?:^|\s)active(?!\S)/) ){

    }else{
        document.getElementById('homeButton').classList.add('active')
        pageContent.innerHTML = ""
        
        Promise.all([getLogoCard(), getCarouselCard(), getMissionCard(), getVisionCard()]).then((values) => {
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
