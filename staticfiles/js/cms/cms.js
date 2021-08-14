const pageContent = document.getElementById('page-content')

handleLogoForm()

// csrf

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


// csrf


// LOGO

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
    var url = "/web-content/api/changelogo/"


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

        inputGroup.append(csrftokennode)
        inputGroup.append(imageField)
        inputGroup.append(uploadButton)

        // combine elemnts together

        card.append(cardBody)
        cardBody.append(header)
        cardBody.append(document.createElement('hr'))
        cardBody.append(label1)
        cardBody.append(image)
        cardBody.append(document.createElement('br'))
        cardBody.append(label)
        cardBody.append(form)
        form.append(inputGroup)



        return card

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


// LOGO end 



// CAROUSEL

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
        var onDisplay = document.createElement('small')
        onDisplay.innerText = 'On display: '
        var cardImage = document.createElement('img')
        cardImage.classList.add('card-img-top')
        cardImage.alt = '...'
        // cardImage.id = ""
        cardImage.style.maxWidth = '15rem'
        cardImage.style.maxHeight = '15rem'
        var cardLabelLabel = document.createElement('span')
        cardLabelLabel.innerText = "Label: "
        var cardContentLabel = document.createElement('span')
        cardContentLabel.innerText = "Content: "
        var cardLabel = document.createElement('span')
        cardLabel.innerText = ""
        var cardContent = document.createElement('span')
        cardContent.innerText = ""
        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var trashIconSpan = document.createElement('span')
        trashIconSpan.style.color = 'red'
        var trashIcon = document.createElement('i')
        trashIcon.classList.add('fas', 'fa-trash-alt')
        trashIcon.setAttribute('data-process', "delete")
        trashIcon.setAttribute('type', 'button')
        trashIcon.setAttribute('data-bs-toggle', 'modal')
        trashIcon.setAttribute('data-bs-target', '#exampleModal')
        // trashIcon.setAttribute('onclick', `popMissionModal(  )
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#exampleModal')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('data-process', "update")
        var spacing = document.createElement('small')
        spacing.innerHTML = `&nbsp`


        var titleDiv = document.createElement('div')
        titleDiv.classList.add('row')

        var headerDiv = document.createElement('div')
        headerDiv.classList.add('col-8')
        headerDiv.append(header)

        var addButtonDiv = document.createElement('div')
        addButtonDiv.classList.add('col-4')

        var addCarousel = document.createElement('i')
        addCarousel.classList.add('fas', 'fa-plus')
        addCarousel.id = 'add-new-carousel-image'
        addCarousel.setAttribute('type', 'button')
        addCarousel.setAttribute('data-bs-toggle', 'modal')
        addCarousel.setAttribute('data-bs-target', '#exampleModal')
        addCarousel.setAttribute('onClick', 'popCreateCarouselModal()')

        var addCarouselSpan = document.createElement('span')
        addCarouselSpan.style.color = 'blue'
        addCarouselSpan.style.float = 'right'
        addCarouselSpan.title = 'Click to add new image.'
        addCarouselSpan.append(addCarousel)

        addButtonDiv.append(addCarouselSpan)

        titleDiv.append(headerDiv)
        titleDiv.append(addButtonDiv)

        // construct nodes

        card.append(cardBody)
        cardBody.append(titleDiv)
        cardBody.append(document.createElement('hr'))

        for (var i = 0; i < data.length; i++) {
            var itemId = data[i].id
            cardImage.setAttribute('id', "img-".concat(itemId))
            cardLabel.setAttribute('id', "label-".concat(itemId))
            cardContent.setAttribute('id', "content-".concat(itemId))
            cardBody.append(onDisplay)
            cardImage.src = data[i].image
            cardBody.append(cardImage)
            cardBody.innerHTML += '<br>'
            cardBody.append(cardLabelLabel)
            cardBody.append(cardLabel)
            cardLabel.innerText = data[i].label
            cardBody.innerHTML += '<br>'
            cardBody.append(cardContentLabel)
            cardBody.append(cardContent)
            cardContent.innerText = data[i].content
            cardBody.innerHTML += '<br>'
            cardBody.append(iconGroup)
            iconGroup.append(trashIconSpan)
            trashIconSpan.append(trashIcon)
            trashIcon.setAttribute('onClick', `popDeleteCarouselModal(${itemId})`)
            iconGroup.append(spacing)
            iconGroup.append(editIconSpan)
            editIconSpan.append(editIcon)
            editIcon.setAttribute('onClick', `popCarouselDetailModal(${itemId})`)
            if(i != data.length -1){
                cardBody.innerHTML += `<br><hr>`
            }
        }

        return card
    })
}


