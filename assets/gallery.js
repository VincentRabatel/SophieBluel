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
const filtersElement = document.querySelector("#filters");



/************************** PROJECTS **************************/
const projectsResponse = await fetch("http://localhost:5678/api/works");
const projects = await projectsResponse.json(); //console.log(projects);
let displayedProjects = projects;

function generateGallery(projects){
	for(let project of projects){
		createProjectElement(project);
	}
}

generateGallery(projects);
/****************************************************************/



// Get rid of everything in the gallery
function emptyGallery() {
	gallery.innerHTML = "";
}

// Update the gallery with a new array of projects
function updateGallery(projects) {
	for(let project of displayedProjects){
		createProjectElement(project);
	}
}

// Create a project HTML element
function createProjectElement(project){
	// Create HTML
	const newProjectElement = document.createElement('figure');
	const newProjectElementImg = document.createElement('img');
	const newProjectElementCaption = document.createElement('figcaption');

	newProjectElementImg.src = project.imageUrl;
	newProjectElementCaption.innerHtml = project.title;

	newProjectElement.appendChild(newProjectElementImg, newProjectElementCaption);

	galleryElement.appendChild(newProjectElement);
}


/************************** CATEGORIES **************************/
const categoriesResponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesResponse.json(); //console.log(categories);
const filters = [];


/*************** SPECIFIC CASE FOR 'Tous' filter **************/
/***************     TRY TO CLEAN THIS LATER     **************/
const filterAll = document.querySelector("#filter-0");
filterAll.addEventListener('click', function(){
	filterGallery(0);
}, false);

filters.push(filterAll); //console.log(filterAll); console.log(filters);
/**************************************************************/


function generateFilters(categories){
	for(let category of categories){
		const filter = createFilterButton(category.id, category.name); //console.log(filter);
		filters.push(filter);
	}
}

generateFilters(categories);
/****************************************************************/


function createFilterButton(id, name){
	console.log("Adding filter button for category named \" " + name+ "\" with the id " + id);

	// Create HTML
	const newFilterButtonElement = document.createElement('input');
	newFilterButtonElement.id = "filter-" + id.toString();
	newFilterButtonElement.type = "button";
	newFilterButtonElement.value = name;

	// Add CSS
	newFilterButtonElement.classList.add("filter");
	
	// Add event listnener
	newFilterButtonElement.addEventListener('click', function(){
		filterGallery(id);
	}, false);

	filtersElement.appendChild(newFilterButtonElement);

	return newFilterButtonElement;
}


// This function is called when clicking on a filter button
function filterGallery(filterCategoryId){
	displayedProjects = [];

	if(filterCategoryId === 0) {
		console.log("Filtering the gallery with all projects");

		displayedProjects = projects;

	} else {
		console.log("Filtering the gallery with projects of the category \"" + categories[filterCategoryId - 1].name + "\" with the id " + categories[filterCategoryId - 1].id);

		for(let project of projects){
			//console.log("Trying the project named \"" + project.title + "\" with the id " + project.categoryId );
			
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
	for(let i = 0; i <= filters.length - 1; i++){
		//console.log("Updading the button with the id " + i + " compared to selected id of " + selectedID);
		let filter = document.getElementById("filter-" + i.toString());

		if(i == selectedID){
			filter.classList.add("selected");
		} else {
			filter.classList.remove("selected");
		}
	}
}