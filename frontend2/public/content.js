

// import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
// import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/OBJLoader2.js';


let hlight, light2, light3, light4, loader, directionalLight, mesh, material


  /**
  * Generate a scene object with a background color
  **/

 function getScene() {
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

/**
* Generate the camera to be used in the scene. Camera args:
*   [0] field of view: identifies the portion of the scene
*     visible at any time (in degrees)
*   [1] aspect ratio: identifies the aspect ratio of the
*     scene in width/height
*   [2] near clipping plane: objects closer than the near
*     clipping plane are culled from the scene
*   [3] far clipping plane: objects farther than the far
*     clipping plane are culled from the scene
**/

function getCamera() {
  let aspectRatio = window.innerWidth / window.innerHeight;
  let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 1, -10);
  return camera;
}

/**
* Generate the light to be used in the scene. Light args:
*   [0]: Hexadecimal color of the light
*   [1]: Numeric value of the light's strength/intensity
*   [2]: The distance from the light where the intensity is 0
* @param {obj} scene: the current scene object
**/

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(1, 1, 1);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

/**
* Generate the renderer to be used in the scene
**/

function getRenderer() {
  // Create the canvas with a renderer
  var canvasElem = document.querySelector("#c");
  var renderer = new THREE.WebGLRenderer({canvasElem});
  // Add support for retina displays
  renderer.setPixelRatio(window.devicePixelRatio);
  // Specify the size of the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the canvas to the DOM
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
* Generate the controls to be used in the scene
* @param {obj} camera: the three.js camera for the scene
* @param {obj} renderer: the three.js renderer for the scene
**/

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

/**
* Load Nimrud model
**/

function loadModel() {
  var loader = new THREE.OBJLoader();
  loader.load( "https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj", function ( object ) {
    object.rotation.z = Math.PI;
    scene.add( object );
    document.querySelector('h1').style.display = 'none';
  } );
}

/**
* Render!
**/

function render(camera, scene, renderer) {
  requestAnimationFrame(render);
  console.log(camera)
  renderer.render(scene, camera);
  controls.update();
};

function createModel(canvasElem) {
  
loadModel()

let scene = getScene();
let camera = getCamera();
console.log(scene)
let light = getLight(scene);
let renderer = getRenderer();
let controls = getControls(camera, renderer);

// camera = getCamera()
// console.log(camera)
// scene= getScene()

render(camera, scene, renderer);

}

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

// function createModel(canvasElem) {

//   const renderer = new THREE.WebGLRenderer({canvasElem})

  
//   const fov = 45;
//   const aspect = 2;  // the canvasElem default
//   const near = 0.1;
//   const far = 100;
//   const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   camera.position.set(0, 10, 20);

//   const controls = new OrbitControls(camera, canvasElem);
//   controls.target.set(0, 5, 0);
//   controls.update();

//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color('black');

//   {
//     const planeSize = 40;

//     const loader = new THREE.TextureLoader();
//     const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.magFilter = THREE.NearestFilter;
//     const repeats = planeSize / 2;
//     texture.repeat.set(repeats, repeats);

//     const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
//     const planeMat = new THREE.MeshPhongMaterial({
//       map: texture,
//       side: THREE.DoubleSide,
//     });
//     const mesh = new THREE.Mesh(planeGeo, planeMat);
//     mesh.rotation.x = Math.PI * -.5;
//     scene.add(mesh);
//   }

//   {
//     const skyColor = 0xB1E1FF;  // light blue
//     const groundColor = 0xB97A20;  // brownish orange
//     const intensity = 1;
//     const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
//     scene.add(light);
//   }

//   {
//     const color = 0xFFFFFF;
//     const intensity = 1;
//     const light = new THREE.DirectionalLight(color, intensity);
//     light.position.set(0, 10, 0);
//     light.target.position.set(-5, 0, 0);
//     scene.add(light);
//     scene.add(light.target);
//   }

//   {
//     const objLoader = new OBJLoader2();
//     objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (root) => {
//       scene.add(root);
//     });
//   }

//   function resizeRendererToDisplaySize(renderer) {
//     const canvasElem = renderer.domElement;
//     const width = canvasElem.clientWidth;
//     const height = canvasElem.clientHeight;
//     const needResize = canvasElem.width !== width || canvasElem.height !== height;
//     if (needResize) {
//       renderer.setSize(width, height, false);
//     }
//     return needResize;
//   }

//   function render() {

//     if (resizeRendererToDisplaySize(renderer)) {
//       const canvasElem = renderer.domElement;
//       camera.aspect = canvasElem.clientWidth / canvasElem.clientHeight;
//       camera.updateProjectionMatrix();
//     }

//     renderer.render(scene, camera);

//     requestAnimationFrame(render);
//   }

//   requestAnimationFrame(render);


//   // renderer = new THREE.WebGLRenderer()
//   // renderer.setSize(content.window.innerWidth, content.window.innerHeight)
//   // scene = new THREE.Scene()
//   // scene.background = new THREE.Color(0xdddddd)


//   // // Create material
//   // material = new THREE.MeshPhongMaterial();


//   // camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000)
//   // camera.rotation.y = 45/180*Math.PI;
//   // camera.position.x = 800;
//   // camera.position.y = 100;
//   // camera.position.z = 1000;
//   // console.log(content)
//   // var renderer = new THREE.WebGLRenderer();
//   // renderer.setSize(window.innerWidth,window.innerHeight);
//   // $(content).append(renderer.domElement);

//   // hlight = new THREE.AmbientLight (0x404040,100);
//   // scene.add(hlight);
//   // directionalLight = new THREE.DirectionalLight(0xffffff,100);
//   // directionalLight.position.set(0,1,0);
//   // directionalLight.castShadow = true;
//   // scene.add(directionalLight);
//   // light = new THREE.PointLight(0xc4c4c4,10);
//   // light.position.set(0,300,500);
//   // scene.add(light);
//   // light2 = new THREE.PointLight(0xc4c4c4,10);
//   // light2.position.set(500,100,0);
//   // scene.add(light2);
//   // light3 = new THREE.PointLight(0xc4c4c4,10);
//   // light3.position.set(0,100,-500);
//   // scene.add(light3);
//   // light4 = new THREE.PointLight(0xc4c4c4,10);
//   // light4.position.set(-500,300,500);
//   // scene.add(light4);

//   // // Create cube and add to scene.
//   // var geometry = new THREE.BoxGeometry(200, 200, 200);
//   // mesh = new THREE.Mesh(geometry, material);
//   // scene.add(mesh);

// }

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
    const canvasElem = document.createElement('canvas');
    content.appendChild(canvasElem)
    canvasElem.setAttribute("id", "c")
    createModel(canvasElem)
    if (overlayContent.firstChild) {
      overlayContent.removeChild(overlayContent.firstChild)
    }
    overlayContent.appendChild(content)
    overlay.style.display = "block"
    console.log(overlay)
  });
});
