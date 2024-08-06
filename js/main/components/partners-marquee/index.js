let partnerMarqueeStarted = false;
let partnerMarqueeScrollTrigger;

function resetMarquee() {
  const item = gsap.utils.toArray(".partner-showcase-item");
  if (partnerMarqueeScrollTrigger) {
    partnerMarqueeScrollTrigger.kill();
  }

  gsap.killTweensOf(".partner-showcase-item");
  gsap.set(".partner-showcase-item", { clearProps: "all" }); // Reset the items' properties

  partnerMarqueeStarted = false;
  PartnerMarquee();
}

function PartnerMarquee() {
  if (partnerMarqueeStarted) return;

  const firstItems = gsap.utils.toArray(".partner-showcase-item.first");
  const secondItems = gsap.utils.toArray(".partner-showcase-item.second");

  horizontalLoop(secondItems, { speed: 0.5 });
  horizontalLoop(firstItems, { reversed: true, speed: 0.5 });
  partnerMarqueeStarted = true;
}

let partnersPreviousWidth = $(window).width();

$(window).on("resize", () => {
  clearTimeout(window.resizeTimeout);

  let currentWidth = $(window).width();
  if (currentWidth !== partnersPreviousWidth) {
    window.resizeTimeout = setTimeout(resetMarquee, 200);
    partnersPreviousWidth = currentWidth;
  }
});

$(document).ready(() => {
  partnersPreviousWidth = $(window).width();
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(PartnerMarquee, 200);
});
