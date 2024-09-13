let countryDialCode = "92";
const phoneInput = document.getElementById("phone");
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  validateForm(); // Call the validation function on submit
});

function validateForm() {
  validateName();
  validatePhone();
  validateEmail();
  validateCompanyName();
  validateCompanyWebsite();
  validateInquiryType();
  validateHearAbout();
}

function getSelectedDialCode() {
  // Get the selected flag element
  var selectedFlagElement = document.getElementById("selectedFlagIcon");

  // Check if the selected flag element exists and has a data-country-code attribute
  if (selectedFlagElement && selectedFlagElement.classList.length > 1) {
    // Extract the country code from the class name (e.g., 'iti__us' -> 'us')
    var selectedCountryCode = selectedFlagElement.classList[1].replace(
      "iti__",
      ""
    );

    // Find the corresponding country element in the dropdown list
    var selectedCountryElement = document.querySelector(
      `.iti__country[data-country-code="${selectedCountryCode}"]`
    );

    if (selectedCountryElement) {
      // Get the dial code associated with the selected country
      var selectedDialCode =
        selectedCountryElement.getAttribute("data-dial-code");

      console.log("Selected Dial Code:", selectedDialCode);

      // Return or display the selected dial code
      return selectedDialCode;
    }
  } else {
    console.log("No country selected.");
    return null;
  }
}

// Attach event listener for when a country is selected from the list
document.querySelectorAll(".iti__country").forEach(function (countryElement) {
  countryElement.addEventListener("click", function () {
    const selectedDialCode = getSelectedDialCode();
    countryDialCode = selectedDialCode;
    if (phoneInput.value.trim() !== "") {
      phoneInput.value = "";
    }
    console.log("Dial Code selected:", selectedDialCode);
  });
});
// Validate Name
function validateName() {
  const nameInput = document.getElementById("name");
  const errorMessage = nameInput.nextElementSibling;
  if (nameInput.value.trim() === "") {
    nameInput.style.borderColor = "red";
    errorMessage.style.display = "block";
  } else {
    nameInput.style.borderColor = "";
    errorMessage.style.display = "none";
  }
}

// Validate Phone
function validatePhone() {
  const phonePristineError =
    phoneInput.parentElement.parentElement.parentElement.querySelector(
      ".error-message-phone"
    );
  const phoneRegex = /^[0-9]+$/; // Regex to match only numbers

  const fullPhoneNumber = "+" + countryDialCode + phoneInput.value.trim();
  //  DIAL CODE AND FULL PHONE NUMBER
  console.log("Dial Code:", countryDialCode);
  console.log("Full Phone Number:", fullPhoneNumber);

  if (phoneInput.value.trim() === "") {
    phoneInput.style.borderColor = "red";

    phonePristineError.style.display = "block";
    phonePristineError.innerText = "Phone number is required.";
  } else if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneInput.style.borderColor = "red";

    phonePristineError.style.display = "block";
    phonePristineError.innerText = "Please enter a valid phone number.";
  } else if (phoneInput.value.trim().length < 10) {
    phoneInput.style.borderColor = "black";

    phonePristineError.style.display = "block";
    phonePristineError.innerText = "Too short.";
  } else if (phoneInput.value.trim().length > 10) {
    phoneInput.style.borderColor = "black";

    phonePristineError.style.display = "block";
    phonePristineError.innerText = "Too long.";
  } else {
    phoneInput.style.borderColor = "";

    phonePristineError.style.display = "none";
  }
}

// Validate Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailErrorMessage = emailInput.nextElementSibling;
  const emailPristineError =
    emailInput.parentElement.parentElement.parentElement.querySelector(
      ".error-message-email"
    );
  if (emailInput.value.trim() === "") {
    emailInput.style.borderColor = "red";
    emailErrorMessage.style.display = "block";
    emailPristineError.style.display = "block";
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailInput.style.borderColor = "red";
    emailErrorMessage.style.display = "block";
    emailPristineError.innerText = "Please enter a valid email.";
    emailPristineError.style.display = "block";
  } else {
    emailInput.style.borderColor = "";
    emailErrorMessage.style.display = "none";
    emailPristineError.style.display = "none";
  }
}

