console.log("Script loaded successfully!")

fetch('https://puzzle.mead.io/puzzle').then((response) => {

    response.json().then((data) => {
        console.log(data)
    })
})

const locationForecast = (address) => {
    fetch('/weather?address=' + address).then((response) => { //Sending req inside fetch fetch(req).then()
        response.json().then((data) => {
            if (data.error) {
                message2.textContent = ''
                return message1.textContent = data.error
            }
            message1.textContent = ''
            message2.textContent+='Location:' + data.location+'. '
            message2.textContent+= 'Forecast:' + data.forecast 
        })

        // response.json().then((data)=>{
        //     console.log(data)
        // })
    })
}

const weatherForm = document.querySelector('form')      //.querySelector targets the first element in the document
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log(weatherForm.childNodes[1].value)
    message1.textContent = 'Loading...'
    message2.textContent = ''

    locationForecast(search.value)
})
