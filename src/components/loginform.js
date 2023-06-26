import * as api from '../services/api.js'
import * as storage from '../services/storage.js';

export function initLogInForm(){
    // Get logIn form HTML element
    const logInForm = document.querySelector(".login-form");

    // Add event listener to log in form
    logInForm.addEventListener("submit", function (event) {
        // Disable default behaviour of the web browser
        event.preventDefault();

        // Create the logInInfo object from the form
        const logInInfo = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };

        submitLogInForm(logInInfo);
    });
}

async function submitLogInForm(logInInfo){
    const response = await api.postLogInInfo(logInInfo);
   
    switch(response.status){
        // STATUS == Connected
        case 200 :
            // Create a reader to read the response as ReadableStream
            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
        
            let responseInfo;
        
            // Wait for the ReadableStream to be fully read before to continue
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
        
                responseInfo = JSON.parse(value);
            }

            // Store log in info in the local storage
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