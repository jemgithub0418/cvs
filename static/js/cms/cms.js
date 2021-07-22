
const pageContent = document.getElementById('page-content')
const imageDiv = document.getElementById('imgHolder')

handleLogoForm();

// Getting Home Page Contents
function changeLogo(){
    var url = "http://localhost:8000/web-content/api/changelogo/"

    fetch(url)
    .then((response) => response.json())
    .then(function(data){

        imageDiv.innerHTML = `
            <img src="${data[0].image}" id="img" class="card-img-top" alt="..." style="max-width: 10rem; max-height: 10rem;"> <br> 

        `
    })
}

function getLogoCard(){
    var url = "http://localhost:8000/web-content/api/changelogo/"

    fetch(url)
    .then((response) => response.json())
    .then(function(data){

        pageContent.innerHTML = `
            <div class="card" id="school-logo">
                <div class="card-body">
                    <h5>School Logo</h5>
                    <small>On display:</small> <br>
                    <img src="${data[0].image}" id="img" class="card-img-top" alt="..." style="max-width: 10rem; max-height: 10rem;"> <br> 
                    <small>Change:</small>
                <form action="http://localhost:8000/web-content/api/changelogo/" method="POST"  enctype="multipart/form-data" id="logo-form">
                    <input type="hidden" name="csrfmiddlewaretoken" value="${csrftoken}" >
                    <div class="input-group mb-3">
                        <input type="file" name="image" class="form-control" required id="inputGroupFile02">
                        <button type="submit" class="input-group-text" for="inputGroupFile02">Upload
                        </button>
                    </div>             
                </form>
                </div>
            </div>
        `
        handleLogoForm()

    })
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

        var url = "http://localhost:8000/web-content/api/changelogo/"

        fetch(url,{
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
            },
            body:data
        })
        .then((response) => response.json())
        .then(function(data){
            changeLogo()
            e.target.reset()
            handleLogoForm.call(this);
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
    }
    if ( document.getElementById("aboutButton").className.match(/(?:^|\s)active(?!\S)/) ){
        document.getElementById("aboutButton").classList.remove('active')
    }
    pageContent.innerHTML = ""
    getLogoCard()

}

function showAboutContent(){
    if ( document.getElementById("aboutButton").className.match(/(?:^|\s)active(?!\S)/) ){
        return;
    }else{
        document.getElementById('aboutButton').classList.add('active')
    }
    if ( document.getElementById("homeButton").className.match(/(?:^|\s)active(?!\S)/) ){
        document.getElementById("homeButton").classList.remove('active')
    }

    pageContent.innerHTML = `
        this is about content
    `
}