
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

function popModal(){
    var addnewstaff = document.getElementById('staffcreationmodal')

    var email = document.getElementById('id_email').value
    var userLevel = document.getElementById('id_user_level').value
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


        if( email == null || email == '' || userLevel == null || userLevel == '' ||
            firstName == null || firstName == '' || lastName == null || lastName == '' ||
             employeeNumber == null || employeeNumber == '' || mobileNumber == null || mobileNumber == '' || address == null || address == '' ){
            title.innerHTML = "Invalid!"
            body.innerHTML = "Please provide all needed information."

        }else{
            title.innerHTML = `New User: ${firstName} ${lastName}`
            body.innerHTML += `
            <small class="text-muted">Please review all information before saving data. The username and password for this account will be sent to the email provided below.</small> <br/>
            <div class="container">
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

    try{
        var usercreationform = document.getElementById('userform')
        usercreationform.addEventListener('submit', function(e){

        e.preventDefault()
        var url = "/accounts/api/user/profile/create/"

        fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                // check raw data tab on api for format
                    'user': {
                        'password': null,
                        'email':email,
                        'userlevel': userLevel ,
                    },
                    'gender': gender,
                    'first_name': firstName,
                    'middle_name': middleName,
                    'last_name': lastName,
                    'employee_number': employeeNumber,
                    'mobile_number': mobileNumber,
                    'dob_month': month,
                    'dob_day': day,
                    'dob_year': year,
                    'address': address,
                })

            }).then(response => {
                return response.json()
            }).then(data=> {
                console.log(data)
            })
        e.target.reset()
    })
    }catch(error){
        console.log(error)
    }
}


function saveUser(){
    var form = document.getElementById('userform')
    form.dispatchEvent(new Event('submit'));
}



