// Check log in status
import * as storage from '../services/storage.js';
const logInStatus = storage.checkLogInStatus();

// Initialization of the main gallery
import { initGallery, initFilters } from "../components/gallery.js";
await initGallery();
await initFilters();

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