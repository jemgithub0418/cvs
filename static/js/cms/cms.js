const pageContent = document.getElementById('page-content')
var homeButtonClass = document.getElementById('homeButton').classList

function showHomeContent(){
    if ( document.getElementById("homeButton").className.match(/(?:^|\s)active(?!\S)/) ){
        return;
    }else{
        document.getElementById('homeButton').classList.add('active')
    }
    if ( document.getElementById("aboutButton").className.match(/(?:^|\s)active(?!\S)/) ){
        document.getElementById("aboutButton").classList.remove('active')
    }
    


    pageContent.innerHTML = `
        <h6>School Logo</h6>
        <div class="card" style="width: 100%">
            <small class="card-body">In use:</small>
            <img src="{{logo.image.url}}" class="card-img-top" alt="..." style="max-width: 10rem; max-height: 10rem;">
            <div class="card-body">
                <small>Change:</small>
            <form action="{% url 'change-logo' %}" method="POST"  enctype="multipart/form-data">
                <input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}" >
                <div class="input-group mb-3">
                    <input type="file" name="image" class="form-control" id="inputGroupFile02">
                    <button type="submit" class="input-group-text" for="inputGroupFile02">Upload
                    </button>
                </div>             
            </form>
            </div>
        </div>
    `

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