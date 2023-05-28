// Get HTML elements
const editButtonElement = document.querySelector(".edit-button"); console.log(editButtonElement);
const publishButtonElement = document.querySelector(".publish-button"); console.log(publishButtonElement);

editButtonElement.addEventListener('click', function(){
    console.log("Edit button clicked !");
}, false);

publishButtonElement.addEventListener('click', function(){
    console.log("Publish button clicked !");
}, false);