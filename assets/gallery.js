// Create empty array for all projects
let projects = [];

fetchProjects();

function fetchProjects(){
    fetch("http://localhost:5678/api/works").then(
        response => response.json().then(
            data => {
                // TODO => Re-write this loop with 'for... of'
                for (let i = 0; i < data.length; i++){
                    let newCategory = new Category(data[i].category.id, data[i].category.name);
                    let newProject = new Project(data[i].id, data[i].title, data[i].imageUrl, data[i].categoryId, data[i].userId, newCategory);
    
                    //console.log("Current project is :"); console.log(newProject);
    
                    projects.push(newProject);
                }
    
                console.log("Array of projects :"); console.log(projects);
                
                // TODO => Re-write this loop with 'for... of'
                for (let i = 0; i < projects.length; i++){
                    createProjectDiv(projects[i]);
                }
            }
        )
    )
}


// Get buttons
const filterAll = document.getElementById("filter-all");
const filterObjects = document.getElementById("filter-objects");
const filterApartments = document.getElementById("filter-apartments");
const filterHostels = document.getElementById("filter-hostels");

// Create events
let currentFilterValue = "Tous";

filterAll.addEventListener('click', function(){
  currentFilterValue = "Tous";
  updatefilters(currentFilterValue);
}, false);

filterObjects.addEventListener('click', function(){
  currentFilterValue = "Objets";
  updatefilters(currentFilterValue);
}, false);

filterApartments.addEventListener('click', function(){
  currentFilterValue = "Appartements";
  updatefilters(currentFilterValue);
}, false);

filterHostels.addEventListener('click', function(){
  currentFilterValue = "Hotels & restaurants";
  updatefilters(currentFilterValue);
}, false);


function updatefilters(filterValueUpdated){
  console.log(filterValueUpdated);
}

// function fetchCategrories(){
//   fetch("http://localhost:5678/api/categories").then(
//     response => response.json().then(
//       catagories => {

//       }
//     )
//   )
// }

// Get gallery main div
const gallery = document.getElementById('gallery');

// Create a div with given project values
function createProjectDiv(project){
    newProject = document.createElement('figure');
    newProjectImg = document.createElement('img');
    newProjectCaption = document.createElement('figcaption');
        
    newProjectImg.src = project.imageUrl;
    newProjectCaption.innerHtml = project.title; 
    newProject.appendChild(newProjectImg, newProjectCaption);

    gallery.appendChild(newProject);
    
    //console.log(newProject);
}

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







// Save // Fill galery with data from backend API
/*
fetch("http://localhost:5678/api/works")
    .then((response) => 
        response.json().then((data) => {
            console.log(data);

            for (let i = 0; i < data.length; i++){
                console.log(data[i]);

                project = document.createElement('figure');
                projectImg = document.createElement('img');
                projectCaption = document.createElement('figcaption');
                        
                projectImg.src = data[i].imageUrl;
                projectCaption.innerHtml = data[i].title; 
                project.appendChild(projectImg, projectCaption);
            
                gallery.appendChild(project);
            }
        })
    )
*/

// Debug with local array
/*
const projects = [
    {
      "id": 1,
      "title": "Abajour Tahina",
      "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
      "categoryId": 1,
      "userId": 1,
      "category": {
        "id": 1,
        "name": "Objets"
      }
    },
    {
      "id": 2,
      "title": "Appartement Paris V",
      "imageUrl": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 3,
      "title": "Restaurant Sushisen - Londres",
      "imageUrl": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
      "categoryId": 3,
      "userId": 1,
      "category": {
        "id": 3,
        "name": "Hotels & restaurants"
      }
    },
    {
      "id": 4,
      "title": "Villa “La Balisiere” - Port Louis",
      "imageUrl": "http://localhost:5678/images/la-balisiere1651287350102.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 5,
      "title": "Structures Thermopolis",
      "imageUrl": "http://localhost:5678/images/structures-thermopolis1651287380258.png",
      "categoryId": 1,
      "userId": 1,
      "category": {
        "id": 1,
        "name": "Objets"
      }
    },
    {
      "id": 6,
      "title": "Appartement Paris X",
      "imageUrl": "http://localhost:5678/images/appartement-paris-x1651287435459.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 7,
      "title": "Pavillon “Le coteau” - Cassis",
      "imageUrl": "http://localhost:5678/images/le-coteau-cassis1651287469876.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 8,
      "title": "Villa Ferneze - Isola d’Elba",
      "imageUrl": "http://localhost:5678/images/villa-ferneze1651287511604.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 9,
      "title": "Appartement Paris XVIII",
      "imageUrl": "http://localhost:5678/images/appartement-paris-xviii1651287541053.png",
      "categoryId": 2,
      "userId": 1,
      "category": {
        "id": 2,
        "name": "Appartements"
      }
    },
    {
      "id": 10,
      "title": "Bar “Lullaby” - Paris",
      "imageUrl": "http://localhost:5678/images/bar-lullaby-paris1651287567130.png",
      "categoryId": 3,
      "userId": 1,
      "category": {
        "id": 3,
        "name": "Hotels & restaurants"
      }
    },
    {
      "id": 11,
      "title": "Hotel First Arte - New Delhi",
      "imageUrl": "http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png",
      "categoryId": 3,
      "userId": 1,
      "category": {
        "id": 3,
        "name": "Hotels & restaurants"
      }
    }
  ]
*/

// Debug base for filling gallery
/*
for (let i = 0; i < projects.length; i++) {
    project = document.createElement('figure');
    projectImg = document.createElement('img');
    projectCaption = document.createElement('figcaption');


    projectImg.src = projects[i].imageUrl;
    projectCaption.innerHtml = projects[i].title; 
    project.appendChild(projectImg, projectCaption);

    gallery.appendChild(project);
}
*/

// Test to create element
/*
project = document.createElement('figure');
projectImg = document.createElement('img');
projectCaption = document.createElement('figcaption');

projectImg.src = "./assets/images/abajour-tahina.png";
projectCaption.innerHtml = "Abajour Tahina"; 
project.appendChild(projectImg, projectCaption);

gallery.appendChild(project);
*/