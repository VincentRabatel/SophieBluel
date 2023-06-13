// Initialization of the main gallery
import { initGallery } from "./assets/gallery.js";
initGallery();

// Check log in status
const logInStatus = checkLogInStatus();

// Initialization of 'Edit Mode' if user is logged in
import { checkLogInStatus, initEditMode } from "./assets/edit.js";
import { initModal } from "./assets/modal.js";
if (logInStatus){
    initEditMode();
    initModal();
}