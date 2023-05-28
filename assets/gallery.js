// Category class
class Category {
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

// Project class
class Project {
    constructor(id, title, imageUrl, categoryId, userId, category) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
        this.userId = userId;
        this.category = category;
    }
}

/************************** PROJECTS **************************/
const response = await fetch("http://localhost:5678/api/works");  
const projects = await response.json();
const displayedProjects = projects;

updateGallery(displayedProjects);

// Get gallery main div
const gallery = document.getElementById('gallery');

// Get rid of everything in the gallery
function emptyGallery() {
	gallery.innerHTML = "";
}

// Updade the gallery with a new array of projects
function updateGallery(projects){
	for(let project of projects){
		createProjectDiv(project);
	}
}

// Create a div with given project values
function createProjectDiv(project){
	// Create HTML
	newProjectElement = document.createElement('figure');
	newProjectElementImg = document.createElement('img');
	newProjectElementCaption = document.createElement('figcaption');

	newProjectElementImg.src = project.imageUrl;
	newProjectElementCaption.innerHtml = project.title;

	newProjectElement.appendChild(newProjectElementImg, newProjectElementCaption);

	gallery.appendChild(newProjectElement);
}


/************************** CATEGORIES **************************/

// Create empty array for all categories
let categories = [];

fetchCategories();

function fetchCategories(){
	fetch("http://localhost:5678/api/categories").then(
		response => response.json().then(
			data => {
				// Looping through backend data to get all categories 
				let fetchCategories = [];
				for (let i = 0; i < data.length; i++){
					let newCategory = new Category(data[i].id, data[i].name);

					fetchCategories.push(newCategory);
				}

				console.log("Array of all categories :"); console.log(fetchCategories);

				// Update global array with backend data
				categories = fetchCategories;

				// Update the filters container for the first time
				createFiltersButtons();
			}
		)
	)
}



/*************** SPECIFIC CASE FOR 'Tous' filter **************/
/***************     TRY TO CLEAN THIS LATER     **************/
const filterAll = document.getElementById("filter-all");

filterAll.addEventListener('click', function(){
	currentFilterValue = "Tous";
	filterGallery(0);
}, false);
/**************************************************************/
/**************************************************************/


// Create empty array for all filter buttons 
let allFilterButtons = [];

// Get filters main div
const filtersContainer = document.getElementById("filters");

// For each categories we create a new filter button
function createFiltersButtons() {
	for(let category of categories){
		let btn = createFilterButton(category.id, category.name);
		allFilterButtons.push(btn);
	}
}

function createFilterButton(id, name){
	// Create HTML button
	newFilterButtonElement = document.createElement('input');
	newFilterButtonElement.id = "filter-" + id.toString();
	newFilterButtonElement.type = "button";
	newFilterButtonElement.value = name;

	// Add CSS
	newFilterButtonElement.classList.add("filter");
	
	// Add event listnener
	newFilterButtonElement.addEventListener('click', function(){
		filterGallery(id);
	}, false);

	console.log("Adding filter button for categroy named \" " + name+ "\"");
	filtersContainer.appendChild(newFilterButtonElement);

	return newFilterButtonElement;
}


// This function is called when clicking on a filter button
function filterGallery(filterCategoryId){
	console.log("Filtering gallery with objects of the category \"" + "..." + "\" with the id " + filterCategoryId);

	displayedProjects = [];

	if(filterCategoryId === 0) {
		displayedProjects = allProjects;

	} else {
		for(let project of allProjects){
			//console.log("Trying the project named " + project.title + " with the id " + project.categoryId);
			
			if(project.categoryId == filterCategoryId){
				displayedProjects.push(project);
			}
		}
	}

	updateFilterButtonsColor(filterCategoryId);

	emptyGallery();
	updateGallery(displayedProjects);
}

function updateFilterButtonsColor(selectedID){
	for(let i = 1; i <= allFilterButtons.length; i++){
		console.log("Updading the button with the id " + i + " compared to selected id of " + selectedID);
		let btn = document.getElementById("filter-" + i.toString());

		if(i == selectedID){
			btn.classList.add("selected");
		} else {
			btn.classList.remove("selected");
		}
	}
}


/****************************** SAVE *****************************/

/*
// Create empty array for all projects
//let projects = [];

// Create empty array for projects to display
let displayedProjects = [];

fetchAllProjects();

// Fetch all projects from backend and update the gallery for the first time
function fetchAllProjects() {
	fetch("http://localhost:5678/api/works").then(
		response => response.json().then(
			data => {
				// Looping through backend data to get all the projects 
				let fetchedProjects = [];
				for (let i = 0; i < data.length; i++){
					let newCategory = new Category(data[i].category.id, data[i].category.name);
					let newProject = new Project(data[i].id, data[i].title, data[i].imageUrl, data[i].categoryId, data[i].userId, newCategory);

					fetchedProjects.push(newProject);
				}

				console.log("Array of all projects :"); console.log(fetchedProjects);

				// Update global arrays with backend data
				allProjects = fetchedProjects;
				displayedProjects = allProjects;

				// Update the gallery for the first time
				updateGallery(displayedProjects);
			}
		)
	)   
}
*/