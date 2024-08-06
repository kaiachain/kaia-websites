
function videoContainer() {
  const iframe = document.getElementById('video-intro')
  gsap.timeline({
    onComplete: () => {
      const currentSrc = iframe.getAttribute('src')
      iframe.src = currentSrc + '&autoplay=1'
    },
    scrollTrigger: {
      trigger: '.video-container',
      start: 'top center',
      end: 'top center',
    }
  })
}

$(document).ready(videoContainer)