function popCreateCarouselModal(){
    var createCarouseModal = document.getElementById('exampleModal')

    createCarouseModal.addEventListener('shown.bs.modal', function(){
        var saveButton = document.getElementById('saveButton')
        saveButton.setAttribute('for', 'carousel-details')
        saveButton.setAttribute('onClick', `saveCarouselModal()`)
        saveButton.classList.remove('btn-danger')
        saveButton.classList.add('btn-primary')
        var title = document.getElementById('modal-title')
        var body = document.getElementById('modal-body')
        title.innerHTML = ""
        body.innerHTML = ""

        var form = document.createElement('form')
        form.action = `/web-content/api/home-carousel/add/`
        form.id = "create-carousel-form"
        form.method = "POST"


        var inputGroup = document.createElement('div')
        inputGroup.classList.add('input-group', 'mb-3')

        var imageField = document.createElement('input')
        imageField.type = 'file'
        imageField.name = 'image'
        imageField.classList.add('form-control')
        imageField.required = true
        imageField.id = 'image-input'

        var uploadButton = document.createElement('button')
        uploadButton.type = 'submit'
        uploadButton.classList.add('input-group-text')
        uploadButton.for = 'inputGroupFile02'
        uploadButton.innerText = 'Upload'

        inputGroup.append(imageField)
        inputGroup.append(uploadButton)

        var labelSpanLabel = document.createElement('span')
        labelSpanLabel.innerText = "Label: "
        var labelInput = document.createElement('input')
        labelInput.id = "label-input"
        labelInput.type = "text"
        labelInput.classList.add('form-control')
        labelInput.required = true

        var contentSpanLabel = document.createElement('span')
        contentSpanLabel = "Content: "
        var contentInput = document.createElement('textarea')
        contentInput.id = "content-input"
        contentInput.classList.add("textinput", "textInput", "form-control")
        contentInput.rows = "5"
        contentInput.required = true
        contentInput.ariaLabel = "With textarea"
        contentInput.required = true


        title.innerText = 'Upload new Carousel Image'

        form.append(inputGroup)
        form.append(labelSpanLabel)
        form.append(labelInput)
        form.append(contentSpanLabel)
        form.append(contentInput)
        body.append(form)

        handleCreateCarousel()
    })
}

