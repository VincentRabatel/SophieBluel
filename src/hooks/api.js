// -------------------------- //
// API get and post functions //
// -------------------------- //

export async function getProject(projectID){
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
	// TODO
}

export async function getCategory(categoryID){
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

	//console.log(logInResponse);

	return logInResponse;
}