import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene(); // creates a scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000); //craetes a camera and sets the FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane
const renderer = new THREE.WebGLRenderer(); // craetes a renderer

renderer.setClearColor(0x000000, 1); // sets the background color
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const Keys = { left: 65, up: 87, right: 68, down: 83 };
const speed = 2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

camera.position.set(0, 20, 100);
const controls = new OrbitControls(camera, renderer.domElement);

controls.update();


renderer.setSize(window.innerWidth, window.innerHeight); // sets the size of the renderer
document.body.appendChild(renderer.domElement); // adds a canvas for the renderer to display the scene

const light = new THREE.AmbientLight({ color: 0xfdfeff, intensity: 1 }); // creates a soft white light
scene.add(light);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('/b2tb.mp3', function(buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(1.0);
  sound.play();
});

const loader2 = new GLTFLoader();
loader2.load( "/Rally.glb", function ( gltf ) {
scene.add( gltf.scene );
})

const loader = new THREE.TextureLoader(); // creates a texture loader
// creates the cube that will be rendered in the scene
let geometry2;
let material2;
loader.load("../img/Cyberpunk.jpg", function (texture){
  geometry2 = new THREE.SphereGeometry(120,80,80);
  material2 = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

  geometry2.scale(-15,15,15);

  const sphere = new THREE.Mesh(geometry2, material2);
  scene.add(sphere);
  sphere.position.set(0,0,0);
});

const addPlane = (x,y,w,h, materialaspect) => {
  const geometry = new THREE.PlaneGeometry( w, h, 200, 200 );
  const material = new THREE.MeshBasicMaterial( materialaspect );
  const plane = new THREE.Mesh( geometry, material );
  plane.position.x = x;
  plane.position.y = y;
  plane.rotation.x = -Math.PI / 2;

  scene.add( plane );
}
const texture2 = new
THREE.TextureLoader().load("../img/snowpattern.png");

const materialAspectFloor = {
  map: texture2,
  side: THREE.DoubleSide,
  transparent: true
}

addPlane(0, -3.6, 200, 200, materialAspectFloor);

const Geoplayer = new THREE.BoxGeometry(10,10,10);
const Matplayer = new THREE.MeshStandardMaterial({ map: loader.load("/froze.png") }); //colour
const player = new THREE.Mesh(Geoplayer, Matplayer); //combines the geometry and material

let group = new THREE.Group();
group.add(player);
scene.add(group); //adds the cube to the scene

player.position.set(-30,10,0);

camera.position.z = 50; //sets the camera position

// animates the cube by rotating it
function animate() {
  requestAnimationFrame(animate); //calls the animate function every frame
  controls.update();

  renderer.render(scene, camera); //renders the scene and camera
}

function draw() {
  if (rightPressed) {
    player.position.x += speed;
  } else if (leftPressed) {
    player.position.x -= speed;
  }

  if (downPressed) {
    player.position.z += speed;
  } else if (upPressed) {
    player.position.z -= speed;
  }

  requestAnimationFrame(draw);
}

function keyDownHandler(event) {
  if (event.keyCode === Keys.right) {
    rightPressed = true;
  } else if (event.keyCode === Keys.left) {
    leftPressed = true;
  }
  if (event.keyCode === Keys.down) {
    downPressed = true;
  } else if (event.keyCode === Keys.up) {
    upPressed = true;
  }
}

function keyUpHandler(event) {
  rightPressed = false;
  leftPressed = false;
  downPressed = false;
  upPressed = false;
}

animate(); //calls the animate function
draw();