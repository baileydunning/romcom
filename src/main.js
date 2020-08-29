// Create variables targetting the relevant DOM elements here 👇
var coverTitle = document.querySelector('.cover-title');
var coverImage = document.querySelector('.cover-image');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');

var randomizeButton = document.querySelector('.random-cover-button');
var makeNewButton = document.querySelector('.make-new-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var homeButton = document.querySelector('.home-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var createNewBookButton = document.querySelector('.create-new-book-button');

var homeView = document.querySelector('.home-view');
var formView = document.querySelector('.form-view');
var savedView = document.querySelector('.saved-view');
var savedCoversSection = document.querySelector('.saved-covers-section');
var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDesc1 = document.querySelector('.user-desc1');
var userDesc2 = document.querySelector('.user-desc2');

// We've provided a few variables below
var savedCovers = [];
var currentCover;
var randomCover = getRandomIndex(covers);

// Add your event listeners here 👇
window.addEventListener("load", createRandomCover);
randomizeButton.addEventListener("click", createRandomCover);
makeNewButton.addEventListener("click", showForm);
viewSavedButton.addEventListener("click", showSavedCovers);
homeButton.addEventListener("click", showHome);
createNewBookButton.addEventListener("click", createUserCover)
saveCoverButton.addEventListener("click", saveCover)

// Create your event handlers and other functions here 👇

function createRandomCover() {
  var randomCoverImage = getRandomIndex(covers);
  var randomTitle = getRandomIndex(titles);
  var randomTagline1 = getRandomIndex(descriptors);
  var randomTagline2 = getRandomIndex(descriptors);
  currentCover = new Cover(randomCoverImage, randomTitle, randomTagline1, randomTagline2);
  displayNewCover(currentCover);
}

function displayNewCover(cover) {
  coverTitle.innerText = cover.title;
  tagline1.innerText = cover.tagline1;
  tagline2.innerText = cover.tagline2;
  coverImage.src = cover.cover;
}

function showForm() {
  formView.classList.remove("hidden");
  hideHome();
  }

function showSavedCovers() {
  savedView.classList.remove("hidden");
  hideHome();
}

function showHome() {
  homeView.classList.remove("hidden");
  formView.classList.add("hidden");
  savedView.classList.add("hidden");
  randomizeButton.classList.remove("hidden");
  saveCoverButton.classList.remove("hidden");
  homeButton.classList.add("hidden");
}

function hideHome() {
  homeButton.classList.remove("hidden");
  homeView.classList.add("hidden");
  randomizeButton.classList.add("hidden");
  saveCoverButton.classList.add("hidden");
}

function createUserCover() {
  event.preventDefault();
  var inputCoverImage = userCover.value;
  var inputTitle = userTitle.value;
  var inputTagline1 = userDesc1.value;
  var inputTagline2 = userDesc2.value;
  currentCover = new Cover(inputCoverImage, inputTitle, inputTagline1, inputTagline2);
  saveUserInputs(currentCover);
  displayNewCover(currentCover);
  showHome();
}

function saveUserInputs(cover) {
  covers.unshift(cover.cover);
  titles.unshift(cover.title);
  descriptors.splice(0, 0, cover.tagline1, cover.tagline2);
}

function saveCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
    formatSavedCovers();
  }
}

function formatSavedCovers() {
  var miniCover =
  `<div class="mini-cover"><img class="mini-cover" src="${currentCover.cover}"><h2 class="cover-title first-letter">${currentCover.title}</h2><h3 class="tagline">A tale of ${currentCover.tagline1} and ${currentCover.tagline2}</h3></div>`
  savedCoversSection.insertAdjacentHTML('afterbegin', miniCover);
}


// We've provided one function to get you started
function getRandomIndex(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
