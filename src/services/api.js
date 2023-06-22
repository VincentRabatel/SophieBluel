// -------------------------- //
// API get and post functions //
// -------------------------- //

import { Project } from '../data/project.js';
import { Category } from '../data/category.js';

import * as storage from './storage.js';

// Fetch all projects from API
export async function getProjects(){
	console.log("API : Fetching projects form the API...");

	const projectsResponse = await fetch("http://localhost:5678/api/works");
	const projectsJSON = await projectsResponse.json();
	
	const projects = [];

	projectsJSON.forEach(project => {
		// Create the 'project' object      
		project = new Project(
			project.id,
			project.title,
			project.imageUrl,
			project.categoryId,
			project.userId,
			new Category(
				project.category.id,
				project.category.name
			)
		);

		// Add the 'project' to the array storing all projects
		projects.push(project);
	});

	return projects;
}

// Fetch all categories from the database
export async function getCategories(){
	console.log("API : Fetching categories form the API...");

	const categoriesResponse = await fetch("http://localhost:5678/api/categories");
	const categoriesJSON = await categoriesResponse.json();

	const categories = [];

	categoriesJSON.forEach(category => {
		// Create the 'category' object
		category = new Category(
			category.id,
			category.name
		)
		
		// Add the 'category' to the array storing all categories
		categories.push(category);
	});

	return categories;
}

// Add a project to the database
export async function postProject(project){
	console.log("API : Posting the new project number " + project.id + " to the API");

	// Create a blob storing the project's image 
	const imageBlob = await fetch(project.imageUrl).then(r => r.blob());

	// Create a form date to be send as the body of the fetch()
	const projectData  = new FormData();

	projectData.append("image", imageBlob);
	projectData.append("title", project.title);
	projectData.append("category", project.categoryId);

	// Get log in info to be able to use the auth token in the fetch()
	const logInInfo = storage.getLogInInfos();

	const postProjectResponse = await fetch("http://localhost:5678/api/works", {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + logInInfo.token
		},
		body: projectData
	});

	console.log(postProjectResponse);
}

// Delete a project from the database
export async function deleteProject(projectId){
	console.log("API : Delete the project number " + projectId + " from the API");

	// Get log in info to be able to use the auth token in the fetch()
	const logInInfo = storage.getLogInInfos();

	const deleteProjectResponse = await fetch("http://localhost:5678/api/works/" + projectId, {
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + logInInfo.token
		}
	});

	console.log(deleteProjectResponse);
}

// Fetch log in response from API depending of log in form
export async function postLogInInfo(logInInfo){
	console.log("API : Trying to log in...");

	const logInResponse = await fetch("http://localhost:5678/api/users/login", {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(logInInfo)
	});

	return logInResponse;
}


// ------- //
// Backlog //
// ------- //

/*
export async function getProject(projectId){

}

export async function getCategory(categoryId){

}

*/