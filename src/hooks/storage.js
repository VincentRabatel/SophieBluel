// ---------------------------------- //
// localStorage get and store functions //
// ---------------------------------- //

const projectsStorageId = "projects";

// Return a list of all published projects from localStorage
export function getProjects(){
	const projectsJSON = window.localStorage.getItem(projectsStorageId);
	const projects = JSON.parse(projectsJSON);

    return projects;
}

// Store a new list of published projects in the localStorage
export function storeProjects(projects){
	window.localStorage.setItem(projectsStorageId, JSON.stringify(projects));
}

export function addNewProject(project){
	// TODO
}

// Return the first available id in the 'projects' array // => USELESS FOR NOW
export function getAvailableIdInProjects(){
	
	const projects = getProjects();

	for(let id = 1; id < projects.length + 1; id++){
		// If there is an available OR if we reach the end of the list
		if(id != projects[id].id - 1 || !projects[id]){
			//console.log("Available id is : " + parseInt(id + 1))
			return parseInt(id + 1);
		}
	}
}

// Return the first available id in the 'projectsEdited' array
export function getAvailableIdInProjectsEdited(){
	
	const projects = getProjectsEdited();

	for(let id = 1; id < projects.length + 1; id++){
		// If we reach the end of the list,
		// or there is an ID available
		if(!projects[id] || id != projects[id].id - 1){
			//console.log("Available id is : " + parseInt(id + 1))
			return parseInt(id + 1);
		}
	}
}

export function getCategoryName(id){
	// TODO
}

export function getCategoryId(name){
	//console.log("Testing all categories to find the if ID of category : " + name);
	const categories = getCategories();
	
	let categoryId;

	categories.forEach(category => {
		//console.log("Trying category : " + category.name + " and name " + name);
		if(category.name == name){
			categoryId = parseInt(category.id);
		}
	});

	return categoryId;
}

// TODO : Add a new category



const projectsEditedStorageId = "projectsEdited";

// Return a list of all projects of the Edit Mode (not yet published)
export function getProjectsEdited(){
	const projectsEditedJSON = window.localStorage.getItem(projectsEditedStorageId);
	const projectsEdited = JSON.parse(projectsEditedJSON);

    return projectsEdited;
}

// Store a new list of edited projects in the localStorage (not yet published)
export function storeProjectsEdited(projectsEdited){
	window.localStorage.setItem(projectsEditedStorageId, JSON.stringify(projectsEdited));
}



const categoriesStorageId = "categories";

// Return a list of all categories from the local Storage 
export function getCategories(){
	const categoriesJSON = window.localStorage.getItem(categoriesStorageId);
	const categories = JSON.parse(categoriesJSON);

    return categories;
}

// Store a new list of catgeories in the localStorage
export function storeCategories(categories){
	window.localStorage.setItem(categoriesStorageId, JSON.stringify(categories));
}



export function checkLogInStatus(){
	const logInStatus = window.localStorage.getItem("logInStatus");
	return logInStatus;
} 