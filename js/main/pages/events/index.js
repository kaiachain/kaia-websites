var DateTime = luxon.DateTime;
let isEventMobile = false;
let isEventDesktop = false;
window.lightBoxIndex;

function FeaturedVideosCarouselCards() {
  setTimeout(() => {
    new Swiper(".event-featured-videos-swiper", {
      spaceBetween: 24,
      slidesPerView: 1,
      breakpoints: {
        478: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      updateOnWindowResize: true,
    });
  }, 200);
}

const eventBodyAnimation = () => {
  $("#all-filter").detach().prependTo(".events-filter-collection-list");
};



function AnimateDropdown() {
  let dropdownOpen = false;
  if (!isEventMobile) return;
  const eventDropdown = document.getElementById("event-dropdown-div");
  const eventFormBlock = document.querySelector(".event-form-block");
  const eventFilters = gsap.utils.toArray(".event-filter-chip-container");
  const [filterText, symbol] = gsap.utils.toArray(eventDropdown.children);
  const dropdownTimeline = gsap.timeline();
  dropdownTimeline.timeScale(3);

  eventFilters.map((filter) => {
    filter.addEventListener("click", () => {
      closeDropdown();
      filterText.innerText = filter.innerText;
    });
  });

  eventDropdown.onclick = () => {
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
        eventFormBlock,
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
        eventFormBlock,
        {
          height: "auto",
        },
        "<"
      );
  }
}

