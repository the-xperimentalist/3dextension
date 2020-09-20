function createOverlay() {
  const overlay = document.createElement('div')
  overlay.id = 'model-modal'
  overlay.classList.add('overlay')

  const closeBtn = document.createElement('a')
  closeBtn.href = "javascript:void(0)"
  closeBtn.classList.add('closebtn')
  closeBtn.innerHTML = "&times;"
  closeBtn.onclick = function () {
    overlay.style.display = "none"
  }

  overlay.appendChild(closeBtn)

  const overlayContent = document.createElement('div')
  overlayContent.classList.add("overlay-content")

  overlay.appendChild(overlayContent)

  return {
    overlay,
    overlayContent,
    closeBtn
  }
}

let scene, camera, hlight, light, light2, light3, light4, loader, directionalLight

function createModel(content) {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xdddddd)

  camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000)
  camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  $(content).append(renderer.domElement);

  hlight = new THREE.AmbientLight (0x404040,100);
  scene.add(hlight);
  directionalLight = new THREE.DirectionalLight(0xffffff,100);
  directionalLight.position.set(0,1,0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  light = new THREE.PointLight(0xc4c4c4,10);
  light.position.set(0,300,500);
  scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4,10);
  light2.position.set(500,100,0);
  scene.add(light2);
  light3 = new THREE.PointLight(0xc4c4c4,10);
  light3.position.set(0,100,-500);
  scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4,10);
  light4.position.set(-500,300,500);
  scene.add(light4);

  loader = new THREE.OBJLoader();
  loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/557388/star.obj", function(object) {
    scene.add(object);
  });
}

function disposeModel() {
  scene = null
  hlight = null
  loader = null
  camera = null
  directionalLight = null
  light = null
  light2 = null
  light3 = null
  light4 = null
}

$(window).on("load", function () {
  const btnStyle = `
    border-radius: 10px !important; width: auto !important; height: 20px !important; padding: 0px 8px !important; text-align: center !important; vertical-align: middle !important; font: bold 11px / 20px &quot;Helvetica Neue&quot;, Helvetica, sans-serif !important; color: rgb(255, 255, 255) !important; background: url(&quot;data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjYiIGZpbGw9IiNFNjAwMjMiPjwvY2lyY2xlPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNkMwIDguNTYxNSAxLjYwNTUgMTAuNzQ4NSAzLjg2NSAxMS42MDlDMy44MSAxMS4xNDA1IDMuNzUxNSAxMC4zNjggMy44Nzc1IDkuODI2QzMuOTg2IDkuMzYgNC41NzggNi44NTcgNC41NzggNi44NTdDNC41NzggNi44NTcgNC4zOTk1IDYuNDk5NSA0LjM5OTUgNS45N0M0LjM5OTUgNS4xNCA0Ljg4MDUgNC41MiA1LjQ4IDQuNTJDNS45OSA0LjUyIDYuMjM2IDQuOTAyNSA2LjIzNiA1LjM2MUM2LjIzNiA1Ljg3MzUgNS45MDk1IDYuNjM5NSA1Ljc0MSA3LjM1QzUuNjAwNSA3Ljk0NDUgNi4wMzk1IDguNDI5NSA2LjYyNTUgOC40Mjk1QzcuNjg3IDguNDI5NSA4LjUwMzUgNy4zMSA4LjUwMzUgNS42OTRDOC41MDM1IDQuMjYzNSA3LjQ3NTUgMy4yNjQgNi4wMDggMy4yNjRDNC4zMDkgMy4yNjQgMy4zMTE1IDQuNTM4NSAzLjMxMTUgNS44NTZDMy4zMTE1IDYuMzY5NSAzLjUwOSA2LjkxOTUgMy43NTYgNy4yMTlDMy44MDQ1IDcuMjc4NSAzLjgxMiA3LjMzIDMuNzk3NSA3LjM5MDVDMy43NTIgNy41Nzk1IDMuNjUxIDcuOTg1IDMuNjMxNSA4LjA2OEMzLjYwNSA4LjE3NyAzLjU0NSA4LjIwMDUgMy40MzE1IDguMTQ3NUMyLjY4NTUgNy44MDA1IDIuMjE5NSA2LjcxIDIuMjE5NSA1LjgzNEMyLjIxOTUgMy45NDk1IDMuNTg4IDIuMjE5NSA2LjE2NTUgMi4yMTk1QzguMjM3NSAyLjIxOTUgOS44NDggMy42OTYgOS44NDggNS42NjlDOS44NDggNy43Mjc1IDguNTUwNSA5LjM4NDUgNi43NDg1IDkuMzg0NUM2LjE0MyA5LjM4NDUgNS41NzQ1IDkuMDY5NSA1LjM3OTUgOC42OThDNS4zNzk1IDguNjk4IDUuMDggOS44MzkgNS4wMDc1IDEwLjExOEM0Ljg2NjUgMTAuNjYgNC40NzU1IDExLjM0NiA0LjIzMyAxMS43MzU1QzQuNzkyIDExLjkwNzUgNS4zODUgMTIgNiAxMkM5LjMxMzUgMTIgMTIgOS4zMTM1IDEyIDZDMTIgMi42ODY1IDkuMzEzNSAwIDYgMEMyLjY4NjUgMCAwIDIuNjg2NSAwIDZaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8L3N2Zz4=&quot;) 4px 50% / 12px 12px no-repeat rgb(230, 0, 35) !important; position: absolute !important; opacity: 1 !important; z-index: 8675309 !important; display: none; cursor: pointer !important; border: none !important; -webkit-font-smoothing: antialiased !important;
  `
  let images = document.getElementsByTagName('img')

  const body = document.querySelector('body')
  const span = document.createElement('span')
  span.id = 'hover-btn'
  span.style = btnStyle
  span.textContent = 'Save'

  body.appendChild(span)

  const {overlay, overlayContent} = createOverlay()

  body.appendChild(overlay)

  $(span).click(function () {
    disposeModel()
    const content = document.createElement('div')
    createModel(content)
    if (overlayContent.firstChild) {
      overlayContent.removeChild(overlayContent.firstChild)
    }
    overlayContent.appendChild(content)
    console.log(overlay)
    overlay.style.display = "block"
  })

  $('img').each(function () {
    if (this.src.includes('https') && this.src.includes('.jpg')) {
      $(this).mouseover(function () {
        const position = $(this).position()
        const parentPosition = $(this).offsetParent().position()
        // $(this).css('display', 'block')

        $(span)
          .css('top', position.top + parentPosition.top)
          .css('left', position.left).show()

      }).mouseout(function () {
        $(span).hide()
      })
    }
  })
})
