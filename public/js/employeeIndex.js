console.log("Script loaded successfully!")

fetch('https://puzzle.mead.io/puzzle').then((response) => {

    response.json().then((data) => {
        console.log(data)
    })
})

const employeeFind = (id) => {
    fetch('http://localhost:3000/employee?id=' + id).then((response) => { //Sending req inside fetch fetch(req).then()
        response.json().then((data) => {
            if (data.error) {
                message2.textContent = ''
                return message1.textContent = data.error
            }
            message1.textContent = ''
            message2.textContent+='Employee Name:' + data.empName+'. '
            message2.textContent+= 'Salary:' + data.sal 
        })

        // response.json().then((data)=>{
        //     console.log(data)
        // })
    })
}

const employeeForm = document.querySelector('form')      //.querySelector targets the first element in the document
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

employeeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log(weatherForm.childNodes[1].value)
    message1.textContent = 'Loading...'
    message2.textContent = ''

    employeeFind(search.value)
})