function popDeleteCarouselModal(id){
    var deleteCarouselModal = document.getElementById('exampleModal')

    deleteCarouselModal.addEventListener('shown.bs.modal', function(){
        var saveButton = document.getElementById('saveButton')
        saveButton.setAttribute('for', 'carousel-details')
        saveButton.setAttribute('onClick', `deleteCarousel()`)
        saveButton.innerText = 'Delete'
        saveButton.classList.remove('btn-primary')
        saveButton.classList.add('btn-danger')
        var title = document.getElementById('modal-title')
        var body = document.getElementById('modal-body')
        title.innerHTML = ""
        body.innerHTML = ""
        title.innerText = "This image will not appear on Home Carousel after deleting, are you sure you want to proceed?"
        var image = document.createElement('img')
        var imageId = "img-".concat(id)
        var imageValue = document.getElementById(imageId)
        image.src = imageValue.src
        image.style.maxHeight = "15rem"
        image.style.maxWidth = "15rem"
        var spanLabel = document.createElement('span')
        spanLabel.innerText = 'Label: '
        var label = document.createElement('span')
        var labelId = "label-".concat(id)
        label.innerText = document.getElementById(labelId).innerText
        var spanContent = document.createElement('span')
        spanContent.innerText = 'Content: '
        var content = document.createElement('span')
        var contentId = 'content-'.concat(id)
        content.innerText = document.getElementById(contentId).innerText

        var form = document.createElement('form')
        form.action = `web-content/api/home-carousel/delete/${id}/`
        form.id = `carousel-delete-form`
        form.method = 'DELETE'

        body.append(image)
        body.innerHTML += '<br>'
        body.append(spanLabel)
        body.append(label)
        body.innerHTML += '<br>'
        body.append(spanContent)
        body.append(content)
        body.append(form)
        deleteCarouselForm(id)
    })
}


function popCarouselDetailModal(id){
    var updateCarouselImageModal = document.getElementById('exampleModal')

    updateCarouselImageModal.addEventListener('shown.bs.modal', function(){

        var saveButton = document.getElementById('saveButton')
        saveButton.setAttribute('for', 'carousel-details')
        saveButton.setAttribute('onClick', `saveUpdateCarouselModal()`)
        saveButton.classList.remove('btn-danger')
        saveButton.classList.add('btn-primary')
        saveButton.innerText = "Save"
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

function handleCreateCarousel(){
    var form = document.getElementById('create-carousel-form')
    form.addEventListener('submit', function(e){
        e.preventDefault()

        let imageInput = document.getElementById('image-input')
        let labelInput = document.getElementById('label-input')
        let contentInput = document.getElementById('content-input')
        let data = new FormData();

        data.append('image', imageInput.files[0])
        data.append('label', labelInput.value)
        data.append('content', contentInput.value)

        var url = `/web-content/api/home-carousel/add/`

        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRFToken" : csrftoken,
            },
            body: data,
        })
        .then((response)=> response.json())
        .then(function(data){
            console.log(data)
        })
    })

}



// deleting carousel items
function deleteCarouselForm(id){
    var form = document.getElementById('carousel-delete-form')
    form.addEventListener('submit', function(e){
        e.preventDefault()

        var url = `/web-content/api/home-carousel/delete/${id}/`

        fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-type": 'application/json',
                "X-CSRFToken": csrftoken,
            },
            // body: JSON.stringify()
        })
        .then(function(){
            // needs more work here
            // Promise.all([getCarouselCard()]).then((values) => {
            //     values.forEach(card=> pageContent.append(card))
            // })
        })
    })
}



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


// CAROUSEL end



// mission start 


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
        mission.innerHTML = data.mission
        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#missionModal')
        editIcon.setAttribute('onclick', `popMissionModal()`)

        card.append(cardBody)
        cardBody.append(header)
        cardBody.append(document.createElement('hr'))
        cardBody.append(onDisplay)
        cardBody.append(mission)
        cardBody.append(iconGroup)
        iconGroup.append(editIconSpan)
        editIconSpan.append(editIcon)

        return card

    })
}

function popMissionModal(){
    var missionModal = document.getElementById('missionModal')

    missionModal.addEventListener('shown.bs.modal', function(){
        missionModal.removeAttribute('tabIndex')
        handleMissionForm()

    })
}


// function popMissionModal(){
//     var updateMissionModal = document.getElementById('exampleModal')
//     var missionContent = document.getElementById('mission-content')

