


function popModal(){
    var addnewstaff = document.getElementById('staffcreationmodal')
    var username = document.getElementById('id_username').value
    var password = document.getElementById('id_password1').value
    var email = document.getElementById('id_email').value
    var userLevel = document.querySelector('input[name="user_level"]:checked').value
    var gender = document.getElementById('id_gender').value
    var firstName = document.getElementById('id_first_name').value
    var middleName = document.getElementById('id_middle_name').value
    var lastName = document.getElementById('id_last_name').value
    var employeeNumber = document.getElementById('id_employee_number').value
    var mobileNumber = document.getElementById('id_mobile_number').value
    var address = document.getElementById('id_address').value

    var date_of_birth = document.getElementById('id_date_of_birth')

    var day = document.getElementById('id_dob_day').value
    var month = document.getElementById('id_dob_month').value
    var year = document.getElementById('id_dob_year').value

    var dobDisplay = month.concat("-", day, "-", year)

    addnewstaff.addEventListener('shown.bs.modal', function () {
    title.innerHTML = ""
    body.innerHTML = ""





    if(username == null || username == '' || password == null || password == '' || email == null || email == '' || userLevel == null || userLevel == '' ||
        firstName == null || firstName == '' || middleName == null || middleName == '' || lastName == null || lastName == '' ||
         employeeNumber == null || employeeNumber == '' || mobileNumber == null || mobileNumber == '' || address == null || address == '' ){
        title.innerHTML = "Invalid!"
        body.innerHTML = "Please provide all needed information."

    }else{
        title.innerHTML = `New User: ${firstName} ${lastName}`
        body.innerHTML += `
        <small class="text-muted">Please review all information before saving data.</small> <br/>
        <div class="container">
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Username: </div>
                <div class="col-6">${username}</div>
            </div>
            <div class="row"">
                <div class="col-4">Password: </div>
                <div class="col-6"> ${password}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Email: </div>
                <div class="col-6">${email}</div>
            </div>
            <div class="row"">
                <div class="col-4">Role: </div>
                <div class="col-6"> ${userLevel}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">First Name: </div>
                <div class="col-6">${firstName}</div>
            </div>
            <div class="row"">
                <div class="col-4">Middle Name: </div>
                <div class="col-6"> ${middleName}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Last Name: </div>
                <div class="col-6">${lastName}</div>
            </div>
            <div class="row"">
                <div class="col-4">Gender: </div>
                <div class="col-6"> ${gender}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Employee Number: </div>
                <div class="col-6">${employeeNumber}</div>
            </div>
            <div class="row"">
                <div class="col-4">Date of Birth: </div>
                <div class="col-6"> ${dobDisplay}</div>
            </div>
            <div class="row" style="background-color: #f2f2f2;">
                <div class="col-4">Mobile Number: </div>
                <div class="col-6">${mobileNumber}</div>
            </div>
            <div class="row"">
                <div class="col-4">Address: </div>
                <div class="col-6"> ${address}</div>
            </div>
        </div>
        `
    }
    })
}



// reviewButton.addEventListener("click", (function(){
//     return function(){
//         reviewInfo()
//     }
// }))


function saveUser(){
    document.getElementById('userform').submit()
}
