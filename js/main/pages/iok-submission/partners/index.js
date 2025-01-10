// Field Validations
function validateNameOfOrganization() {
  return validateRequiredFieldTextBox("name-of-organization");
}

function validateOrganizationsAddress() {
  return validateRequiredFieldTextBox("organization-address");
}

function validateIaman() {
  return validateRequiredRadio("radio-partners");
}

function validateOrganizationTwitter() {
  return validateRequiredFieldTextBox("organization-twitter");
}

function validateRepresentativeName() {
  return validateRequiredFieldTextBox("representative-name");
}

function validateRepresentativeEmail() {
  return validateRequiredFieldTextBox("representative-email");
}

function validateProjectDescription() {
  return validateRequiredFieldTextBox("description-organization");
}

function validateBooleanNamePartner() {
  return validateRequiredRadio("radio-partners");
}

function validateCategoryOfTheOrganization() {
  return validateCheckboxes("project-category", "Project Category");
}

function validateContributionType() {
  let maxCheckboxes = 2;
  return validateCheckboxes(
    "contribution-type",
    "Contribution Type",
    maxCheckboxes
  );
}

function validateProjectWebsite() {
  const requireCheck = validateRequiredFieldTextBox("organization-url-website");
  if (!requireCheck) return requireCheck;
  const formControl = document.getElementById("organization-url-website");
  return validateValidUrl(formControl);
}

function validateWhitepaperDeckUrl() {
  const formControl = document.getElementById("whitepaper-deck-url");
  const input = formControl.querySelector("input");
  if (!input.value || input.value.length === 0) {
    const errorDiv = formControl.querySelector(".error-container-2");
    errorDiv.style.display = "none";
    return true;
  }
  return validateValidUrl(formControl);
}

function skipCategoryOfTheOrganization() {
  removeNameTagsOfCheckboxes("project-category");
}

function skipContributionType() {
  removeNameTagsOfCheckboxes("contribution-type");
}

function toggleFormVisibilityBasedOnRadio() {
  const newPartnerRadio = document.getElementById("New-Partner");
  const existingPartnerRadio = document.getElementById("Existing-Partner");
  const formControl = document.getElementById("project-logo");

  // Check the initial state of the radio when the load page
  if (newPartnerRadio.checked) {
    formControl.style.display = "block";
  } else {
    formControl.style.display = "none";
  }

  // listen to the event changes when the user chooses/Deselect Radio Button
  newPartnerRadio.addEventListener("change", function () {
    if (newPartnerRadio.checked) {
      formControl.style.display = "block";
    }
  });
  existingPartnerRadio.addEventListener("change", function () {
    if (existingPartnerRadio.checked) {
      formControl.style.display = "none";
    }
  });
}

function attachValidationToPartnerForm() {
  const fauxSubmitButton = document.getElementById("faux-submit-button");
  const realSubmitButton = document.getElementById("real-submit-button");

  fauxSubmitButton.addEventListener("click", async () => {
    let isValid = 0;

    isValid += validateNameOfOrganization() ? 0 : 1;
    isValid += validateOrganizationsAddress() ? 0 : 1;
    isValid += validateIaman() ? 0 : 1;
    isValid += validateCategoryOfTheOrganization() ? 0 : 1;
    isValid += validateContributionType() ? 0 : 1;
    isValid += validateProjectDescription() ? 0 : 1;
    isValid += validateProjectWebsite() ? 0 : 1;
    isValid += validateOrganizationTwitter() ? 0 : 1;
    isValid += validateRepresentativeName() ? 0 : 1;
    isValid += validateRepresentativeEmail() ? 0 : 1;
    isValid += validateBooleanNamePartner() ? 0 : 1;
    isValid += validateWhitepaperDeckUrl() ? 0 : 1;

    if (isValid > 0) {
      const formItemWithErr = document.querySelector(
        "#wf-form-IOK-Partners .has-error"
      );
      formItemWithErr?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    // skip elements
    //skipCategoryOfTheOrganization();
    //skipContributionType();

    realSubmitButton.click();
  });
}

function PartnerProjectSubmission() {
  gsap.to(".error-container-2", { display: "none" });
  attachValidationToPartnerForm();
  toggleFormVisibilityBasedOnRadio();
}

$(document).ready(PartnerProjectSubmission);
