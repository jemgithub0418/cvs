// function getEnrolledSubjects(id){

//     var modal = document.getElementById('grade-modal')
//     var modalBody = document.getElementById('grade-modal-body')

//     fetch("/accounts/api/school-period/list/",{
//         method: "GET",
//     })
//     .then((response)=> response.json())
//     .then(function(data){
//         var periodList = data
//         modal.addEventListener('shown.bs.modal', function(){
//             var enrolledSubjectsList = []
//             modalBody.innHTML = ""

//             function createGradeInput(){

//                 var idHolder = "student-".concat(id)
//                 var enrolledSubject= document.createElement('select')
//                 enrolledSubjectsList = document.getElementById(idHolder)

//                 for (var i=0; i<enrolledSubjectsList.length; i++){
//                     this.a = enrolledSubjectsList[i].text
//                     this.b = enrolledSubjectsList[i].value
//                     var name = this.a
//                     name = document.createElement('label')
//                     name.innerText = this.a
//                     name.classList.add("remove-after")
//                     modalBody.append(name)
//                     name = document.createElement('input')
//                     name.id = "input-".concat(this.b)
//                     name.type = "number"
//                     name.min = "50.0"
//                     name.max = "99.0"
//                     name.step = "0.01"
//                     name.required = true
//                     name.classList.add("numberinput","form-control", "remove-after")
//                     modalBody.append(name)
//                     delete this.a;
//                     delete this.b;
//                 }
//             }     
//             new createGradeInput();  
//             console.log('1')
//         })
//     })

//     // for (var i =0;i< bodyElements.length; i++){
//     //     bodyElements[i].parentNode.removeChild(bodyElements[i])
//     //     i++
//     // }
//     // console.log(enrolledSubjectsList[0].text)


    
//     modal.addEventListener('hide.bs.modal', function(){
//         var bodyElements = document.querySelectorAll('.remove-after').forEach(e => e.remove())

//     })
// }

function getEnrolledSubjects(id){
    var enrolledSubjectsList = []
    var modalBody = document.getElementById('grade-modal-body')
    var modalTitle = document.getElementById('grade-moda-title')
    
    var bodyChildren = modalBody.children
    modalBody.innerHTML = ""

    var label = document.createElement('label')
    label.for = "id_period"
    label.classList.add('form-group')
    label.innerText = "Period"
    modalBody.append(label)
    var periodSelect = document.createElement('select')
    periodSelect.name = "period"
    periodSelect.classList.add("form-select",)
    periodSelect.required = true
    periodSelect.id = "id_period"
    periodSelect.ariaLabel = "Defaul select example"
    modalBody.append(periodSelect)

    fetch("/accounts/api/school-period/list/",{
        method: "GET",
    })
    .then((response)=> response.json())
    .then(function(data){


    for(i=0; i < data.length; i++){
       var option = document.createElement('option')
       option.value = data[i].id
       option.innerText = data[i].period
       if(i = 0){
        option.selected = true
       }
       periodSelect.append(option)
    }
    })
    var idHolder = "student-".concat(id)
    enrolledSubjectsList = document.getElementById(idHolder).children

    console.log(enrolledSubjectsList)
    for (var i=0; i<enrolledSubjectsList.length; i++){
        console.log(enrolledSubjectsList[i].innerText)

        var label = document.createElement('label')
        label.innerText = enrolledSubjectsList[i].innerText.trim()
        label.classList.add("remove-after",)
        label.for = "input-".concat(enrolledSubjectsList[i].value)
        modalBody.append(label)
        var input = document.createElement('input')
        input.id = "input-".concat(enrolledSubjectsList[i].getAttribute("data-id"))
        input.type = "number"
        input.min = "50.0"
        input.max = "99.0"
        input.step = "0.01"
        input.required = true
        input.classList.add("numberinput","form-control", "remove-after")
        modalBody.append(input)
    }
}




// var modal = document.getElementById('grade-modal')

// modal.addEventListener('shown.bs.modal', function(){

// })