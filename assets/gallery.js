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

// Get HTML elements
const galleryElement = document.querySelector("#gallery");
const filtersElement = document.getElementById("filters");


/************************** PROJECTS **************************/
const response = await fetch("http://localhost:5678/api/works"); console.log(response);
const projects = await response.json(); console.log(projects);
const displayedProjects = projects; console.log(displayedProjects);

function generateGallery(projects){
	for(let project of projects){
		createProjectElement(project);
	}
}

generateGallery(projects);

// Get rid of everything in the gallery
function emptyGallery() {
	gallery.innerHTML = "";
}

// Update the gallery with a new array of projects
function updateGallery(projects) {
	// rework todo
}

// Create a project HTML element
function createProjectElement(project){
	const newProjectElement = document.createElement('figure');
	const newProjectElementImg = document.createElement('img');
	const newProjectElementCaption = document.createElement('figcaption');

	newProjectElementImg.src = project.imageUrl;
	newProjectElementCaption.innerHtml = project.title;

	newProjectElement.appendChild(newProjectElementImg, newProjectElementCaption);

	galleryElement.appendChild(newProjectElement);
}


/************************** CATEGORIES **************************/
// Create empty array for all categories
let categories = [];

//fetchCategories();

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
	filtersElement.appendChild(newFilterButtonElement);

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