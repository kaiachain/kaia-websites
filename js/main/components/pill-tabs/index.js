let openedPillIndex = 0;
let isMobilePillTabs = document.body.clientWidth <= 767;

function hidePillContent(pill) {
	const [header, content] = gsap.utils.toArray(pill.children);
	const iconContainer = header.children[1];
	const verticalBar = iconContainer.children[1];
	const bounds = header.getBoundingClientRect();

	const hideTimeline = gsap.timeline();
	hideTimeline.timeScale(2);

	hideTimeline
		.to(content, { ...(isMobilePillTabs ? { height: 0 } : { width: 0 }) })
		.to(
			pill,
			{
				...(isMobilePillTabs
					? { height: 80, width: "100%" }
					: { width: bounds.width, height: bounds.height }),
				flex: "none",
			},
			"<"
		)
		.to(verticalBar, { rotation: 90 }, "<")
		.to(header, { backgroundColor: "var(--brand--bg--subtler)" }, "<");
}

function showPillContent(pill) {
	const [header, content] = gsap.utils.toArray(pill.children);
	const iconContainer = header.children[1];
	const verticalBar = iconContainer.children[1];
	const showTimeline = gsap.timeline({
		onStart: function () {
			gsap.set(pill, { clearProps: "flex" });
		},
	});
	showTimeline.timeScale(2);

	showTimeline
		.to(content, {
			...(isMobilePillTabs
				? { height: "auto", width: "auto" }
				: { width: "auto" }),
		})
		.from(content, { opacity: 0 }, "<")
		.to(
			pill,
			{
				...(isMobilePillTabs ? { height: "auto" } : { width: "auto" }),
			},
			"<"
		)
		.to(verticalBar, { rotation: 0 }, "<")
		.to(header, { backgroundColor: "var(--brand--bg--neutral)" }, "<");
}

function resetPillTabsState() {
	openedPillIndex = 0;
	const pills = gsap.utils.toArray(".pill");
	pills.map((pill) => {
		const [header, content] = gsap.utils.toArray(pill.children);
		const iconContainer = header.children[1];
		const verticalBar = iconContainer.children[1];

		gsap.set(pill, { clearProps: "all" });
		gsap.set(content, { clearProps: "all" });
		gsap.set(iconContainer, { clearProps: "all" });
		gsap.set(verticalBar, { clearProps: "all" });
		gsap.set(header, { clearProps: "all" });
	});
}

function PillTabs() {
	isMobilePillTabs = document.body.clientWidth <= 767;
	const pills = gsap.utils.toArray(".pill");
	const [_, two, three] = pills;

	hidePillContent(two);
	hidePillContent(three);

	pills.map((pill, idx) => {
		const circleOutline = pill.children[0].children[1];

		circleOutline.style.transition = "background-color 0.3s, color 0.3s";

		pill.children[0].onmouseover = () => {
			const pillColor = getComputedStyle(pill.children[0]).backgroundColor;
			circleOutline.style.backgroundColor = "var(--accent--bg--neutral)";
			circleOutline.style.color = pillColor;
		};
		pill.children[0].onmouseout = () => {
			circleOutline.style.backgroundColor = "transparent";
			circleOutline.style.color = "var(--accent--bg--neutral)";
		};
		pill.onclick = () => {
			if (idx !== openedPillIndex) {
				showPillContent(pill);
				circleOutline.style.backgroundColor = "transparent";
				circleOutline.style.color = "var(--accent--bg--neutral)";
				if (openedPillIndex !== null) {
					hidePillContent(pills[openedPillIndex]);
				}
				openedPillIndex = idx;
			} else {
				hidePillContent(pill);
				openedPillIndex = null;
			}
		};
	});
}

let previousWidth = $(window).width();

$(window).on("resize", () => {
	let currentWidth = $(window).width();
	if (currentWidth !== previousWidth) {
		resetPillTabsState();
		PillTabs();
		previousWidth = currentWidth;
	}
});

$(document).ready(() => {
	previousWidth = $(window).width();
	PillTabs();
});
