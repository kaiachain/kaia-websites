function openModal(clickedSocial) {
	const socials = gsap.utils.toArray(".socials-button");

	socials.forEach((social) => {
		if (clickedSocial !== social) {
			const modal = social.children[1];
			if (modal) {
				modal.style.display = "none";
				social.style.removeProperty("color");
				social.style.removeProperty("background-color");
			}
		}
	});
	const modal = clickedSocial.children[1];
	modal.style.display = "flex";
	clickedSocial.style.color = "var(--greyscale--fg--strongest)";
	clickedSocial.style.backgroundColor = "var(--brand--fg--neutral)";
}

function closeModal(openedSocial) {
	const modal = openedSocial.children[1];
	modal.style.display = "none";
	openedSocial.style.removeProperty("color");
	openedSocial.style.removeProperty("background-color");
}

function Footer() {
	const socials = gsap.utils.toArray(".socials-button");
	socials.map((social) => {
		const modal = social.children[1];
		if (modal) {
			social.children[0].onclick = () => {
				openModal(social);
			};
			const closeButton = modal.children[0].children[0];
			closeButton.onclick = () => {
				closeModal(social);
			};
		}
	});
}

$(document).ready(Footer);
