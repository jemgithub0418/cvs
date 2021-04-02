var addnewstaff = document.getElementById('staffcreationmodal')


addnewstaff.addEventListener('shown.bs.modal', function () {
    console.log("kingina mo")
    title.innerHTML = ""
    body.innerHTML = ""
    var username = document.getElementById('id_username').value
    var passowrd = document.getElementById('id_password1').value
    var email = document.getElementById('id_email').value
    var userLevel = document.querySelector('input[name="user_level"]:checked').value
    var gender = document.getElementById('id_gender').value
    var firstName = document.getElementById('id_first_name').value
    var middleName = document.getElementById('id_middle_name').value
    var lastName = document.getElementById('id_last_name').value
    var employeeNumber = document.getElementById('id_employee_number').value
    var dateOfBirth = document.getElementById('id_date_of_birth').value
    var mobileNumber = document.getElementById('id_mobile_number').value
    var address = document.getElementById('id_address').value


    title.innerHTML = `New user: ${firstName} ${lastName}`
    // if(username == null || password == null || email == null || userLevel == null || firstName == null ||
    //     middleName == null || lastName == null || employeeNumber == null || dateOfBirth == null || mobileNumber == null || address == null ){
    //     body.innerHTML += `alert("Please fill up all required information.");`
    // }

    body.innerHTML += `
        <small class="text-muted">Please review all information before saving data.</small> <br/>
        Username: ${username} <br/>
        Password: ${passowrd} <br/>
        Email: ${email} <br/>
        Role: ${userLevel} <br/>
        First Name: ${firstName} <br/>
        Middle Name: ${middleName} <br/>
        Last Name: ${lastName} <br/>
        Gender: ${gender} <br/>
        Employee Number: ${employeeNumber}<br/>
        Date of Birth: ${dateOfBirth}<br/>
        Mobile Number: ${mobileNumber}<br/>
        Address: ${address}<br/>
    `


})
