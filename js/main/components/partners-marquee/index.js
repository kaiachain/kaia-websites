let partnerMarqueeStarted = false;
let partnerMarqueeScrollTrigger;
let resized;

function resetMarquee() {
    const item = gsap.utils.toArray(".partner-showcase-item");

    if (partnerMarqueeScrollTrigger) {
        partnerMarqueeScrollTrigger.kill();
    }

    gsap.killTweensOf(".partner-showcase-item");
    gsap.set(".partner-showcase-item", { clearProps: "all" });

    resized = true;
    partnerMarqueeStarted = false;
    PartnerMarquee();
}
function PartnerMarquee() {
    if (partnerMarqueeStarted) return;
    partnerMarqueeStarted = true;

    const firstItems = gsap.utils.toArray(".partner-showcase-item.first");
    const secondItems = gsap.utils.toArray(".partner-showcase-item.second");

    function startAnimation() {
        horizontalLoop(secondItems, { speed: 0.5 });
        horizontalLoop(firstItems, { reversed: true, speed: 0.5 });
    }

    if (resized) {
        startAnimation();
        resized = false;
    } else {
        setTimeout(startAnimation, 2500);
    }
}

let partnersPreviousWidth = $(window).width();

$(window).on("resize", () => {
    let partnersCurrentWidth = $(window).width();
    if (partnersCurrentWidth !== partnersPreviousWidth) {
        resetMarquee();
        partnersPreviousWidth = partnersCurrentWidth;
    }
});

$(document).ready(() => {
    PartnerMarquee();
});

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".partner-showcase-icons");
    images.forEach((img) => {
        img.setAttribute("loading", "eager");
    });
});
