// Initialise

let pillsMarqueeStarted = false;
let partnerMarqueeScrollTrigger;

function resetMarquee() {
	if (partnerMarqueeScrollTrigger) {
		partnerMarqueeScrollTrigger.kill();
	}

	gsap.killTweensOf(".pill-collection-item");
	gsap.set(".pill-collection-item", { clearProps: "all" }); // Reset the items' properties

	pillsMarqueeStarted = false;
	PillsMarquee();
}
function PillsMarquee() {
	if (pillsMarqueeStarted) return;
	pillsMarqueeStarted = true;

	const pills = gsap.utils.toArray(".pill-collection-item");

	function startAnimation() {
		horizontalLoop(pills, { speed: 1 });
	}

	setTimeout(startAnimation, 2500);
}

$(document).ready(() => {
	PillsMarquee();
});
