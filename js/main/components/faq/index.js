window.faqOpenedIndex = undefined;
let isFaqMobile = false;

function closeAccordion(header, content) {
  if (window.faqOpenedIndex === undefined || !header || !content) return;
  const openedHeader = header;
  const openedContent = content;

  const timeline = gsap.timeline();
  timeline.timeScale(3);

  timeline.to(openedContent, {
    height: 0,
  });
  timeline.to(
    openedHeader,
    {
      color: "var(--greyscale--fg--subtlest)",
      textDecoration: "none",
    },
    "<"
  );
  const [_, openedFAQSymbol] = gsap.utils.toArray(openedHeader.children);
  timeline.to(openedFAQSymbol, { rotation: 0 }, "<");

  window.faqOpenedIndex = undefined;
}

const FAQBodyAnimation = () => {
  const faqHeaders = gsap.utils.toArray(".faq-header-div");
  const faqContent = gsap.utils.toArray(".faq-item-content");
  const faqFilterChips = gsap.utils.toArray(".faq-filter-chip");

  $("#all-filter").detach().prependTo(".faq-filter-collection-list");

  function openAccordion(header, idx) {
    const timeline = gsap.timeline();
    const [_, symbol] = gsap.utils.toArray(header.children);
    timeline.timeScale(3);
    if (window.faqOpenedIndex !== undefined) {
      timeline.to(faqContent[window.faqOpenedIndex], {
        height: 0,
      });
      timeline.to(
        faqHeaders[window.faqOpenedIndex],
        {
          color: "var(--greyscale--fg--subtlest)",
          textDecoration: "none",
        },
        "<"
      );

      const [_, openedFAQSymbol] = gsap.utils.toArray(
        faqHeaders[window.faqOpenedIndex].children
      );
      timeline.to(openedFAQSymbol, { rotation: 0 }, "<");
    }
    timeline.to(
      faqContent[idx],
      {
        height: "auto",
      },
      "<"
    );

    timeline.to(
      header,
      {
        color: "var(--brand--fg--neutral)",
        // textDecoration: "underline"
      },
      "<"
    );

    timeline.to(symbol, { rotation: 45 }, "<");
  }

  faqFilterChips.map((chip) => {
    chip.onclick = () =>
      closeAccordion(faqHeaders[window.faqOpenedIndex], faqContent[window.faqOpenedIndex]);
  });

  faqHeaders.map((header, idx) => {
    header.onclick = () => {
      if (window.faqOpenedIndex !== idx) {
        openAccordion(header, idx);
        window.faqOpenedIndex = idx;
      } else {
        closeAccordion(faqHeaders[window.faqOpenedIndex], faqContent[window.faqOpenedIndex]);
      }
    };
  });
};

function AnimateDropdown() {
  let dropdownOpen = false;
  if (!isFaqMobile) return;
  const faqDropdown = document.getElementById("faq-dropdown-div");
  const faqFormBlock = document.querySelector(".faq-form-block");
  const faqFilters = gsap.utils.toArray(".faq-filter-chip-container");
  const [filterText, symbol] = gsap.utils.toArray(faqDropdown.children);
  const dropdownTimeline = gsap.timeline();
  dropdownTimeline.timeScale(3);

  faqFilters.map((filter) => {
    filter.addEventListener("click", () => {
      closeDropdown();
      filterText.innerText = filter.innerText;
    });
  });

  faqDropdown.onclick = () => {
    if (dropdownOpen) return closeDropdown();
    return openDropdown();
  };
  function closeDropdown() {
    dropdownOpen = !dropdownOpen;
    dropdownTimeline
      .to(symbol, {
        rotation: 0,
      })
      .to(
        faqFormBlock,
        {
          height: 0,
        },
        "<"
      );
  }

  function openDropdown() {
    dropdownOpen = !dropdownOpen;
    dropdownTimeline
      .to(symbol, {
        rotation: 180,
      })
      .to(
        faqFormBlock,
        {
          height: "auto",
        },
        "<"
      );
  }
}

function AttachFAQEventsOnDOMLifecycle() {
  const faqSection = document.getElementById('faq-container')
  const mobilePageIndicator = faqSection.querySelector(".list-pagination-page-button.mobile");
  isFaqMobile = document.body.clientWidth <= 767;

  FAQBodyAnimation();
  AnimateDropdown();

  setTimeout(() => {
    const pageButtons = gsap.utils.toArray(".list-pagination-page-button");
    const faqFilters = gsap.utils.toArray(".faq-filter-chip-container");
    const paginationNavBtns = gsap.utils.toArray(".list-pagination-nav-button");

    function onButtonClick() {
      if (window.faqOpenedIndex !== undefined) {
        const faqHeaders = gsap.utils.toArray(".faq-header-div");
        const faqContent = gsap.utils.toArray(".faq-item-content");
        closeAccordion(faqHeaders[window.faqOpenedIndex], faqContent[window.faqOpenedIndex]);
      }
      setTimeout(FAQBodyAnimation, 500);
    }

    pageButtons.map((pageButton) => {
      pageButton.onclick = onButtonClick;
    });

    faqFilters.map((filter) => {
      filter.addEventListener("click", () => {
        onButtonClick();
        mobilePageIndicator.innerText = 1;
      });
    });

    paginationNavBtns.map((paginationBtn) => {
      paginationBtn.onclick = () => {
        const buttonType = paginationBtn.classList[0];
        if (buttonType === "w-pagination-previous") {
          mobilePageIndicator.innerText =
            parseInt(mobilePageIndicator.innerText) - 1;
        } else {
          mobilePageIndicator.innerText =
            parseInt(mobilePageIndicator.innerText) + 1;
        }
        onButtonClick();
      };
    });
  }, 500);
}

$(window).on("resize", AttachFAQEventsOnDOMLifecycle);

$(document).ready(AttachFAQEventsOnDOMLifecycle);
