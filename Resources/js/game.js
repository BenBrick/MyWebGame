import * as THREE from "three";


const scene = new THREE.Scene(); // creates a scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //craetes a camera and sets the FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane

const renderer = new THREE.WebGLRenderer(); // craetes a renderer
renderer.setSize(window.innerWidth, window.innerHeight); // sets the size of the renderer
document.body.appendChild(renderer.domElement); // adds a canvas for the renderer to display the scene

// creates the cube that will be rendered in the scene
const geometry = new THREE.BoxGeometry(1, 1, 1); //size
const material = new THREE.MeshStandardMaterial({ color: 0x0000ff }); //colour
const cube = new THREE.Mesh(geometry, material); //combines the geometry and material
scene.add(cube); //adds the cube to the scene
const light = new THREE.AmbientLight( 0xfdfeff,1 ); // creates a soft white light
scene.add(light);

camera.position.z = 5; //sets the camera position

// animates the cube by rotating it
function animate() {
  requestAnimationFrame(animate); //calls the animate function every frame

  cube.rotation.x += 0.01; //rotates the cube on the x axis
  cube.rotation.y += 0.01; //rotates the cube on the y axis

  renderer.render(scene, camera); //renders the scene and camera
}

animate(); //calls the animate function