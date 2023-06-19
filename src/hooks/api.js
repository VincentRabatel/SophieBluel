// -------------------------- //
// API get and post functions //
// -------------------------- //

export async function getProject(projectId){
	// TODO ?
}

// Fetch all projects from API
export async function getProjects(){
	//console.log("Fetching projects form the API...");
	const projectsResponse = await fetch("http://localhost:5678/api/works");
	const projects = await projectsResponse.json(); //console.log(projects);
	
	return projects;
}

export async function postProject(project){
	console.log("Posting the new project number " + project.id + " to the API");
	
	const postProjectResponse = await fetch("http://localhost:5678/api/works", {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': ''
		},
		body: JSON.stringify(project)
	});

	console.log(postProjectResponse);
}

export async function deleteProject(projectId){
	console.log("Delete the project number " + projectId + " from the API");

	const projectIdAsInt = parseInt(projectId); console.log(projectIdAsInt)
	const deleteProjectResponse = await fetch("http://localhost:5678/api/works/" + projectIdAsInt, {
		method: 'DELETE',
		headers: {
			'Authorization': ''
		}
	});

	console.log(deleteProjectResponse);
}

export async function getCategory(categoryId){
	// TODO ?
}

// Fetch all categories from API
export async function getCategories(){
	//console.log("Fetching categories form the API...");
	const categoriesResponse = await fetch("http://localhost:5678/api/categories");
	const categories = await categoriesResponse.json(); //console.log(categories);

	return categories;
}

// Fetch log in response from API depending of log in info
export async function postLogInInfo(logInInfo){
	//console.log("Trying to log in...");
	const logInResponse = await fetch("http://localhost:5678/api/users/login", {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(logInInfo)
	});

	return logInResponse;
}