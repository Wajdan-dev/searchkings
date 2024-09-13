// navbar

function toggleDropdown(element) {
  const dropdown = element.nextElementSibling;
  const icon = element.querySelector("img");
  const allDropdowns = document.querySelectorAll("#menu > li > div");
  const allIcons = document.querySelectorAll("#menu > li img");

  allDropdowns.forEach((d) => {
    if (d !== dropdown) {
      d.classList.add("hidden");
    }
  });

  allIcons.forEach((i) => {
    if (i !== icon) {
      i.classList.remove("rotate-90");
      i.classList.add("rotate-0");
    }
  });

  dropdown.classList.toggle("hidden");
  icon.classList.toggle("rotate-90");
}

// home slider

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".splide__slide");
  let currentIndex = 0;
  const slideInterval = 3000; // Change slide every 3 seconds

  function moveToNextSlide() {
    // Remove is-active class from the current slide
    slides[currentIndex].classList.remove("is-active");

    // Update the currentIndex to the next slide
    currentIndex = (currentIndex + 1) % slides.length;

    // Add is-active class to the new slide
    slides[currentIndex].classList.add("is-active");

    // Move the slider smoothly
    const track = document.querySelector(".splide__list");
    const slideWidth =
      slides[currentIndex].offsetWidth +
      parseInt(window.getComputedStyle(slides[currentIndex]).marginRight);
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Add smooth transition to the track
  const track = document.querySelector(".splide__list");
  track.style.transition = "transform 0.5s ease-in-out"; // Adjust the duration and easing as needed

  // Start the slide show
  setInterval(moveToNextSlide, slideInterval);
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-text");
  const images = document.querySelectorAll(".tab-content");
  let currentIndex = 0;
  let autoChange;

  // Start automatic change only if not on mobile
  function startAutoChange() {
    if (window.innerWidth > 640) {
      autoChange = setInterval(() => changeTab(currentIndex + 1), 5000);
    }
  }

  // Call to start auto change
  startAutoChange();

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      clearInterval(autoChange); // Stop auto-change on click
      changeTab(index);
      startAutoChange(); // Restart auto-change if not on mobile
    });
  });

  function changeTab(index) {
    if (index >= tabs.length) index = 0;
    if (index < 0) index = tabs.length - 1;

    // Hide all contents and images
    contents.forEach((content) => content.classList.add("hidden"));
    images.forEach((image) => image.classList.add("hidden"));

    // Show the active content and image
    contents[index].classList.remove("hidden");
    images[index].classList.remove("hidden");

    // Update the current index
    currentIndex = index;

    // Handle tab visibility for mobile screens only
    if (window.innerWidth <= 776) {
      // Hide all tabs on mobile except the active one
      tabs.forEach((tab) => tab.classList.add("hidden")); // Hide all tabs
      tabs[index].classList.remove("hidden"); // Show only the active tab
    } else {
      // On desktop, show all tabs
      tabs.forEach((tab) => tab.classList.remove("hidden"));
    }

    // Update tab active state
    tabs.forEach((tab) => tab.classList.remove("tab-active"));
    tabs[index].classList.add("tab-active");
  }

  // Arrow button functionality
  document.querySelector(".slide_arrow--prev").addEventListener("click", () => {
    changeTab(currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1);
  });

  document.querySelector(".slide_arrow--next").addEventListener("click", () => {
    changeTab(currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1);
  });

  // Initial setup to ensure correct tab is displayed on mobile
  if (window.innerWidth <= 640) {
    tabs.forEach((tab) => tab.classList.add("hidden"));
    tabs[currentIndex].classList.remove("hidden");
  }
});

// navbar

document
  .getElementById("mobile-nav-toggle")
  .addEventListener("click", function () {
    const navDrawer = document.getElementById("nav-drawer");
    const isDrawerOpen = navDrawer.classList.contains("hidden");

    if (isDrawerOpen) {
      navDrawer.classList.remove("hidden");
    } else {
      navDrawer.classList.add("hidden");
    }

    // Optionally, you can toggle the appearance of the hamburger button to a close button.
    this.classList.toggle("opened");
  });

