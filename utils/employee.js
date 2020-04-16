const request = require('request')

const employeeFinder = (empId, callback) => {
     const url = 'http://dummy.restapiexample.com/api/v1/employees'
     // console.log(process.argv[2])
     request({ url, json: true }, (error, response) => {
         // status = response.body.status
         // data = response.body.data
          // console.log(url)
          // console.log(status)
          // console.log(response.body)
          if(error){
               return callback("Error connecting to server (Wifi Issue)",undefined)
          }
         else if(response.body.status == 'failed'){
               return callback('No record found for employeeId '+empId,undefined)
         }
         else if(response.body.status == 'success'){
              const empArray = response.body.data
              const empData = empArray.find((emp)=>{
                  return emp.id==empId
              })
              if(empData){
                   return callback(undefined,empData)
              }
             callback('No record found for employeeId '+empId,undefined)
         }

     })

}

//Method Calling
//employeeFinder('112',(error,data)=>{    
employeeFinder('1',(error,{employee_name:name, employee_salary:sal}={})=>{    
     //Used destructuring i.e out of the total json, used on employee_name and employee_sal
     if(error){
          return console.log(error)
     }
     return console.log(name+'-----'+sal)

})




module.exports={
     employeeFinder:employeeFinder
}