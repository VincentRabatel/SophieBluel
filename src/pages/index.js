// Initialization of the main gallery
import { initGallery } from "../components/gallery.js";
initGallery();

// Check log in status
import { checkLogInStatus } from "../components/edit.js";
const logInStatus = checkLogInStatus();

// Initialization of 'Edit Mode' if user is logged in
import { initEditMode } from "../components/edit.js";
if (logInStatus){
    initEditMode();
}

// Initialization of the modal window if user is logged in
import { initModal } from "../components/modal.js";
if (logInStatus){
    initModal();
}