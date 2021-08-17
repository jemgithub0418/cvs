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
    var modalBody = document.getElementById('grade-modal-body')
    var modalTitle = document.getElementById('grade-modal-title')
    var fullName = document.getElementById(`student-${id}`)
    modalTitle.innerText = ""
    modalTitle.innerText += "Grades of ".concat(fullName.getAttribute('data-name'))
    
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
    periodSelect.style.marginBottom = '2rem';
    periodSelect.selectedIndex = 0;
    var optionLabel = document.createElement('option')
    optionLabel.innerText = "Select School Period"
    periodSelect.append(optionLabel)

    modalBody.append(periodSelect)

    var divGrades = document.createElement('div')
    divGrades.classList.add('container')
    divGrades.id='div-grades'
    modalBody.append(divGrades)

    fetch("/accounts/api/school-period/list/",{
        method: "GET",
    })
    .then((response)=> response.json())
    .then(function(data){

        for(i = 0; i < data.length ; i++){
            var optionsForSchoolPeriod = document.createElement('option');
            optionsForSchoolPeriod.value = data[i].id
            optionsForSchoolPeriod.innerText = data[i].period
            periodSelect.append(optionsForSchoolPeriod)
            if(i == 0){
                optionsForSchoolPeriod.selectedIndex = i ;
            }

        }


    })
    .then(function(){
        fetch(`/accounts/api/student/grade/${id}/`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then(function(data){
            console.log(data)

            // set change eventlistener for select
            periodSelect.addEventListener('change', function(){
                // loop thru data
                divGrades.innerHTML = ""

                for(i = 0; i < data.length; i++ ){
                    // display grades for certain school period
                    if(periodSelect.value == data[i].period.id)
                    {
                        // item counter for removing hr line at the end
                        // for rows and columns
                        var rowDiv = document.createElement('div')
                        rowDiv.classList.add('row')
                        var colDivSubject = document.createElement('div')
                        colDivSubject.classList.add('col-6')
                        rowDiv.append(colDivSubject)
                        var colDivGrade = document.createElement('div')
                        colDivGrade.classList.add('col-6')
                        rowDiv.append(colDivGrade)

                        // creating subject label and grade span
                        var subjectLabel = document.createElement('label')
                        subjectLabel.innerText = data[i].subject.subject_name
                        var subjectGrade = document.createElement('span')
                        subjectGrade.innerText = data[i].grade
                        // failing grade
                        if(parseFloat(data[i].grade) < 75){
                            rowDiv.style.backgroundColor = "rgb(255 38 38 / 91%)";
                        }
                        // warning for failing
                        if(parseFloat(data[i].grade) < 80 && parseFloat(data[i].grade) >=75 ){
                            rowDiv.style.backgroundColor = "rgb(253 159 3 / 70%)"
                        }
                        // passed
                        if(parseFloat(data[i].grade) > 79){
                            rowDiv.style.backgroundColor = "#16ca76"
                        }

                        // appending subject and grade on respective columns
                        colDivSubject.append(subjectLabel)
                        colDivGrade.append(subjectGrade)

                        divGrades.append(rowDiv)
                        if(i != data.length){
                            divGrades.innerHTML += "<hr>"
                        }
                    }
                }
            })

        })
    })
}