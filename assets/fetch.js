// --------------------- //
// API related functions //
// --------------------- //

// Fetch all projects from API
export async function getProjectsFromAPI(){
	//console.log("Fetching projects form the API...");
	const projectsResponse = await fetch("http://localhost:5678/api/works");
	const projects = await projectsResponse.json(); //console.log(projects);
	
	return projects;
}

// Fetch all categories from API
export async function getCategoriesFromAPI(){
	//console.log("Fetching categories form the API...");
	const categoriesResponse = await fetch("http://localhost:5678/api/categories");
	const categories = await categoriesResponse.json(); //console.log(categories);

	return categories;
}

// Fetch log in response from API depending of log in info
export async function postLogInInfo(logInInfo){

	const logInResponse = await fetch("http://localhost:5678/api/users/login", {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(logInInfo)
	});

	return logInResponse;
}


// ------------------------------ //
// localStorage related functions //
// ------------------------------ //

// Get the 'projects' array from the local storage
// Return a list of all published projects
export function getProjects(){
	const projectsJSON = window.localStorage.getItem("projects");
	const projects = JSON.parse(projectsJSON);

    return projects;
}

// Get the 'projectsDisplayed' array from the local storage
// Return a list of all displayed projects in the main gallery (a filter is applied)
export function getProjectsDisplayed(){
	const projectsDisplayedJSON = window.localStorage.getItem("projectsDisplayed");	//	To do : rename displayedProject to
	const projectsDisplayed = JSON.parse(projectsDisplayedJSON);					// projectsDisplayed in gallery.js

    return projectsDisplayed;
}

// Get the 'projectsEditMode' array from the local storage
// Return a list of all projects in the Edit Mode (not yet published)
export function getProjectsEditMode(){
	const projectsEditModeJSON = window.localStorage.getItem("projectsEditMode");
	const projectsEditMode = JSON.parse(projectsEditModeJSON);

    return projectsEditMode;
}
	