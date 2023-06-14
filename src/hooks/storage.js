// ----------------------------------- //
// localStorage get and post functions //
// ----------------------------------- //

// Get the 'projects' array from the local storage
// Return a list of all published projects
export function getProjectsFromStorage(){
	const projectsJSON = window.localStorage.getItem("projects");
	const projects = JSON.parse(projectsJSON);

    return projects;
}

// Get the 'projectsDisplayed' array from the local storage
// Return a list of all displayed projects in the main gallery (a filter might be is applied)
export function getProjectsDisplayedFromStorage(){
	const projectsDisplayedJSON = window.localStorage.getItem("projectsDisplayed");     // To do : rename displayedProject to
	const projectsDisplayed = JSON.parse(projectsDisplayedJSON);					    // projectsDisplayed in other js scripts

    return projectsDisplayed;
}

// Get the 'projectsEdited' array from the local storage
// Return a list of all projects of the Edit Mode (not yet published)
export function getProjectsEditedFromStorage(){
	const projectsEditedJSON = window.localStorage.getItem("projectsEdited");	        // To do : rename projectsEditMode to
	const projectsEdited = JSON.parse(projectsEditedJSON);                               // projectsEdited in other js scripts

    return projectsEdited;
}