import * as api from '../services/api.js'
import * as storage from '../services/storage.js';

// Get logIn form HTML element
const logInForm = document.querySelector(".login-form"); // console.log(logInForm);

// Add event listener to log in form
logInForm.addEventListener("submit", function (event) {
    // Disable default behaviour of the web browser
    event.preventDefault();

    // Create the userInfo object from the form
    const logInInfo = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };

    logInSubmit(logInInfo); //console.log(logInInfo);
});

async function logInSubmit(logInInfo){
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(logInInfo)
    });
   
    switch(response.status){
        // STATUS == Connected
        case 200 :
            // Create a reader te read the response as ReadableStream
            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
        
            let responseInfo;
        
            // Wait for the ReadableStream to be fully read befor to continue
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
        
                responseInfo = JSON.parse(value);
        
                console.log("Received", responseInfo);
            }

            // Store log in info in the local storage
            // TODO : write dedicated functions in storage.js
            // TODO : use the now stored .userId everywhere needed
            storage.storeLogInStatus(true);
            storage.storeLogInInfos(responseInfo);

            // Back to the main page
            window.location = "index.html";
        break;
    
        // STATUS == Not authorized
        case 401 :
            window.alert("Not Authorized");
        break;
        
        // STATUS == User not found
        case 404 :
            window.alert("User not found");
        break;
    }
}