function AttachEventEventsOnDOMLifecycle() {
  const eventSection = document.getElementById("event-section");
  const mobilePageIndicator = eventSection.querySelector(
    ".list-pagination-page-button.mobile"
  );

  const tabs = gsap.utils.toArray(".events-timeline-tabs-title");

  isEventMobile = document.body.clientWidth <= 767;
  isEventDesktop = document.body.clientWidth >= 992;

  eventBodyAnimation();
  AnimateDropdown();
  updateArticlesTimezone();
  listHoverEvents();
  copyLink();
  shareLinks();
  formatCardDateTime();

  setTimeout(() => {
    const pageButtons = gsap.utils.toArray(".list-pagination-page-button");
    const eventFilters = gsap.utils.toArray(".event-filter-chip-container");
    const paginationNavBtns = gsap.utils.toArray(".list-pagination-nav-button");

    tabs.map((tab) => {
      tab.addEventListener("click", () => {
        const tabType = tab.id;
        switchTab(tabType);
      });
    });

    function onButtonClick() {
      setTimeout(eventBodyAnimation, 500);
      setTimeout(updateArticlesTimezone, 300);
      setTimeout(listHoverEvents, 300);
      setTimeout(copyLink, 300);
      setTimeout(shareLinks, 300);
    }

    pageButtons.map((pageButton) => {
      pageButton.onclick = onButtonClick;
    });

    eventFilters.map((filter) => {
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

function abbreviateTimezone(timezone) {
  if (timezone.length === 3 || timezone === null) return timezone;
  if (timezone.toLowerCase() === "asia/singapore") return "SGT";
  const abbr = moment.tz(timezone).zoneAbbr();

  return abbr;
}

function convertToGMT(zone) {
  const date = DateTime.fromMillis(Date.now(), {
    zone: zone,
  }).offsetNameShort;
  return date;
}

function updateArticlesTimezone() {
  const timezones = document.querySelectorAll(".timezone");
  const regex = /\//;

  timezones.forEach((timezone) => {
    if (regex.test(timezone.innerText)) {
      const GMT = convertToGMT(timezone.innerText);
      const abbr = abbreviateTimezone(timezone.innerText);
      const tags = timezone.tagName;
      if (GMT === null || abbr === null) return;
      if (tags === "H5") {
        timezone.innerText = GMT;
      } else {
        timezone.innerText = abbr;
      }
    }
  });
}

function switchTab(tabTypeSelected) {
  const ongoingTab = document.getElementById("ongoing-tab");
  const pastTab = document.getElementById("past-tab");
  const list = document.querySelectorAll(".event-list-wrapper");
  const ongoingList = list[0];
  const pastList = list[1];

  if (tabTypeSelected === "ongoing-tab") {
    ongoingTab.classList.add("active");
    pastTab.classList.remove("active");
    ongoingList.style.display = "block";
    pastList.style.display = "none";
  } else {
    ongoingTab.classList.remove("active");
    pastTab.classList.add("active");
    ongoingList.style.display = "none";
    pastList.style.display = "block";
  }
}


function shareLinks() {
  const shareLinks = gsap.utils.toArray(".share-button");
  const socialsModal = document.querySelector(".socials-modal");
  const socialsModalsocialsContainer = document.querySelector(
    ".socials-modal .share-socials-container"
  );
  const socialsModalCloseButton = document.querySelector(
    ".socials-modal .close-icon"
  );
  const socials = gsap.utils.toArray(socialsModalsocialsContainer.children);

  shareLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const url = link.getAttribute("external-url");
      socialsModal.style.display = "flex";

      socials.forEach((social, idx) => {
        social.target = "_blank";
        if (idx === 0) {
          social.href = `https://twitter.com/intent/tweet?url=${url}`;
        } else if (idx === 1) {
          social.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (idx === 2) {
          social.href = `https://discord.com/channels/@me/${url}`;
        } else if (idx === 3) {
          social.href = `https://t.me/share/url?url=${url}`;
        } else if (idx === 4) {
          social.href = `https://www.linkedin.com/shareArticle?url=${url}`;
        }
      });
    });
  });

  socials.forEach((social) => {
    social.addEventListener("click", () => {
      socialsModal.style.display = "none";
    });
  });

  socialsModalCloseButton.onclick = () => {
    socialsModal.style.display = "none";
  };
}

function copyLink() {
  const copyLinks = gsap.utils.toArray(".copy-button");
  const copiedContainer = document.querySelector(".copied-container");

  copyLinks.map((link) => {
    link.addEventListener("click", () => {
      const url = link.getAttribute("external-url");
      navigator.clipboard.writeText(url).then(
        () => {
          const icons = gsap.utils.toArray(link.children);
          gsap
            .timeline()
            .to(
              icons[0],
              {
                opacity: 0,
              },
              "<"
            )
            .to(
              icons[1],
              {
                opacity: 1,
              },
              "<"
            )
            .to(
              copiedContainer,
              {
                opacity: 1,
              },
              "<"
            )
            .to(icons[1], {
              opacity: 0,
              delay: 1,
            })
            .to(
              icons[0],
              {
                opacity: 1,
              },
              "<"
            )
            .to(
              copiedContainer,
              {
                opacity: 0,
              },
              "<"
            );
        },
        (err) => {
          console.error(err);
        }
      );
    });
  });
}

function listHoverEvents() {
  const keyList = gsap.utils.toArray(".key-events-cards");
  const list = gsap.utils.toArray(".event-list-item");

  if (!isEventDesktop) {
    keyList.map((item) => {
      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 1;
      });
    });

    list.map((item) => {
      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 1;
      });
    });
    return;
  }

  keyList.map((item) => {
    const buttonsWrapper = [...item.children[0].children[1].children];
    buttonsWrapper.pop();
    buttonsWrapper.map((button) => {
      button.style.opacity = 0;
    });
  });
  keyList.forEach((item) => {
    item.onmouseover = () => {
      if (!isEventDesktop) return;
      item.style.backgroundColor = "var(--elevation--p300)";
      item.style.transition = "all 0.3s";
      item.style.borderRadius = "var(--corner--lg)";

      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 1;
      });
    };
    item.onmouseout = () => {
      if (!isEventDesktop) return;
      item.style.backgroundColor = "";
      item.style.transition = "all 0.3s";

      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 0;
      });
    };
  });

  list.map((item) => {
    const buttonsWrapper = [...item.children[0].children[1].children];
    buttonsWrapper.pop();
    buttonsWrapper.map((button) => {
      button.style.opacity = 0;
    });
  });

  list.forEach((item) => {
    item.onmouseover = () => {
      if (!isEventDesktop) return;
      item.style.backgroundColor = "var(--elevation--p300)";
      item.style.transition = "all 0.3s";

      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 1;
      });
    };
    item.onmouseout = () => {
      if (!isEventDesktop) return;
      item.style.backgroundColor = "";
      item.style.transition = "all 0.3s";

      const buttonsWrapper = [...item.children[0].children[1].children];
      buttonsWrapper.pop();
      buttonsWrapper.map((button) => {
        button.style.opacity = 0;
      });
    };
  });
}


function formatCardDateTime() {
  function formatDate(dateString) {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    const date = new Date(dateString);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedTime = `${hours}:${minutes}${ampm}`;

    return `${day} ${month} ${year} @ ${formattedTime}`;
  }

  const cardDates = document.querySelectorAll(".key-event-card-content");

  cardDates.forEach((card) => {
    const date = card.children[3];
    const format = formatDate(date.innerText);
    const timezone = date.getAttribute("timezone");

    date.innerText = format + " " + abbreviateTimezone(timezone);
  });
}


$(window).on("resize", AttachEventEventsOnDOMLifecycle);

$(document).ready(() => {
  AttachEventEventsOnDOMLifecycle()
  FeaturedVideosCarouselCards()
});

