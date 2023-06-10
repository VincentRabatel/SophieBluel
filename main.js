// Initialization of the main gallery
import { initGallery } from "./assets/gallery.js";
initGallery();

// Check log in status
const logInStatus = checkLogInStatus();

// Initialization of 'Edit Mode' if user is logged in
import { checkLogInStatus, initEditMode, initModal } from "./assets/edit.js";
if (logInStatus){
    initEditMode();
    initModal();
}