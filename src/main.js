var coverTitle = document.querySelector('.cover-title');
var coverImage = document.querySelector('.cover-image');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');
var randomCoverButton = document.querySelector('.random-cover-button');
var makeNewButton = document.querySelector('.make-new-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var homeButton = document.querySelector('.home-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var createNewBookButton = document.querySelector('.create-new-book-button');
var errorButton = document.querySelector('.error-button');
var homeView = document.querySelector('.home-view');
var formView = document.querySelector('.form-view');
var savedView = document.querySelector('.saved-view');
var savedCoversSection = document.querySelector('.saved-covers-section');
var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDesc1 = document.querySelector('.user-desc1');
var userDesc2 = document.querySelector('.user-desc2');

var savedCovers = [];
var currentCover;

window.addEventListener('load', createRandomCover);
randomCoverButton.addEventListener('click', createRandomCover);
makeNewButton.addEventListener('click', showForm);
viewSavedButton.addEventListener('click', showSavedCovers);
homeButton.addEventListener('click', showHome);
formView.addEventListener('keyup', validateForm)
createNewBookButton.addEventListener('click', createUserCover)
errorButton.addEventListener('click', showError);
saveCoverButton.addEventListener('click', saveCover);
savedCoversSection.addEventListener('dblclick', unsaveCover);

function showHome() {
  randomCoverButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  viewSavedButton.classList.remove('hidden');
  makeNewButton.classList.remove('hidden');
  homeView.classList.remove('hidden');
  formView.classList.add('hidden');
  savedView.classList.add('hidden');
  homeButton.classList.add('hidden');
}

function hideHome() {
  homeButton.classList.remove('hidden');
  homeView.classList.add('hidden');
  randomCoverButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
}

function createRandomCover() {
  var randomCoverImage = getRandomIndex(covers);
  var randomTitle = getRandomIndex(titles);
  var randomTagline1 = getRandomIndex(descriptors);
  var randomTagline2 = getRandomIndex(descriptors);
  currentCover = new Cover(randomCoverImage, randomTitle, randomTagline1, randomTagline2);
  displayNewCover();
}

function getRandomIndex(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function displayNewCover() {
  coverTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
  coverImage.src = currentCover.cover;
}

function showForm() {
  formView.classList.remove('hidden');
  viewSavedButton.classList.remove('hidden');
  savedView.classList.add('hidden');
  makeNewButton.classList.add('hidden');
  hideHome();
}

function validateForm() {
  if (userCover.value !== '') {
    checkImageURL(url)
  }
  if (userTitle.value !== '' && userDesc1.value !== '' && userDesc2.value !== '') {
    allowFormSubmission();
  } else {
    blockFormSubmission();
  }
}

function checkImageURL(url) {
  if (!url.includes("jpg" || "jpeg" || "png")) {
    alert("Not a valid image link")
  }
}

function allowFormSubmission() {
  createNewBookButton.classList.remove('hidden');
  errorButton.classList.add('hidden');
}

function blockFormSubmission() {
  errorButton.classList.remove('hidden');
  createNewBookButton.classList.add('hidden');
}

function createUserCover() {
  event.preventDefault();
  var inputCoverImage = userCover.value;
  var inputTitle = userTitle.value;
  var inputTagline1 = userDesc1.value;
  var inputTagline2 = userDesc2.value;
  currentCover = new Cover(inputCoverImage, inputTitle, inputTagline1, inputTagline2);
  saveUserInputs();
  displayNewCover();
  clearForm();
  showHome();
}

function saveUserInputs() {
  covers.unshift(currentCover.cover);
  titles.unshift(currentCover.title);
  descriptors.unshift(currentCover.tagline1);
  descriptors.unshift(currentCover.tagline2);
}

function showError() {
  event.preventDefault();
  alert('You must fill out all fields!');
}

function clearForm() {
  userCover.value = '';
  userTitle.value = '';
  userDesc1.value = '';
  userDesc2.value = '';
  blockFormSubmission();
}

function saveCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
    formatSavedCovers();
  }
}

function formatSavedCovers() {
  var miniCover =
  `<div class='entire-mini-cover mini-cover' data-id='${currentCover.id}'>
    <img class='mini-cover' src='${currentCover.cover}'>
    <h2 class='cover-title first-letter'>${currentCover.title}</h2>
    <h3 class='tagline'>A tale of ${currentCover.tagline1} and ${currentCover.tagline2}</h3>
  </div>`
  savedCoversSection.insertAdjacentHTML('afterbegin', miniCover);
}

function showSavedCovers() {
  savedView.classList.remove('hidden');
  makeNewButton.classList.remove('hidden');
  formView.classList.add('hidden');
  viewSavedButton.classList.add('hidden');
  hideHome();
}

function unsaveCover() {
  var clickedMiniCover = event.target.closest('.entire-mini-cover');
  for (var i = 0; i < savedCovers.length; i++) {
    if (clickedMiniCover.dataset.id == `${savedCovers[i].id}`) {
      savedCovers.splice(i, 1);
      removeMiniCover(clickedMiniCover);
    }
  }
}

function removeMiniCover(clickedMiniCover) {
  clickedMiniCover.remove();
}