document.querySelector(".toggle-button").addEventListener("click", function () {
  document.querySelectorAll(".color-change").forEach(function (element) {
    element.classList.toggle("text-white");
  });

  const toggleButton = document.querySelector("#mobile-nav-toggle");
  const iconContainer = toggleButton.querySelector("div");
  const isCloseIcon = iconContainer.querySelector(".material-symbols-outlined");

  if (isCloseIcon) {
    // Revert back to the original spans
    iconContainer.innerHTML = `
            <span aria-hidden="true" class="block absolute h-[3px] rounded-full w-5 bg-[#4a4a4a] transition translate-y-[-6px] color-change"></span>
            <span aria-hidden="true" class="block absolute h-[3px] rounded-full w-4 bg-[#4a4a4a] transition translate-y-0 color-change"></span>
            <span aria-hidden="true" class="block absolute h-[3px] rounded-full w-3 bg-[#4a4a4a] transition translate-y-[6px] color-change"></span>
        `;
    iconContainer.classList.remove("justify-center");
    iconContainer.classList.add("justify-end");
  } else {
    // Replace the spans with the close icon
    iconContainer.innerHTML =
      '<span class="material-symbols-outlined">close</span>';
    iconContainer.classList.remove("justify-end");
    iconContainer.classList.add("justify-center");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll("#splide01-list2222 li");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (window.innerWidth <= 768) {
        // Check if it's mobile
        slide.style.display = i === index ? "flex" : "none"; // Show only active slide
      } else {
        slide.style.display = "flex"; // Show all slides on desktop
      }
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Apply transform for smooth transition on mobile
    if (window.innerWidth > 768) {
      const sliderContainer = document.querySelector(".slidersss");
      sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  function handleDragStart(event) {
    if (window.innerWidth > 768) return; // Only enable dragging on mobile
    isDragging = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;
  }

  function handleDragMove(event) {
    if (window.innerWidth > 768 || !isDragging) return; // Only enable dragging on mobile
    currentX = event.touches ? event.touches[0].clientX : event.clientX;
  }

  function handleDragEnd() {
    if (window.innerWidth > 768 || !isDragging) return; // Only enable dragging on mobile
    isDragging = false;
    const deltaX = currentX - startX;

    if (deltaX > 50) {
      // Slide right
      currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    } else if (deltaX < -50) {
      // Slide left
      currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    }

    showSlide(currentIndex);
  }

  // Attach drag and slide event listeners only on mobile screens
  if (window.innerWidth <= 768) {
    slides.forEach((slide) => {
      slide.addEventListener("mousedown", handleDragStart);
      slide.addEventListener("mousemove", handleDragMove);
      slide.addEventListener("mouseup", handleDragEnd);
      slide.addEventListener("mouseleave", handleDragEnd);

      slide.addEventListener("touchstart", handleDragStart);
      slide.addEventListener("touchmove", handleDragMove);
      slide.addEventListener("touchend", handleDragEnd);
    });
  }

  // Arrow navigation (works on all screen sizes)
  document
    .querySelector(".splide__arrow--prev")
    .addEventListener("click", function () {
      currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      showSlide(currentIndex);
    });

  document
    .querySelector(".splide__arrow--next")
    .addEventListener("click", function () {
      currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      showSlide(currentIndex);
    });

  // Handle dot click (works on all screen sizes)
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Initially show the first slide
  showSlide(currentIndex);
});









// Select the slider elements
const slides = document.querySelector(".target-slides");
const slideItems = Array.from(slides.querySelectorAll("li"));
const totalSlides = slideItems.length;

// Clone the first and last slides for seamless transition
const firstSlideClone = slideItems[0].cloneNode(true);
const lastSlideClone = slideItems[totalSlides - 1].cloneNode(true);

// Append the clones
slides.appendChild(firstSlideClone);
slides.insertBefore(lastSlideClone, slideItems[0]);

let currentIndex = 1; // Start from the first real slide

// Update slides after adding clones
const allSlides = slides.querySelectorAll("li");
const updatedTotalSlides = allSlides.length;

function showSlide(index) {
  // Remove active class from all slides
  allSlides.forEach(slide => slide.classList.remove("is_actiive"));

  // Add active class to the current slide
  allSlides[index].classList.add("is_actiive");

  // Calculate the offset to center the current slide
  const slideWidth = allSlides[index].offsetWidth;
  const offset = index * (slideWidth + 48) - (window.innerWidth / 2 - slideWidth / 2); // 48 is the right margin

  // Adjust the transform property to center the active slide
  if (window.innerWidth > 768) {
    slides.style.transform = `translateX(-${offset}px)`;
  } else {
    slides.style.transform = `translateX(-${index * 30}px)`;
  }
}

function handleTransitionEnd() {
  // Remove the transition temporarily to handle the seamless transition from the cloned first and last slides
  slides.style.transition = "none";
  
  if (currentIndex === 0) {
    currentIndex = totalSlides - 2; // Jump to the last real slide
  } else if (currentIndex === updatedTotalSlides - 1) {
    currentIndex = 1; // Jump to the first real slide
  }

  // Show the slide at the new index
  showSlide(currentIndex);

  // Re-enable the transition for future slides
  setTimeout(() => {
    slides.style.transition = "transform 0.5s ease"; // Smooth transition of 0.5 seconds
  }, 50);
}

// Auto-slide function
function autoSlide() {
  currentIndex++;
  slides.style.transition = "transform 0.5s ease"; // Smooth transition of 0.5 seconds

  // When reaching the cloned last slide, handle the jump back to the first real slide
  if (currentIndex >= updatedTotalSlides - 1) {
    slides.addEventListener("transitionend", handleTransitionEnd, { once: true });
  }

  showSlide(currentIndex);
}

// Start auto-sliding every 3 seconds
setInterval(autoSlide, 3000);

// Initialize the first slide
showSlide(currentIndex);

// Navigation buttons
document.querySelector(".splide__arrow--prev").addEventListener("click", function () {
  currentIndex--;
  slides.style.transition = "transform 0.5s ease"; // Smooth transition of 0.5 seconds
  if (currentIndex <= 0) {
    slides.addEventListener("transitionend", handleTransitionEnd, { once: true });
  }
  showSlide(currentIndex);
});

document.querySelector(".splide__arrow--next").addEventListener("click", function () {
  currentIndex++;
  slides.style.transition = "transform 0.5s ease"; // Smooth transition of 0.5 seconds
  if (currentIndex >= updatedTotalSlides - 1) {
    slides.addEventListener("transitionend", handleTransitionEnd, { once: true });
  }
  showSlide(currentIndex);
});








  

$(document).ready(function () {
  $("#sliderrr").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});

function toggleDropdown1(event) {
  event.preventDefault(); // Prevent default anchor click behavior
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("hidden"); // Toggle hidden class to show/hide dropdown
}
function toggleDropdown2(event) {
  event.preventDefault(); // Prevent default anchor click behavior
  const dropdown = document.getElementById("dropdown2");
  dropdown.classList.toggle("hidden"); // Toggle hidden class to show/hide dropdown
}
function toggleDropdown3(event) {
  event.preventDefault(); // Prevent default anchor click behavior
  const dropdown = document.getElementById("dropdown3");
  dropdown.classList.toggle("hidden"); // Toggle hidden class to show/hide dropdown
}

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".prev-arrow");
  const nextButton = document.querySelector(".next-arrow");
  const sliderTrack = document.querySelector(".slider-track");
  let currentSlide = 0;

  function updateSlides() {
    // Calculate the offset based on the slide width
    const slideWidth =
      slides[0].clientWidth +
      parseFloat(window.getComputedStyle(slides[0]).marginRight);
    const offset = -(currentSlide * slideWidth);

    sliderTrack.style.transform = `translateX(${offset}px)`;

    // Update active dot
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");

    // Update active slide class
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlides();
    });
  });

  // Previous button
  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  });

  // Next button
  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  });

  // Automatic slide change for mobile
  setInterval(() => {
    if (window.innerWidth <= 768) {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }
  }, 3000);
});



// hide block  form 







