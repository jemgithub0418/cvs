var selectPeriod = document.getElementById('id_period');

selectPeriod.addEventListener('change', function(){
    var userId = document.getElementById('id-holder');

    // get grades of current student
    fetch(`/accounts/api/student/grade/${userId.getAttribute('data-id')}/`, {
        method: "GET",
    })
    .then((resp) => resp.json())
    .then(function(data){
        console.log(data)
        // this is where i input the table
        var gradeDiv = document.getElementById('grade-div');
        gradeDiv.innerHTML = ""

        // create table
        var gradeTable = document.createElement('table');
        gradeTable.classList.add('table','table-striped');

        // creating table heading
        var rowHeading = document.createElement('thead')
        rowHeading.id = "row-heading"

        // create row for theading
        var trForHeading = document.createElement('tr')

        for(i = 0; i < 4; i++){
            var thForHeading = document.createElement('th')

            if(i == 0){
                thForHeading.innerText = "Subject"
                thForHeading.scope = "col"
                trForHeading.append(thForHeading)
            }
            else if(i == 1 ){
                thForHeading.innerText = "Subject Code"
                thForHeading.scope = "col"
                trForHeading.append(thForHeading)
            }
            else if(i == 2 ){
                thForHeading.innerText = "Units"
                thForHeading.scope = "col"
                trForHeading.append(thForHeading)
            }
            else if(i == 3 ){
                thForHeading.innerText = "Grade"
                thForHeading.scope = "col"
                trForHeading.append(thForHeading)
            }
        }
        // appending headers made above
        gradeDiv.append(gradeTable)
        gradeTable.append(rowHeading)
        rowHeading.append(trForHeading)

        // create body of table and append to table
        var tableBody = document.createElement('tbody')
        tableBody.id = 'table-body'

        gradeTable.append(tableBody)


        for(i = 0; i < data.length; i++){
            if(selectPeriod.value == data[i].period.id){

                // create row and append to table body
                var trForBody = document.createElement('tr')
                tableBody.append(trForBody)

                // inserting of data on each row
                var tdSubjectName = document.createElement('td')
                tdSubjectName.innerText = data[i].subject.subject_name
                trForBody.append(tdSubjectName)

                var tdSubjectCode = document.createElement('td')
                tdSubjectCode.innerText = data[i].subject.subject_code
                trForBody.append(tdSubjectCode)

                var tdUnit = document.createElement('td')
                tdUnit.innerText = data[i].subject.unit
                trForBody.append(tdUnit)

                var tdGrade = document.createElement('td')
                tdGrade.innerText = data[i].grade
                if(parseFloat(data[i].grade) < 75){
                    trForBody.style.backgroundColor = "rgb(255 38 38 / 91%)";
                }
                // warning for failing
                if(parseFloat(data[i].grade) < 80 && parseFloat(data[i].grade) >=75 ){
                    trForBody.style.backgroundColor = "rgb(253 159 3 / 70%)"
                }
                // passed
                if(parseFloat(data[i].grade) > 79){
                    trForBody.style.backgroundColor = "#16ca76"
                }
                trForBody.append(tdGrade)

            }
            else if(selectPeriod.selectedIndex == 0){
                gradeDiv.innerHTML = "Select a school period."
            }
            // else{
            //     gradeDiv.innerHTML = "No available grades yet."
            // }
        }

    })

})