//     updateMissionModal.addEventListener('shown.bs.modal', function(){
//         var saveButton = document.getElementById('saveButton')
//         saveButton.setAttribute('for', 'mission-form')
//         saveButton.setAttribute('onclick', `saveMissionModal()`)
//         saveButton.classList.remove('btn-danger')
//         saveButton.classList.add('btn-primary')
//         var title = document.getElementById('modal-title')
//         var body = document.getElementById('modal-body')
//         var onDisplay = document.createElement('div')
//         onDisplay.classList.add('input-group')
//         var form = document.createElement('form')
//         form.action = `/web-content/api/update-mission/${missionId}/`
//         form.id = 'mission-form'
//         form.method = 'PUT'
//         var label = document.createElement('span')
//         label.innerText = "On display:"
//         label.innerHTML += '&nbsp;&nbsp;'
//         var inputMission = document.createElement('textarea')
//         inputMission.id= 'mission-form-content'
//         inputMission.classList.add('form-control')
//         inputMission.rows = '5'
//         inputMission.required = true
//         // inputMission.setAttribute('value', "none")
//         inputMission.ariaLabel = 'With textarea'
//         inputMission.value = missionContent.innerHTML
//         onDisplay.append(label)
//         onDisplay.append(inputMission)
//         form.append(onDisplay)

//         title.innerHTML = ""
//         body.innerHTML = ""

//         title.innerText = "Update School Mission"
//         body.append(form)
//         handleMissionForm()
//     })
// }


// update mission
function handleMissionForm(){
    var textArea = document.getElementById('id_mission')
    var missionform = document.getElementById('mission-form')

    textArea.addEventListener('input', function(e){
        var mission = document.getElementById('id_mission').value
        mission = this.mission
    })

    missionform.addEventListener('submit', function(e){
        e.preventDefault()
        var url = `/web-content/api/update-mission/${missionId}/`
        var mission = document.getElementById('id_mission').value

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
            // var myModal = document.getElementById('exampleModal')
            var mission = document.getElementById('mission-content')
            mission.innerHTML = data.mission

        })
    })
}

// mission end 



// vision start 


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
        vision.innerHTML = data.vision
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
        cardBody.append(document.createElement('hr'))
        cardBody.append(onDisplay)
        cardBody.append(vision)
        cardBody.append(iconGroup)
        iconGroup.append(editIconSpan)
        editIconSpan.append(editIcon)

        return card
    })
}




function popVisionModal(){
    var updateVisionModal = document.getElementById('visionModal')
    // var visionContent = document.getElementById('vision-content')

    updateVisionModal.addEventListener('shown.bs.modal', function() {
        // var saveButton = document.getElementById('saveButton')
        // saveButton.setAttribute('for', 'vision-content')
        // saveButton.setAttribute('onclick', `saveVisionModal()`)
        // saveButton.classList.remove('btn-danger')
        // saveButton.classList.add('btn-primary')
        // var title = document.getElementById('modal-title')
        // var body = document.getElementById('modal-body')
        // var onDisplay = document.createElement('div')
        // onDisplay.classList.add('input-group')
        // var form = document.createElement('form')
        // form.action = `/web-content/api/update-mission/${visionId}/`
        // form.id = 'vision-form'
        // form.method = 'PUT'
        // var label = document.createElement('span')
        // label.innerText = "On display:"
        // label.innerHTML += '&nbsp;&nbsp;'
        // var inputVision = document.createElement('textarea')
        // inputVision.id= 'vision-form-content'
        // inputVision.classList.add('form-control')
        // inputVision.rows = '5'
        // // inputMission.setAttribute('value', "none")
        // inputVision.ariaLabel = 'With textarea'
        // inputVision.value = visionContent.innerText
        // onDisplay.append(label)
        // onDisplay.append(inputVision)
        // form.append(onDisplay)

        // title.innerHTML = ""
        // body.innerHTML = ""

        // title.innerText = "Update School Vision"
        // body.append(form)

        visionModal.removeAttribute('tabIndex')
        handleVisionForm()
    })


// update vision
function handleVisionForm(){
    // var textArea = document.getElementById('id_vision')
    var visionForm = document.getElementById('vision-form')

    // textArea.addEventListener('input', function(e){
    //     var vision = document.getElementById('id_vision').value
    //     vision = this.vision
    // })

    visionForm.addEventListener('submit', function(e){
        e.preventDefault()
        var url = `/web-content/api/update-vision/${visionId}/`
        var vision = document.getElementById('id_vision').value

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
            var vision = document.getElementById('vision-content')
            vision.innerHTML = data.vision
        })
    })
}



}