// Validate Company Name
function validateCompanyName() {
  const companyNameInput = document.getElementById("company-name");
  const companyNameErrorMessage = companyNameInput.nextElementSibling;
  const companyNamePristineError =
    companyNameInput.parentElement.parentElement.parentElement.querySelector(
      ".error-message-company-name"
    );
  if (companyNameInput.value.trim() === "") {
    companyNameInput.style.borderColor = "red";
    companyNameErrorMessage.style.display = "block";
    companyNamePristineError.style.display = "block";
  } else {
    companyNameInput.style.borderColor = "";
    companyNameErrorMessage.style.display = "none";
    companyNamePristineError.style.display = "none";
  }
}

// Validate Company Website
function validateCompanyWebsite() {
  const companyWebsite = document.getElementById("website");
  const companyWebsiteErrorMessage = companyWebsite.nextElementSibling;
  const companyWebsitePristineError =
    companyWebsite.parentElement.parentElement.parentElement.querySelector(
      ".error-message-company-website"
    );
  if (companyWebsite.value.trim() === "") {
    companyWebsite.style.borderColor = "red";
    companyWebsiteErrorMessage.style.display = "block";
    companyWebsitePristineError.style.display = "block";
  } else if (!isValidURL(companyWebsite.value.trim())) {
    companyWebsite.style.borderColor = "red";
    companyWebsiteErrorMessage.style.display = "block";
    companyWebsitePristineError.innerText = "Please enter a valid URL";
    companyWebsitePristineError.style.display = "block";
  } else {
    companyWebsite.style.borderColor = "";
    companyWebsiteErrorMessage.style.display = "none";
    companyWebsitePristineError.style.display = "none";
  }
}

// Validate Inquiry Type
function validateInquiryType() {
  const inquirySelect = document.getElementById("inquiry-type");
  const inquiryErrorMessage = inquirySelect.nextElementSibling;
  const inquiryPristineError = inquirySelect.parentElement.querySelector(
    ".error-message-inquiry"
  );
  if (inquirySelect.value === "option") {
    inquirySelect.style.borderColor = "red";
    inquiryErrorMessage.style.display = "block";
    inquiryPristineError.style.display = "block";
  } else {
    inquirySelect.style.borderColor = "";
    inquiryErrorMessage.style.display = "none";
    inquiryPristineError.style.display = "none";
  }
}

// Validate Hear About
function validateHearAbout() {
  const hearAboutSelect = document.getElementById("hear-about");
  const hearAboutErrorMessage = hearAboutSelect.nextElementSibling;
  const hearAboutPristineError = hearAboutSelect.parentElement.querySelector(
    ".error-message-hear"
  );
  if (hearAboutSelect.value === "option") {
    hearAboutSelect.style.borderColor = "red";
    hearAboutErrorMessage.style.display = "block";
    hearAboutPristineError.style.display = "block";
  } else {
    hearAboutSelect.style.borderColor = "";
    hearAboutErrorMessage.style.display = "none";
    hearAboutPristineError.style.display = "none";
  }
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// URL validation function
function isValidURL(url) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

// Attach input and blur event listeners for real-time validation
document.getElementById("name").addEventListener("input", validateName);

document.getElementById("phone").addEventListener("input", validatePhone);

document.getElementById("email").addEventListener("input", validateEmail);

document
  .getElementById("company-name")
  .addEventListener("input", validateCompanyName);

document
  .getElementById("website")
  .addEventListener("input", validateCompanyWebsite);

document
  .getElementById("inquiry-type")
  .addEventListener("change", validateInquiryType);

document
  .getElementById("hear-about")
  .addEventListener("change", validateHearAbout);
