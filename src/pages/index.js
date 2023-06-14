// Initialization of the main gallery
import { initGallery } from "../components/gallery.js";
initGallery();

// Check log in status
import { checkLogInStatusFromStorage } from "../hooks/storage.js";
const logInStatus = checkLogInStatusFromStorage();

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