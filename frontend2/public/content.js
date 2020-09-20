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

// var scene = new THREE.Scene();
//
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.z = 200;
//
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
//
// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);
//
// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.position.set(100, 0, 100);
//
// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();
//
// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);
//
// var objLoader = new THREE.OBJLoader();
// objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', function (object) {
//     scene.add(object);
//
// });
//
// var animate = function () {
// 	requestAnimationFrame( animate );
// 	renderer.render(scene, camera);
// };
//
// animate();



const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  // const controls = new THREE.OrbitControls(camera, canvas);
  // controls.target.set(0, 5, 0);
  // controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const objLoader = new THREE.OBJLoader();

    console.log(window.location.href)

    objLoader.load('https://threedextensionmodel.blob.core.windows.net/uploadmodelsontainer/mugobj.obj', (root) => {
      scene.add(root);
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

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

const images = document.querySelectorAll('img');

const htmlButton = `
  <button class="img-btn tooltipped tooltipped-s" aria-label="Click to show model">
    Click
  </button>`;

images.forEach((img) => {
  if (img.src.includes('https') && (img.src.includes('.jpg') || img.src.includes('jpeg'))) {
    const parent = img.parentNode;
    const wrapper = document.createElement('div');

    parent.replaceChild(wrapper, img);
    wrapper.appendChild(img);

    wrapper.classList.add('codecopy');
    wrapper.firstChild.insertAdjacentHTML('beforebegin', htmlButton);
  }
});

// Replace tooltip message when mouse leaves button
// and prevent page refresh after click button

const btns = document.querySelectorAll('.img-btn');

const {overlay, overlayContent} = createOverlay()

document.querySelector('body').appendChild(overlay)

btns.forEach((btn) => {
  btn.addEventListener('mouseleave', (e) => {
    e.target.setAttribute('aria-label', 'Click to show model');
    e.target.blur();
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    disposeModel()
    const content = document.createElement('div')
    createModel(content)
    if (overlayContent.firstChild) {
      overlayContent.removeChild(overlayContent.firstChild)
    }
    console.log(content)
    overlayContent.appendChild(content)
    overlay.style.display = "block"
    console.log(overlay)
  });
});
