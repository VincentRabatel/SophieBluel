// -------------------------- //
// API get and post functions //
// -------------------------- //

import { Project } from '../data/project.js';
import { Category } from '../data/category.js';

import * as storage from './storage.js';

// Fetch all projects from API
export async function getProjects(){
	console.trace("API : Fetching projects form the API...");

	const projects = [];

	try{
		const projectsResponse = await fetch("http://localhost:5678/api/works");
		const projectsJSON = await projectsResponse.json();

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
	
	} catch (error) {
		// Failed to fetch the projects
		window.alert('There was an error while loading projects, please reload the page', error);
	}

	return projects;
}

// Fetch all categories from the database
export async function getCategories(){
	console.trace("API : Fetching categories form the API...");

	const categories = [];

	try {
		const categoriesResponse = await fetch("http://localhost:5678/api/categories");
		const categoriesJSON =  await categoriesResponse.json();
	
		categoriesJSON.forEach(category => {
			// Create the 'category' object
			category = new Category(
				category.id,
				category.name
			)
			
			// Add the 'category' to the array storing all categories
			categories.push(category);
		});
	
	} catch (error) {
		// Failed to fetch the categories
		window.alert('There was an error while loading categories, please reload the page', error);
	}

	return categories;
}

// Add a project to the database
export async function postProject(projectData){
	console.trace("API : Posting a new project to the API");

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
	console.trace("API : Delete the project number " + projectId + " from the API");

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
	console.trace("API : Trying to log in...");

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