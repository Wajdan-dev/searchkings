var currentIndexUnique = 0;
var totalItems = document.querySelectorAll(".carousel-item").length;
var interval;
var startX;
var currentX;

// Initialize autoplay
function startAutoplay() {
  interval = setInterval(function () {
    changeSlide(2);
  }, 3000); // Change slide every 3 seconds
}

startAutoplay();

function goToSlide(index) {
  currentIndexUnique = index;
  updateCarousel();
  resetAutoplay();
}

function changeSlide(direction) {
  currentIndexUnique += direction;
  if (currentIndexUnique < 0) {
    currentIndexUnique = totalItems - 1;
  } else if (currentIndexUnique >= totalItems) {
    currentIndexUnique = 0;
  }
  updateCarousel();
  resetAutoplay();
}

function updateCarousel() {
  var wrapper = document.getElementById("carouselWrapper");
  wrapper.style.transform = "translateX(" + -currentIndexUnique * 100 + "%)";
}

function resetAutoplay() {
  clearInterval(interval);
  startAutoplay();
}

var carouselItems = document.querySelectorAll(".carousel-item");
carouselItems.forEach(function (item) {
  item.addEventListener("mouseup", handleDragStart);
  item.addEventListener("mousemove", handleDrag);
  item.addEventListener("mousedown", handleDragEnd);
});

function handleDragStart(event) {
  startX = event.clientX;
  console.log("Drag start", startX);
}

function handleDrag(event) {
  currentX = event.clientX;
}

function handleDragEnd(event) {
  var dragDistance = currentX - startX;
  var threshold = 100; // Adjust this value to control the sensitivity of the drag

  if (dragDistance > threshold) {
    changeSlide(-2); // Change to previous slide
  } else if (dragDistance < -threshold) {
    changeSlide(2); // Change to next slide
  }
}
