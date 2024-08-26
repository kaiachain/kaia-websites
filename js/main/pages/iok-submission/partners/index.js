function validateRequiredFieldTextBox(id) {
  const formControl = document.getElementById(id);
  let input = formControl.querySelector("input");
  if (!input) {
    input = formControl.querySelector("textarea");
  }
  const errorDiv = formControl.querySelector(".error-container-2");
  if (input.value && input.value.length > 0) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }
  gsap
    .timeline()
    .to(errorDiv, {
      display: "flex",
    })
    .to(
      errorDiv.children,
      {
        display: "flex",
      },
      "<"
    );
  $(formControl).addClass("has-error");
  return false;
}

function validateValidUrl(formControl) {
  let input = formControl.querySelector("input");
  let isValid = true;
  const errorDiv = formControl.querySelector(".error-container-2");
  const [_, required] = gsap.utils.toArray(errorDiv.children);

  try {
    new URL(input.value);
  } catch (err) {
    isValid = false;
  }

  if (isValid) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }

  gsap
    .timeline()
    .to(errorDiv, {
      display: "flex",
    })
    .to(required, {
      display: "none",
    });
  $(formControl).addClass("has-error");
}

function validateCheckbox(id) {
  const formControl = document.getElementById(id);
  const errorDiv = formControl.querySelector(".error-container-2");
  const input = formControl.querySelector("input");

  if (input.checked) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }

  gsap.to(errorDiv, {
    display: "flex",
  });
  $(formControl).addClass("has-error");

  return false;
}

function removeNameTagsOfCheckboxes(id) {
  const formControl = document.getElementById(id);
  const inputs = formControl.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    let elem = inputs[i];
    if (elem.id.endsWith("-hidden")) {
      continue;
    }
    elem.removeAttribute("data-name");
    elem.removeAttribute("name");
  }
}

function validateCheckboxes(id, fieldName, maxCheckboxes = 0) {
  let minimum = 1;
  const formControl = document.getElementById(id);
  const errorDiv = formControl.querySelector(".error-container-2");
  const inputs = formControl.querySelectorAll("input");
  const labels = document.getElementById(id).querySelectorAll("label");
  let checkedCount = 0;
  let checkBoxLabels = "";
  for (let i = 0; i < inputs.length; i++) {
    let elem = inputs[i];
    if (elem.id.endsWith("-hidden")) {
      continue;
    }
    if (elem.checked) {
      ++checkedCount;
      let label = labels[i].querySelector(".w-form-label").innerHTML;
      checkBoxLabels += label + ",";
    }
  }
  // Add hidden element to aggregate the checkbox values
  let checkBoxHiddenId = `${id}-hidden`;
  if (!document.getElementById(checkBoxHiddenId)) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = fieldName;
    hiddenInput.id = checkBoxHiddenId;
    hiddenInput.value = checkBoxLabels;
    hiddenInput.setAttribute("data-name", fieldName);

    formControl.appendChild(hiddenInput);
  } else {
    document.getElementById(checkBoxHiddenId).value = checkBoxLabels;
  }

  if (
    checkedCount >= minimum &&
    (maxCheckboxes == 0 || (maxCheckboxes > 0 && checkedCount >= maxCheckboxes))
  ) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    document.getElementById(checkBoxHiddenId).value = checkBoxLabels;
    return true;
  }

  gsap.to(errorDiv, {
    display: "flex",
  });
  $(formControl).addClass("has-error");

  return false;
}

function validateRequiredRadio(id) {
  const formControl = document.getElementById(id);
  const inputs = gsap.utils.toArray(formControl.querySelectorAll("input"));
  const errorDiv = formControl.querySelector(".error-container-2");
  let hasChecked = false;
  inputs.map((radio) => {
    if (radio.checked) {
      hasChecked = true;
      input = radio;
    }
  });
  if (hasChecked) {
    gsap.to(errorDiv, {
      display: "none",
    });
    $(formControl).removeClass("has-error");
    return true;
  }
  $(formControl).addClass("has-error");
  gsap.to(errorDiv, {
    display: "flex",
  });
  return false;
}

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

function skipCategoryOfTheOrganization() {
  removeNameTagsOfCheckboxes("project-category");
}

function skipContributionType() {
  removeNameTagsOfCheckboxes("contribution-type");
}

function attachValidationToPartnerForm() {
  const fauxSubmitButton = document.getElementById("faux-submit-button");
  const realSubmitButton = document.getElementById("real-submit-button");

  fauxSubmitButton.addEventListener("click", () => {
    let isValid = 0;

    isValid += validateNameOfOrganization() ? 0 : 1;
    isValid += validateOrganizationsAddress() ? 0 : 1;
    isValid += validateIaman() ? 0 : 1;
    isValid += validateCategoryOfTheOrganization() ? 0 : 1;
    isValid += validateContributionType() ? 0 : 1;
    isValid += validateProjectDescription() ? 0 : 1;
    isValid += validateProjectWebsite() ? 0 : 1;
    isValid += validateOrganizationTwitter() ? 0 : 1;
    // isValid += validateWhitepaper() ? 0 : 1;
    isValid += validateRepresentativeName() ? 0 : 1;
    isValid += validateRepresentativeEmail() ? 0 : 1;

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
}

$(document).ready(PartnerProjectSubmission);
