const passwordValidator = (username, password)=>{
    if(username=='admin' && password=='1234'){
        return true
    }
}

module.exports={
    passwordValidator:passwordValidator
}