// Get edit mode HTML elements and create event listeners
const editButtonElement = document.querySelector(".edit-button"); console.log(editButtonElement);
const publishButtonElement = document.querySelector(".publish-button"); console.log(publishButtonElement);


editButtonElement.addEventListener('click', function(){
    //console.log("Edit button clicked !");
    const modal = document.querySelector(".modal-container");
    showElement(modal);
}, false);

publishButtonElement.addEventListener('click', function(){
    console.log("Publish button clicked !");
}, false);

// Get modal HTML elements and create event listeners
const closeButtonElement = document.querySelector(".close-button"); console.log(closeButtonElement);
const backButtonElement = document.querySelector(".back-button"); console.log(backButtonElement);

closeButtonElement.addEventListener('click', function(){
    //console.log("Close button clicked !");
    const modal = document.querySelector(".modal-container");
    hideElement(modal);
}, false);

backButtonElement.addEventListener('click', function(){
    console.log("Back button clicked !");
}, false);


function showElement(element){
    element.classList.remove("edit-hidden");
}

function hideElement(element){
    element.classList.add("edit-hidden");
}