// vision end 


// office hours

function getOfficeHoursCard(){
    var url = `/web-content/api/office-hours/update/${officeHoursId}/`

    return fetch(url)
    .then((response) => response.json())
    .then(function(data){

        function getDay(selected){
            // check cms models SchoolOfficeHours for choices
            dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

            for (var i=0; i <= dayList.length; i++){
                if(selected == i){
                    return dayList[i-1]
                }
            }

        }

        function getTime(selected){
            // check cms.models.SchoolOfficeHours for choices
            timeList = ['6AM','7AM','8AM','9AM','10AM','11AM','12NN','1PM','2PM','3PM',
            '4PM','5PM','6PM','7PM','8PM','9PM']

            for (var i = 0; i<= timeList.length; i++){
                if(selected == i){
                    return timeList[i-1]
                }
            }
        }


        var card = document.createElement('div')
        card.classList.add('card')
        card.id = 'office-hours-card'
        var cardBody = document.createElement('div')
        cardBody.id = 'office-hours-card-body'
        cardBody.classList.add('card-body')
        var header = document.createElement('h5')
        header.innerText = 'School Office Hours'
        var onDisplay = document.createElement('small')
        onDisplay.innerText = 'On display:'
        var officeHours = document.createElement('div')
        officeHours.id = 'office-hours-content'
        officeHours.innerText = `From ${getDay(data.starting_day)} to ${getDay(data.last_day)}, ${getTime(data.opening)} - ${getTime(data.closing)}`

        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#office-hours-modal')
        editIcon.setAttribute('onclick', `popOfficeHoursModal()`)

        iconGroup.append(editIconSpan)
        editIconSpan.append(editIcon)


        card.append(cardBody)
        cardBody.append(header)
        cardBody.innerHTML += '<hr>'
        cardBody.append(onDisplay)
        cardBody.append(officeHours)
        cardBody.append(iconGroup)

        return card

    })
}

function popOfficeHoursModal(){
    var officeHoursModal = document.getElementById('office-hours-modal')

    officeHoursModal.addEventListener('shown.bs.modal', function(){
        updateOfficeHours(officeHoursId)
    })
}


function updateOfficeHours(id){
    var officeHoursForm = document.getElementById('office-hours-form')

    officeHoursForm.addEventListener('submit', function(e){
        e.preventDefault()

        var url = `/web-content/api/office-hours/update/${id}/`
        var startingDay = document.getElementById('id_starting_day').value
        var lastDay = document.getElementById('id_last_day').value
        var opening = document.getElementById('id_opening').value
        var closing = document.getElementById('id_closing').value
        // console.log(startingDay, lastDay, opening, closing)

        fetch(url, {
            method: "PUT",
            headers : {
                "Content-type" : "application/json",
                "X-CSRFToken" : csrftoken,
            },
            body: JSON.stringify({
                'starting_day': startingDay,
                'last_day' : lastDay,
                'opening' : opening,
                'closing' : closing,
            })
        })
        .then((response) => response.json())
        .then(function(data){

            function getDay(selected){
                // check cms models SchoolOfficeHours for choices
                dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

                for (var i=0; i <= dayList.length; i++){
                    if(selected == i){
                        return dayList[i-1]
                    }
                }

            }

            function getTime(selected){
                // check cms.models.SchoolOfficeHours for choices
                timeList = ['6AM','7AM','8AM','9AM','10AM','11AM','12NN','1PM','2PM','3PM',
                '4PM','5PM','6PM','7PM','8PM','9PM']

                for (var i = 0; i<= timeList.length; i++){
                    if(selected == i){
                        return timeList[i-1]
                    }
                }
            }
            var start = getDay(startingDay)
            var last = getDay(lastDay)
            var open = getTime(opening)
            var close = getTime(closing)

            var officeHours = document.getElementById('office-hours-content')
            officeHours.innerText = `From ${start} to ${last}, ${open} - ${close}`
        })
    })

}

