function getEnrolledSubjects(id){

    var modal = document.getElementById('grade-modal')
    var modalBody = document.getElementById('grade-modal-body')

    fetch("/accounts/api/school-period/list/",{
        method: "GET",
    })
    .then((response)=> response.json())
    .then(function(data){
        var periodList = data
        modal.addEventListener('shown.bs.modal', function(){
            console.log(periodList)
            var enrolledSubjectsList = []
            modalBody.innHTML = ""

            function createGradeInput(){

                var idHolder = "student-".concat(id)
                var enrolledSubject= document.createElement('select')
                enrolledSubjectsList = document.getElementById(idHolder)
                console.log(enrolledSubjectsList)


                for (var i=0; i<enrolledSubjectsList.length; i++){
                    this.a = enrolledSubjectsList[i].text
                    this.b = enrolledSubjectsList[i].value
                    var name = this.a
                    console.log(name)
                    name = document.createElement('label')
                    name.innerText = this.a
                    name.classList.add("remove-after")
                    modalBody.append(name)
                    name = document.createElement('input')
                    name.id = "input-".concat(this.b)
                    name.type = "number"
                    name.min = "50.0"
                    name.max = "99.0"
                    name.step = "0.01"
                    name.required = true
                    name.classList.add("numberinput","form-control", "remove-after")
                    modalBody.append(name)
                    delete this.a;
                    delete this.b;
                }
            }     
            new createGradeInput();  

        })
    })

    // for (var i =0;i< bodyElements.length; i++){
    //     bodyElements[i].parentNode.removeChild(bodyElements[i])
    //     i++
    // }
    // console.log(enrolledSubjectsList[0].text)


    
    modal.addEventListener('hide.bs.modal', function(){
        var bodyElements = document.querySelectorAll('.remove-after').forEach(e => e.remove())

    })
}


