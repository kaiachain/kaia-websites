function Devlist() {
	const rightArrow = $(".right-arrow-filter-wrapper");
	const leftArrow = $(".left-arrow-filter-wrapper");
	const filterList = $(".developer-filter-collection-list");

	$("#all-filter").detach().prependTo(".developer-filter-collection-list");

	function startingState() {
		toggleLeftArrow(false);
		checkIfRightOverflow();
	}
	startingState();

	function checkIfLeftOverflow() {
		if (filterList.scrollLeft() === 0) {
			toggleLeftArrow(false);
		} else {
			toggleLeftArrow(true);
		}
	}
	function checkIfRightOverflow() {
		if (
			filterList.scrollLeft() + filterList.innerWidth() >=
			filterList[0].scrollWidth
		) {
			toggleRightArrow(false);
		} else {
			toggleRightArrow(true);
		}
	}

	rightArrow.click(() => {
		filterList.animate({ scrollLeft: "+=200" }, 500, function () {
			checkIfLeftOverflow();
			checkIfRightOverflow();
		});
	});
	leftArrow.click(() => {
		filterList.animate({ scrollLeft: "-=200" }, 500, function () {
			checkIfLeftOverflow();
			checkIfRightOverflow();
		});
	});

	function toggleLeftArrow(show) {
		if (show) {
			gsap.to(leftArrow, { opacity: 1, width: "3rem", duration: 0.5 });
		} else {
			gsap.to(leftArrow, { opacity: 0, width: 0, duration: 0.5 });
		}
	}
	function toggleRightArrow(show) {
		if (show) {
			gsap.to(rightArrow, { opacity: 1, width: "3rem", duration: 0.5 });
		} else {
			gsap.to(rightArrow, { opacity: 0, width: 0, duration: 0.5 });
		}
	}
}

document.addEventListener("DOMContentLoaded", Devlist);