// office hours end


// school address 

function getSchoolAddressCard(){
    var url = `/web-content/api/school-address/update/${schoolAddressId}/`

    return fetch(url)
    .then((response) => response.json())
    .then(function(data){
        var card = document.createElement('div')
        card.classList.add('card')
        card.id = 'school-address-card'
        var cardBody = document.createElement('div')
        cardBody.id = 'school-address-card-body'
        cardBody.classList.add('card-body')
        var header = document.createElement('h5')
        header.innerText = 'School Address'
        var onDisplay = document.createElement('small')
        onDisplay.innerText = 'On display:'
        var schoolAddress = document.createElement('div')
        schoolAddress.id = 'school-address-content'
        schoolAddress.innerText = `${data.street}, ${data.town}, ${data.city}, ${data.province}`
        // var schoolAddressStreet = document.createElement('span')
        // schoolAddressStreet.innerText = `${data.street}, `
        // schoolAddressStreet.id = 'street-address'
        // var schoolAddressTown = document.createElement('span')
        // schoolAddressTown.innerText = `${data.town}, `
        // schoolAddressTown.id = 'town-address'
        // var schoolAddressCity = document.createElement('span')
        // schoolAddressCity.innerText = `${data.city}, `
        // schoolAddressCity.id = 'city-address'
        // var schoolAddressProvince = document.createElement('span')
        // schoolAddressProvince.innerText = `${data.province}`
        // schoolAddressProvince.id = 'province-address'

        // schoolAddress.append(schoolAddressStreet)
        // schoolAddress.append(schoolAddressTown)
        // schoolAddress.append(schoolAddressCity)
        // schoolAddress.append(schoolAddressProvince)

        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'
        var editIcon = document.createElement('i')
        editIcon.classList.add('far', 'fa-edit')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#school-address-modal')
        editIcon.setAttribute('onclick', `popSchoolAddressModal()`)
        iconGroup.append(editIconSpan)
        editIconSpan.append(editIcon)

        card.append(cardBody)

        cardBody.append(header)
        cardBody.innerHTML += "<hr>"
        cardBody.append(onDisplay)
        cardBody.append(schoolAddress)
        cardBody.append(iconGroup)


        return card
    })
}


function handleSchoolAddress(){
    var schoolAddressForm = document.getElementById('school-address-form')
    var streetInput = document.getElementById('id_street')
    var townInput = document.getElementById('id_town')
    var cityInput = document.getElementById('id_city')
    var provinceInput = document.getElementById('id_province')

    streetInput.addEventListener('input', function(){
        var inputValue = document.getElementById('id_street').value

        var newStreetAddress = document.getElementById('street-address')
        newStreetAddress.innerText = inputValue
    })

    townInput.addEventListener('input', function(){
        var inputValue = document.getElementById('id_town').value

        var newTownAddress = document.getElementById('town-address')
        newTownAddress.innerText = inputValue
    })

    cityInput.addEventListener('input', function(){
        var inputValue = document.getElementById('id_city').value

        var newCityAddress = document.getElementById('city-address')
        newCityAddress.innerText = inputValue
    })

    provinceInput.addEventListener('input', function(){
        var inputValue = document.getElementById('id_province').value

        var newProvinceAddress = document.getElementById('province-address')
        newProvinceAddress.innerText = inputValue
    })

    schoolAddressForm.addEventListener('submit', function(e){
        e.preventDefault()
        var url = `/web-content/api/school-address/update/${schoolAddressId}/`

        var streetInput = document.getElementById('id_street').value
        var townInput = document.getElementById('id_town').value
        var cityInput = document.getElementById('id_city').value
        var provinceInput = document.getElementById('id_province').value

        fetch(url, {
            method: "PUT",
            headers : {
                "Content-type" : "application/json",
                "X-CSRFToken" : csrftoken,
            },
            body: JSON.stringify({
                'street': streetInput,
                'town' : townInput,
                'city' : cityInput,
                'province' : provinceInput,
            })
        })
        .then((response)=> response.json())
        .then(function(data){
            var schoolAddressContent = document.getElementById('school-address-content')
            schoolAddressContent.innerText = `${streetInput}, ${townInput}, ${cityInput}, ${provinceInput}`
        })
    })

}


