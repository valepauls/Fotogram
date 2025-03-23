let myImages = [
  "./img/lateral-raise.jpg",
  "./img/streching.jpg",
  "./img/crunch.jpg",
  "./img/leg-press.jpg",
  "./img/streching2.jpg",
  "./img/curl.jpg",
  "./img/pull_up.jpg",
  "./img/streching_3.jpg",
  "./img/curl2.jpg",
  "./img/pullup.jpg",
  "./img/woman-man.jpg",
  "./img/barbell_press.jpg",
];

let myImagesSecond = [
  "./img/rowing.jpg",
  "./img/woman-man2.jpg",
  "./img/bench-press.jpg",
  "./img/deadlift.jpg",
  "./img/sit-up.jpg",
  "./img/women.jpg",
  "./img/box_jump.jpg",
  "./img/kettlebell.jpg",
  "./img/squat.jpg",
  "./img/kettlebell2.jpg",
  "./img/squat2.jpg",
  "./img/crunch2.jpg",
];

let currentImages = myImages;
let currentImageIndex = 0;

function init() {
  renderFiltered(1);
}

function renderFiltered(index) {
  currentImages = index === 1 ? myImages : myImagesSecond;
  renderImages();
}

function renderImages() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";
  for (let index = 0; index < currentImages.length; index++) {
    contentRef.innerHTML += getImageTemplate(index);
  }
}

function getImageTemplate(index) {
  return `<div onclick="openOverlay(${index})" class="single_element" style="background-image: url('${currentImages[index]}');"></div>`;
}

function closeOverlay(event) {
  if (event.target.closest(".close_btn") || event.target.id === "overlay") {
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.add("d_none");
  }
}

function openOverlay(index) {
  currentImageIndex = index;
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.remove("d_none");
  renderDialogImg();
}

function renderDialogImg() {
  let imageDialogRef = document.getElementById("image_dialog");
  imageDialogRef.innerHTML = getDialogImageTemplate();

  let closeBtn = imageDialogRef.querySelector(".close_btn");
  closeBtn.addEventListener("click", function (event) {
    closeOverlay(event);
  });

  let arrowLeft = imageDialogRef.querySelector(".arrow_left");
  arrowLeft.addEventListener("click", showPreviousImage);

  let arrowRight = imageDialogRef.querySelector(".arrow_right");
  arrowRight.addEventListener("click", showNextImage);
}

function getDialogImageTemplate() {
  let imageName = currentImages[currentImageIndex].split("/").pop();
  return `
    <div class="dialog_img" style="background-image: url('${
      currentImages[currentImageIndex]}');">
    </div>
    
    <div class="img_title">${imageName}</div>
    
    <div class="close_btn">
      <div class="circle">
        <img src="./img/close_btn.svg" alt="Schließen">
      </div>
    </div>
    
    <div class="img_counter">${currentImageIndex + 1}/${currentImages.length}</div>
    
    <div class="arrow_left">
      <div class="circle">
        <img src="./img/arrow_left.svg" alt="Pfeil links">
      </div>
    </div>
    
    <div class="arrow_right">
      <div class="circle">
        <img src="./img/arrow_right.svg" alt="Pfeil rechts">
      </div>
    </div>
  `;
}

function showPreviousImage() {
  currentImageIndex =
    (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  renderDialogImg();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  renderDialogImg();
}
