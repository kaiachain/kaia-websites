const navbarTablet = () => {
  let openedIdx;
  const menuItems = gsap.utils.toArray(".nav-block.expandable");
  const drawerItems = gsap.utils.toArray(".navbar-drawer-content-div.tablet");

  $(window).click(function() {
    if (openedIdx === undefined) return;
    closeAnimation(menuItems[openedIdx], openedIdx);
  });

  $(".navbar-drawer-content-div.tablet").click(function(event) {
    event.stopPropagation();
  });

  $(".nav-block").click(function(event) {
    event.stopPropagation();
  });

  const closeAnimation = (menuItem, idx) => {
    const timeline = gsap.timeline();
    timeline.timeScale(5);
    const [_, symbol] = gsap.utils.toArray(menuItem.children);

    timeline.to(
      menuItem,
      {
        color: "var(--greyscale--fg--subtlest)",
      },
      "<"
    );

    timeline.to(symbol, { rotation: 0 }, "<");

    timeline.to(
      drawerItems[idx],
      {
        height: 0,
      },
      "<"
    );
  };

  const openAnimation = (menuItem, idx) => {
    const timeline = gsap.timeline();
    timeline.timeScale(5);
    const [_, symbol] = gsap.utils.toArray(menuItem.children);

    timeline.to(
      menuItem,
      {
        color: "var(--brand--fg--neutral)",
      },
      "<"
    );
    timeline.to(
      symbol,
      {
        rotation: 45,
      },
      "<"
    );
    drawerItems.map((drawerItems, drawerIdx) => {
      if (drawerIdx !== idx) {
        timeline.to(drawerItems, { height: 0 }, "<");
      }
    });
    menuItems.map((otherMenuItem, omIdx) => {
      if (omIdx !== idx) {
        timeline.to(
          otherMenuItem,
          {
            color: "var(--greyscale--fg--subtlest)",
          },
          "<"
        );
        const [_, otherMenuItemSym] = gsap.utils.toArray(
          otherMenuItem.children
        );
        timeline.to(otherMenuItemSym, { rotation: 0 }, "<");
      }
    });
    const hasComingSoon = !!drawerItems[idx].querySelector('.coming-soon-block');
    timeline.to(
      drawerItems[idx],
      {
        height: hasComingSoon ? "4rem" : "auto",
      },
      "<"
    );
  };

  menuItems.map((menuItem, idx) => {
    menuItem.onclick = () => {
      if (openedIdx !== idx) {
        openAnimation(menuItem, idx);
        openedIdx = idx;
      } else {
        closeAnimation(menuItem, idx);
        openedIdx = undefined;
      }
    };
  });
};

const desktop = () => {
  const menuItems = gsap.utils.toArray(".nav-block.expandable");
  const drawerItems = gsap.utils.toArray(".navbar-drawer-content-div.desktop");
  const drawer = document.querySelector(".navbar-drawer");
  const DEFAULT_HEIGHT = "10rem"
  const heightMap = {
    0: "19rem",
    1: "24rem",
    2: "14rem",
    3: "18rem",
  };

  let openedIdx;

  const closeAnimation = (menuItem, idx) => {
    isAnimating = true;
    const timeline = gsap.timeline();
    timeline.timeScale(5);
    const [_, symbol] = gsap.utils.toArray(menuItem.children);
    timeline.to(
      menuItem,
      {
        color: "var(--brand--fg--neutral)",
      },
      "<"
    );
    timeline.to(".navbar-drawer", { height: "0" });
    timeline.to(
      menuItem,
      {
        color: "var(--greyscale--fg--subtlest)",
      },
      "<"
    );
    timeline.to(symbol, { rotation: 0 }, "<");
    timeline.to(
      drawerItems[idx],
      {
        height: 0,
      },
      "<"
    );
    setTimeout(() => {
      isAnimating = false;
    }, 100);
  };

  const openAnimation = (menuItem, idx) => {
    isAnimating = true;
    const timeline = gsap.timeline();
    timeline.timeScale(5);
    const [_, symbol] = gsap.utils.toArray(menuItem.children);
    timeline.to(
      menuItem,
      {
        color: "var(--brand--fg--neutral)",
      },
      "<"
    );
    timeline.to(symbol, { rotation: 45 }, "<");
    menuItems.map((otherMenuItem, omIdx) => {
      if (omIdx !== idx) {
        timeline.to(
          otherMenuItem,
          {
            color: "var(--greyscale--fg--subtlest)",
          },
          "<"
        );
        const [_, otherMenuItemSym] = gsap.utils.toArray(
          otherMenuItem.children
        );
        timeline.to(otherMenuItemSym, { rotation: 0 }, "<");
      }
    });

    drawerItems.map((drawerItem, drawerIdx) => {
      if (drawerIdx !== idx) {
        timeline.to(
          drawerItem,
          {
            height: 0,
          },
          "<"
        );
      }
    });
    const hasComingSoon = !!drawerItems[idx].querySelector('.coming-soon-block');
    timeline.to(".navbar-drawer", { height: hasComingSoon ? DEFAULT_HEIGHT : heightMap[idx] });
    timeline.to(
      drawerItems[idx],
      {
        height: "auto",
      },
      "<"
    );
    setTimeout(() => {
      isAnimating = false;
    }, 100);
  };

  let isMouseOverNav = false;
  let isMouseOverDrawer = false;
  let navMouseLeaveTimeout;
  let isAnimating = false;

  function checkMouseLeave() {
    if (!isMouseOverNav && !isMouseOverDrawer) {
      if (openedIdx !== undefined) {
        closeAnimation(menuItems[openedIdx], openedIdx);
        openedIdx = undefined;
      }
    }
  }

  menuItems.forEach((menuItem, idx) => {
    menuItem.addEventListener("mouseover", () => {
      if (!isAnimating && openedIdx !== idx) {
        openAnimation(menuItem, idx);
        openedIdx = idx;
      }
      isMouseOverNav = true;
      clearTimeout(navMouseLeaveTimeout);
    });

    menuItem.addEventListener("mouseleave", () => {
      navMouseLeaveTimeout = setTimeout(() => {
        isMouseOverNav = false;
        checkMouseLeave();
      }, 100);
    });

    drawer.addEventListener("mouseenter", function() {
      isMouseOverDrawer = true;
      isMouseOverNav = false;
      clearTimeout(navMouseLeaveTimeout);
    });

    drawer.addEventListener("mouseleave", function() {
      isMouseOverDrawer = false;
      checkMouseLeave();
    });
  });
};

const navBar = () => {
  const isTablet = document.body.clientWidth <= 1180;
  if (isTablet) return navbarTablet();

  return desktop();
};

$(document).ready(navBar);
$(window).on("resize", navBar);