function popSchoolAddressModal(){
    var schoolAddressModal = document.getElementById('school-address-modal')

    schoolAddressModal.addEventListener('shown.bs.modal', function(){
        // console.log('form handler passed')
        handleSchoolAddress()
    })
}

// school address


// school contact number

function getSchoolContactNumbersCard(){
    var url = `/web-content/api/school-contact-number/list/`

    return fetch(url)

    .then((response) => response.json())
    .then(function(data){
        var card = document.createElement('div')
        card.id = 'school-contact-number-card'
        card.classList.add('card')
        var cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        cardBody.id = 'school-contact-number-card-body'
        var rowHeader = document.createElement('div')
        rowHeader.classList.add('row')
        rowHeader.style.display = 'flex'
        var header = document.createElement('div')
        header.classList.add('col-10')
        var headerContent = document.createElement('h5')
        headerContent.innerText = "School Contact Number(s)"
        var addButtonDiv = document.createElement('div')
        addButtonDiv.classList.add('col-2')
        var addButtonSpan = document.createElement('span')
        addButtonSpan.title = "Click to add new contact number."
        addButtonSpan.style.color = 'blue'
        addButtonSpan.style.float = 'right'
        var addButton = document.createElement('i')
        addButton.classList.add('fas', 'fa-plus')
        addButton.setAttribute('onClick', `popAddSchoolContactNumberModal()`)
        addButton.setAttribute('type', 'button')
        addButton.setAttribute('data-bs-toggle', 'modal')
        addButton.setAttribute('data-bs-target', '#add-school-contact-number-modal')
        var onDisplay = document.createElement('small')
        onDisplay.innerText = "On display: "
        var contactNumber = document.createElement('span')
        contactNumber.value = ""

        var iconGroup = document.createElement('span')
        iconGroup.style.fontSize = '20px'

        var trashIconSpan = document.createElement('span')
        trashIconSpan.style.color = 'red'

        var trashIcon = document.createElement('i')
        trashIcon.setAttribute('type', 'button')
        trashIcon.setAttribute('data-bs-toggle', 'modal')
        trashIcon.setAttribute('data-bs-target', '#exampleModal')
        trashIcon.classList.add('fas', 'fa-trash-alt')
        var editIconSpan = document.createElement('span')
        editIconSpan.style.color = 'brown'

        var editIcon = document.createElement('i')
        editIcon.setAttribute('type', 'button')
        editIcon.setAttribute('data-bs-toggle', 'modal')
        editIcon.setAttribute('data-bs-target', '#exampleModal')
        editIcon.classList.add('far', 'fa-edit')

        var spacing = document.createElement('small')
        spacing.innerHTML = `&nbsp`



        addButtonSpan.append(addButton)
        addButtonDiv.append(addButtonSpan)
        header.append(headerContent)
        rowHeader.append(header)
        rowHeader.append(addButtonDiv)

        card.append(cardBody)
        cardBody.append(rowHeader)
        cardBody.innerHTML += "<hr>"
        cardBody.append(onDisplay)
        cardBody.innerHTML += "<br>"

        for(var i = 0; i <= data.length-1; i++){
            var label = document.createElement('span')
            label.innerText =  `Contact Number ${i+1}: `
            cardBody.append(label)
            contactNumber.innerText = `${data[i].contact_number}`
            cardBody.append(contactNumber)
            cardBody.innerHTML += "<br>"
            trashIconSpan.append(trashIcon)
            editIconSpan.append(editIcon)
            iconGroup.append(trashIconSpan)
            iconGroup.append(spacing)
            iconGroup.append(editIconSpan)
            cardBody.append(iconGroup)

            if(i != data.length-1 ){
                cardBody.innerHTML += "<hr>"
            }
        }

        return card
    })    
}


