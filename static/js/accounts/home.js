// ######################### CSRF TOKEN
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


try{
    var usercreationform = document.getElementById('blogform')
    usercreationform.addEventListener('submit', function(e){

        var title = document.getElementById('title').value
        var content = document.getElementById('content').value
        var author = document.getElementById('author').value


        e.preventDefault()
        var url = "http://localhost:8000/accounts/api/blog/create/"
        fetch(url,{
            method: "POST",
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'title_title': title,
                'content_title': content,
                'author_title': author,
            }),
        }).then(function(response){
                if (response.ok){
                    document.getElementById('blogform').reset()
                    return response.json()
                }
                return Promise.reject(response);
            }).then(function(data){
                console.log(data)
            }).catch(function(error){
                console.log(error)
            })
    })
}catch(error){
    console.log(error)
}
