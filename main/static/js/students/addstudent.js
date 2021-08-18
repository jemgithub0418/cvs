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

function popAddStudentUserModal(){
    // var addNewStudentModal = document.getElementsById('')
    var modal = document.getElementById('add-student-modal')

    var modalBody = document.getElementById('add-student-modal-body')
    modalBody.innerHTML = ""


    var email = document.getElementById('id_email')
    // elementList.push(email)
    var firstName = document.getElementById('id_first_name')
    var middleName = document.getElementById('id_middle_name')
    var lastName = document.getElementById('id_last_name')
    var gender = document.getElementById('id_gender')
    var lrnOrStudentNumber = document.getElementById('id_LRN_or_student_number')
    var contactNumber = document.getElementById('id_contact_number')
    var dobMonth = document.getElementById('id_dob_month').value
    var dobDay = document.getElementById('id_dob_day').value
    var dobYear = document.getElementById('id_dob_year').value
    var address = document.getElementById('id_address')
    // var adviser = document.getElementById('id_adviser')
    var section = document.getElementById('id_section')
    var enrolledSubjects = document.querySelectorAll('input[name=enrolled_subjects]:checked');
    var dobDisplay = dobMonth.concat("-", dobDay, "-", dobYear)

    // var adviserText = adviser.options[adviser.selectedIndex].text;
    var sectionText = section.options[section.selectedIndex].text;

    subjectList = []
    for(var i = 0; i< enrolledSubjects.length; i++){
        subjectList.push(enrolledSubjects[i].value)
    }

    // console.log(enrolledSubjects[0].id)
    // var labels = document.querySelectorAll("[name='enrolled_subjects']");
    // var subjectList = [];
    // console.log(labels)
    // console.log(enrolledSubjects)
    // for (var i = 0; i < labels.length; i++) {
    //     var items = document.querySelectorAll('input[name=enrolled_subjects]:checked');
    //     // console.log(items[i].value)
    //     if(labels[i].getAttribute("for") == items[i].id) {
    //         console.log(labels[i].innerText);
    //         subjectList.push(label.innerText);
    //     }
    // }

    // console.log(subjectList)


    var container = document.createElement('div')
    container.id = "data-container";



    modalBody.innerHTML= `
        <small class="text-muted">Please review all information before saving data. The username and password for this account will be sent to the email provided below.</small> <br/>
        <div class="container">
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Email: </div>
                <div class="col-6">${email.value}</div>
            </div>
            <div class="row">
                <div class="col-4">First Name: </div>
                <div class="col-6">${firstName.value}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Middle Name: </div>
                <div class="col-6"> ${middleName.value}</div>
            </div>
            <div class="row">
                <div class="col-4">Last Name: </div>
                <div class="col-6">${lastName.value}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Gender: </div>
                <div class="col-6"> ${gender.value}</div>
            </div>
            <div class="row">
                <div class="col-4">LRN or Student Number: </div>
                <div class="col-6">${lrnOrStudentNumber.value}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Date of Birth: </div>
                <div class="col-6"> ${dobDisplay}</div>
            </div>
            <div class="row">
                <div class="col-4">Contact Number: </div>
                <div class="col-6">${contactNumber.value}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Address: </div>
                <div class="col-6"> ${address.value}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Section: </div>
                <div class="col-6"> ${sectionText}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Enrolled Subjects: </div>
                <div class="col-6"> ${subjectList}</div>
            </div>
        </div>

    `

    handleStudentProfileAndStudentInfo()


}

function handleStudentProfileAndStudentInfo(){
    var form = document.getElementById('student-form')

    form.addEventListener('submit', function(e){
        e.preventDefault()

        var email = document.getElementById('id_email').value
        var firstName = document.getElementById('id_first_name').value
        var middleName = document.getElementById('id_middle_name').value
        var lastName = document.getElementById('id_last_name').value
        var gender = document.getElementById('id_gender').value
        var lrnOrStudentNumber = document.getElementById('id_LRN_or_student_number').value
        var contactNumber = document.getElementById('id_contact_number').value
        var dobMonth = document.getElementById('id_dob_month').value
        var dobDay = document.getElementById('id_dob_day').value
        var dobYear = document.getElementById('id_dob_year').value
        var address = document.getElementById('id_address').value
        // var adviser = document.getElementById('id_adviser').value
        var section = document.getElementById('id_section').value
        var enrolledSubjects = document.querySelectorAll('input[name=enrolled_subjects]:checked');
        var dobDisplay = dobMonth.concat("-", dobDay, "-", dobYear)

        subjectList = []
        for(var i = 0; i< enrolledSubjects.length; i++){
            subjectList.push(enrolledSubjects[i].value)
        }

        var urlCreateProfile = "/accounts/api/student/profile/create/"

        //save student profile first
        const resultProfile = fetch(urlCreateProfile,{
            method: "POST",
            headers : {
                "Content-type" : "application/json",
                "X-CSRFToken" : csrftoken,
            },
            body: JSON.stringify({
                "user": {
                    'email':email,
                    'password': null,
                },
                "first_name" : firstName,
                "middle_name" : middleName,
                "last_name" : lastName,
                "gender": gender,
                "LRN_or_student_number": lrnOrStudentNumber,
                "dob_day" : dobDay,
                "dob_month": dobMonth,
                "dob_year": dobYear,
                "contact_number" : contactNumber,
                "address": address,

            })
        })
        .then((response)=>response.json())
        .then(function(data){
            // save the student info 
            var urlCreateInfo= `/accounts/api/student/info/create/`
            fetch(urlCreateInfo, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                    "student": data.user.id,
                    "enrolled_subjects": subjectList,
                    // "adviser": adviser,
                    "profile" : data.id,
                    "section": section,
                })
            })
            .then((response)=> response.json())
            .then(function(data){
                alert("Student Profile Successfully created.")
                e.target.reset()
            })
        })
    })
}


function saveUser(){
    var form = document.getElementById('student-form')
    form.dispatchEvent(new Event('submit'));
}


// function getStudentUser(lrn){
//     var url = `/accounts/api/student/info/detail/${lrn}/`

//     var lrn = 
//     fetch(url, {
//         method:"GET",
//     })
//     .then((response)=> response.json())
//     .then(function(data){

//     })
// }

// function handleStudentInfo(){
//     var form = document.getElementById('student-form')

//     form.addEventListener('submit', function(e){
//         e.preventDefault()

//         var adviser = document.getElementById('id_adviser').value
//         var section = document.getElementById('id_section').value
//         var enrolledSubjects = document.querySelectorAll('input[name=enrolled_subjects]:checked');
//         var dobDisplay = dobMonth.value.concat("-", dobDay.value, "-", dobYear.value)

//         var adviserText = adviser.options[adviser.selectedIndex].text;
//         var sectionText = section.options[adviser.selectedIndex].text;

//         subjectList = []
//         for(var i = 0; i< enrolledSubjects.length; i++){
//             subjectList.push(enrolledSubjects[i].value)
//         }

//         var url = "/accounts/api/student/info/create/"

//         fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-type" : "application/json",
//                 "X-CSRFToken" : csrftoken,
//             },
//             body: JSON.stringify({
//                 "student" : 
//             })
//         })
//     })
// }