function popAddSchoolContactNumberModal(){
    var addSchoolContactNumberModal = document.getElementById('add-school-contact-number-modal')

    addSchoolContactNumberModal.addEventListener('shown.bs.modal', function(){
        var modalBody = document.getElementById('add-school-contact-number-modal-body')
        modalBody.innerHTML = ""

        var formDiv = document.createElement('div')
        formDiv.classList.add('form-group', 'mb-3')
        var schoolContactNumberForm = document.createElement('form')
        schoolContactNumberForm.id = 'add-school-contact-number-form'
        schoolContactNumberForm.action = "/web-content/api/school-contact-number/list/"
        schoolContactNumberForm.method = "POST"
        var contactLabel = document.createElement('label')
        contactLabel.innerText = "Contact Number*"
        contactLabel.for = 'id_contact_number'
        contactLabel.classList.add('requiredField')
        var contactNumberInput = document.createElement('input')
        contactNumberInput.classList.add('textinput','textInput','form-control')
        contactNumberInput.id = 'id_contact_number'
        contactNumberInput.type = 'text'

        schoolContactNumberForm.append(contactLabel)
        schoolContactNumberForm.append(contactNumberInput)
        formDiv.append(schoolContactNumberForm)
        modalBody.append(formDiv)
        handleAddSchoolContactNumberForm()
    })
}

function handleAddSchoolContactNumberForm(){
    var form = document.getElementById('add-school-contact-number-form')

    form.addEventListener('submit', function(e){
        e.preventDefault()
        var contactNumber = document.getElementById('id_contact_number').value
        var url = "/web-content/api/school-contact-number/list/"

        fetch(url, {
            headers : {
                "Content-type" : "application/json",
                "X-CSRFToken" : csrftoken,
            },
            method: "POST",
            body: JSON.stringify({'contact_number': contactNumber})
        })
        .then((resp) => resp.json())
        .then(function(data){
            console.log(data)
        })
    })
}

// function saveAddSchoolContactNumberForm(){

// }

// school contact number



// needed for submition of modal forms
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

function deleteCarousel(){
    var form = document.getElementById('carousel-delete-form')
    form.dispatchEvent(new Event('submit'))
}

function saveCarouselModal(){
    var form = document.getElementById('create-carousel-form')
    form.dispatchEvent(new Event('submit'))
}

function saveOfficeHoursModal(){
    var form = document.getElementById('office-hours-form')
    form.dispatchEvent(new Event('submit'))
}

function saveSchoolAddressModal(){
    var form = document.getElementById('school-address-form')
    form.dispatchEvent(new Event('submit'))
}

function saveAddSchoolContactNumberForm(){
    var form = document.getElementById('add-school-contact-number-form')
    form.dispatchEvent(new Event('submit'))
}

function showHomeContent(){
    if ( document.getElementById("homeButton").className.match(/(?:^|\s)active(?!\S)/) ){

    }else{
        document.getElementById('homeButton').classList.add('active')
        pageContent.innerHTML = ""
        
        Promise.all([getLogoCard(), getCarouselCard(), getMissionCard(), getVisionCard(), getOfficeHoursCard(), getSchoolAddressCard(), getSchoolContactNumbersCard(),]).then((values) => {
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
