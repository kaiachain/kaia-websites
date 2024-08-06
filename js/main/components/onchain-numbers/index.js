function OnChainNumbers() {
  const headings = gsap.utils.toArray(".onchain-heading");
  const imageContainers = gsap.utils.toArray(".onchain-image-container");
  const MAPPING = [
    "marketcap",
    "total_transactions",
    "active_wallets",
    "active_contract_count",
  ];

  $.ajax({
    url: "https://api-homepage.kaia.io/analytics",
  }).done(function(response) {
    const responseData = response.data;
    function formatNumber(num, suffix = "") {
      return Number(num) + suffix;
    }

    headings.map((heading, headingIdx) => {
      let content = responseData[MAPPING[headingIdx]];
      let suffix = "";
      if (
        MAPPING[headingIdx] === "marketcap" ||
        MAPPING[headingIdx] === "total_transactions" ||
        MAPPING[headingIdx] === "active_wallets"
      ) {
        content = (Math.abs(Number(content)) / 1.0e6).toFixed(2);
        suffix = "M+";
      }
      if (MAPPING[headingIdx] === "active_contract_count") {
        content = (Number(content) / 1000).toFixed(2);
        suffix = "K+";
      }
      const loadingIndicators = gsap.utils.toArray(".loading-spinner");
      loadingIndicators.forEach((indicator) => indicator.remove());

      heading.style.display = "block";
      gsap.to(
        {
          value: 0,
        },
        {
          value: content,
          scrollTrigger: heading,
          duration: 5,
          snap: {
            value: 1,
          },
          onUpdate: function() {
            heading.innerHTML = formatNumber(this.targets()[0].value, suffix);
          },
        }
      );
    });
  });
  const display1 = []
  const display2 = []
  const display3 = []
  const display4 = []

  imageContainers.forEach((imageContainer) => {
    const children = gsap.utils.toArray(imageContainer.children)
    display1.push(children[0])
    display2.push(children[1])
    display3.push(children[2])
    display4.push(children[3])
  })

  const animateTimeline = gsap.timeline({
    repeat: -1,
  })
  animateTimeline.timeScale(0.5)
  const timeImageIsVisible = 1.5

  animateTimeline
    .to(display1, timeImageIsVisible, {
      opacity: 1,
      ease: "power3.out",
      stagger: 0.2,
    })
    .to(display2, timeImageIsVisible, {
      opacity: 1,
      ease: "power3.out",
      stagger: 0.2,
    })
    .to(display1, timeImageIsVisible, {
      opacity: 0,
      ease: "power3.out",
      stagger: 0.2,
    }, "<")
    .to(display3, timeImageIsVisible, {
      opacity: 1,
      ease: "power3.out",
      stagger: 0.2,
    })
    .to(display2, timeImageIsVisible, {
      opacity: 0,
      ease: "power3.out",
      stagger: 0.2,
    }, "<")
    .to(display4, timeImageIsVisible, {
      opacity: 1,
      ease: "power3.out",
      stagger: 0.2,
    }).to(display3, timeImageIsVisible, {
      opacity: 0,
      ease: "power3.out",
      stagger: 0.2,
    }, "<")
    .to(display4, timeImageIsVisible, {
      opacity: 0,
      ease: "power3.out",
      stagger: 0.2,
    })
    .to(display1, timeImageIsVisible, {
      opacity: 1,
    }, "<")
}

$(document).ready(OnChainNumbers);
