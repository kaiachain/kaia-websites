
function updateLinkBackWithCategory() {
  const partnerCategory = gsap.utils.toArray('.partner-header-eyebrow.capitalize')
  const link = document.getElementById('ecosystem-link-back')

  const url = new URL(link).toString()
  const searchParams = new URLSearchParams()

  searchParams.set('partner', partnerCategory[0].getAttribute('raw-val'))

  let newUrl = url.toString() + '?' + searchParams.toString()
  link.href = newUrl
}

function PartnerDetails() {
  const copyLinks = gsap.utils.toArray('.copy-link')
  const reportBtn = document.querySelector('.report-button')
  const copiedContainer = document.getElementById('copied-container')

  copyLinks.map(link => {
    link.addEventListener('click', () => {
      // const url = link.getAttribute('external-url')
      const container = link.children[0]
      navigator.clipboard.writeText(window.location.href).then(() => {
        const icons = gsap.utils.toArray(container.children)
        gsap.timeline()
          .to(copiedContainer, { opacity: 1 })
          .to(icons[0], {
            opacity: 0,
          }, "<")
          .to(icons[1], {
            opacity: 1,
          }, "<")
          .to(icons[1], {
            opacity: 0,
          })
          .to(icons[0], {
            opacity: 1,
          }, '<')
          .to(copiedContainer, { opacity: 0 })
      }, (err) => {
        console.error(err)
      })
    })
  })

  if (reportBtn) {
    const recipient = reportBtn.getAttribute('email-target')
    const partnerName = reportBtn.getAttribute('email-subject')
    const url = `mailto:${recipient}?subject=Report ${partnerName}`
    reportBtn.href = url
  }
  updateLinkBackWithCategory()
}


$(window).on("load", PartnerDetails)
