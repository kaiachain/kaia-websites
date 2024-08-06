let openedAccordionIdx = 0;

function hideAccordionContent(accordionItem) {
  const [header, content] = gsap.utils.toArray(accordionItem.children);
  const iconContainer = header.children[1];
  const verticalBar = iconContainer.children[1];
  const headerText = header.children[0].children[0];

  const hideTimeline = gsap.timeline();
  hideTimeline.timeScale(2);
  hideTimeline
    .to(content.children, { opacity: 0 })
    .to(content, { height: 0 })
    .to(verticalBar, { rotation: 90 }, "<")
    .to(headerText, { color: "var(--greyscale--fg--subtlest)" }, "<");
}

function showAccordionContent(item) {
  const [header, content] = gsap.utils.toArray(item.children);
  const iconContainer = header.children[1];
  const verticalBar = iconContainer.children[1];
  const headerText = header.children[0].children[0];
  const showTimeline = gsap.timeline({
    onStart: function () {
      gsap.set(item, { clearProps: "flex" });
    },
  });
  showTimeline.timeScale(2);

  showTimeline

    .to(content, {
      height: "auto",
    })
    .set(content, { clearProps: "padding" })
    .to(item, {
      height: "auto",
    })
    .to(verticalBar, { rotation: 0 }, "<")
    .to(content.children, { opacity: 1 }, "<")
    .to(headerText, { color: "var(--brand--fg--neutral)" }, "<");
}

function Accordion() {
  const accordionItem = gsap.utils.toArray(".accordion-item");
  accordionItem.forEach((item, idx) => {
    if (idx !== 0) {
      hideAccordionContent(item);
    } else {
      const headerText = item.children[0].children[0];
      gsap.to(headerText, { color: "var(--brand--fg--neutral)" });
    }
  });

  accordionItem.map((item, idx) => {
    const circleOutline = item.children[0].children[1];
    circleOutline.style.transition = "background-color 0.3s, color 0.3s";

    const icon = item.children[0].children[1];
    const iconColor = icon.style.color;
    item.onmouseover = () => {
      icon.style.backgroundColor = iconColor;
    };
    item.onmouseout = () => {
      icon.style.backgroundColor = "";
    };

    item.onclick = () => {
      if (idx !== openedAccordionIdx) {
        showAccordionContent(item);
        if (openedAccordionIdx !== null) {
          hideAccordionContent(accordionItem[openedAccordionIdx]);
        }
        openedAccordionIdx = idx;
      } else {
        hideAccordionContent(item);
        openedAccordionIdx = null;
      }
    };
  });
}

let accordionPreviousWidth = window.innerWidth;

window.addEventListener("DOMContentLoaded", () => {
  accordionPreviousWidth = window.innerWidth;
  Accordion();
});
