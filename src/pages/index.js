// Check log in status
import * as storage from '../services/storage.js';
const logInStatus = storage.getLogInStatus();

// Initialization of the main gallery
import { initGallery, initFilters } from "../components/gallery.js";
await initGallery();
await initFilters();

// Initialization of 'Edit Mode' if user is logged in
import { initEditMode, openEditMode } from "../components/edit.js";
if (logInStatus){
    initEditMode();
    openEditMode();
}

// Initialization of the modal window if user is logged in
import { initModal } from "../components/modal.js";
if (logInStatus){
    initModal();
}