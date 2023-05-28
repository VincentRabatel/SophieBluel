const logInForm = document.querySelector(".login-form"); // console.log(logInForm);

logInForm.addEventListener("submit", function (event) {
    // Disable default behaviour of the web browser
    event.preventDefault();

    // Create the userInfo object from the form
    const logInInfo = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };

    logIn(logInInfo); //console.log(logInInfo);
});

async function logIn(logInInfo){

    const logInResponse = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(logInInfo)
    });
    
    switch(logInResponse.status){
        case 200 :
            console.log("LOGIN: Connected");
        break;
    
        case 401 :
            console.log("LOGIN: Not Authorized");
        break;
    
        case 404 :
            console.log("LOGIN: User not found");
        break;
    }
}

// let user = {
//     email: 'sophie.bluel@test.tld',
//     password: 'S0phie'
// };