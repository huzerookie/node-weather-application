console.log("Script loaded successfully!")

const loginPatootie = (usernameValue, passwordValue) => {
   if(usernameValue == 'admin' && passwordValue == '1234'){
    window.location.href = '/cutie-patootie?username='+usernameValue
   } 
   else{
    invalidMessage.textContent = 'Invalid Username/Password'
   }
   
    

}

const patootieForm = document.querySelector('form')      //.querySelector targets the first element in the document
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const invalidMessage = document.querySelector('#invalidMessage')


patootieForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log(weatherForm.childNodes[1].value)
    invalidMessage.textContent = ''

    loginPatootie(username.value, password.value)
})
