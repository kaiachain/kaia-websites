window.html2canvas = html2canvas;

function PoweredByKaia() {
  const isFireFox = navigator.userAgent.search('Firefox') > -1
  const cta = document.getElementById("export-partners-cta")
  const targetCanvas = document.querySelector('.partners-export-section')
  const backgroundBlocks = gsap.utils.toArray('.background-export-div')

  const listWells = gsap.utils.toArray('.partner-export-well')
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category')

  if (category) {
    listWells.map(well => {
      const wellHeader = well.querySelector('.partner-export-well-header')
      if (wellHeader.innerText.toLowerCase() === category.toLowerCase()) {
        well.style.display = 'flex'
      } else {
        well.style.display = 'none'
      }
    })
  } else {
    listWells.map(well => {
      const emptyDiv = well.querySelector('.w-dyn-empty')
      if (emptyDiv) {
        well.style.display = 'none'
      }
    })
  }

  async function onClick() {
    cta.onclick = null
    const origPaddingX = targetCanvas.style.paddingRight
    const origPaddingY = targetCanvas.style.paddingTop
    const origDisplay = backgroundBlocks[0].style.display

    targetCanvas.style.paddingRight = '2.81rem'
    targetCanvas.style.paddingLeft = '2.81rem'
    targetCanvas.style.paddingTop = '5rem'
    targetCanvas.style.paddingBottom = '5rem'
    backgroundBlocks.map(block => {
      block.style.display = 'none'
    })


    try {
      const canvas = await html2canvas(targetCanvas, {
        backgroundColor: 'black',
        useCORS: true,
        scale: isFireFox ? 1 : 3
      })

      canvas.style.display = 'none'
      canvas.style.padding = '10px'
      canvas.toBlob((blob) => {
        const newImg = document.createElement("img");
        const url = URL.createObjectURL(blob);

        newImg.onload = () => {
          URL.revokeObjectURL(url);
        };

        newImg.src = url;
        const fileName = `partners-list-${new Date().toJSON()}.bmp`
        const a = document.createElement('a')

        a.setAttribute('download', fileName)
        a.setAttribute('href', url)
        a.click()
        canvas.remove()
        a.remove()

        targetCanvas.style.paddingRight = origPaddingX
        targetCanvas.style.paddingLeft = origPaddingX
        targetCanvas.style.paddingTop = origPaddingY
        targetCanvas.style.paddingBottom = origPaddingY
        backgroundBlocks.map(block => {
          block.style.display = origDisplay
        })
      })
    } catch (err) {
      console.log(err)
    }

    cta.onclick = onClick
  }

  cta.onclick = onClick
}

$(window).on("load", PoweredByKaia)

