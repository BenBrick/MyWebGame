import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene(); // creates a scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //craetes a camera and sets the FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane
const renderer = new THREE.WebGLRenderer(); // craetes a renderer
renderer.setClearColor(0x000000, 1); // sets the background color
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);

camera.position.set(0, 20, 100);
const controls = new OrbitControls(camera, renderer.domElement);

controls.update();


renderer.setSize(window.innerWidth, window.innerHeight); // sets the size of the renderer
document.body.appendChild(renderer.domElement); // adds a canvas for the renderer to display the scene

const loader = new THREE.TextureLoader(); // creates a texture loader
// creates the cube that will be rendered in the scene
let geometry2;
let material2;
loader.load("../img/Cyberpunk.jpg", function (texture){
  geometry2 = new THREE.SphereGeometry(120,80,80);
  material2 = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

  geometry2.scale(-5,5,5);

  const sphere = new THREE.Mesh(geometry2, material2);
  scene.add(sphere);
  sphere.position.set(0,0,0);
});

const geometry = new THREE.SphereGeometry(15, 32, 16); //size
const material = new THREE.MeshStandardMaterial({ map: loader.load("/froze.png") }); //colour
const sphere2 = new THREE.Mesh(geometry, material); //combines the geometry and material

const geometry4 = new THREE.SphereGeometry(15, 32, 16);
const material4 = new THREE.MeshStandardMaterial({ map: loader.load("/froze.png") }); //colour
const sphere = new THREE.Mesh(geometry4, material4);

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

let group = new THREE.Group();
group.add(sphere2, sphere);
scene.add(group); //adds the cube to the scene

const light = new THREE.AmbientLight({ color: 0xfdfeff, intensity: 1 }); // creates a soft white light
scene.add(light);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('/b2tb.mp3', function(buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(1.0);
  sound.play();
});

sphere2.position.set(10, 10, 0);
sphere.position.set(-20, 20, 0);

camera.position.z = 50; //sets the camera position

// animates the cube by rotating it
function animate() {
  requestAnimationFrame(animate); //calls the animate function every frame
  controls.update();
  sphere2.rotation.x += 0.01; //rotates the cube on the x axis
  sphere2.rotation.y += 0.01; //rotates the cube on the y axis
  sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.02;

  renderer.render(scene, camera); //renders the scene and camera
}

animate(); //calls the animate function