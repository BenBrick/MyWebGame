import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene(); // creates a scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //craetes a camera and sets the FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane
const listener = new THREE.AudioListener();
camera.add( listener );
const sound = new THREE.Audio( listener );
const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 20, 100 );
controls.update();

const renderer = new THREE.WebGLRenderer(); // craetes a renderer
renderer.setSize(window.innerWidth, window.innerHeight); // sets the size of the renderer
document.body.appendChild(renderer.domElement); // adds a canvas for the renderer to display the scene

const loader = new THREE.TextureLoader(); // creates a texture loader
// creates the cube that will be rendered in the scene
const geometry = new THREE.BoxGeometry(10, 10, 10); //size
const material = new THREE.MeshStandardMaterial({ map:loader.load("/ben.jpg") }); //colour
const cube = new THREE.Mesh(geometry, material); //combines the geometry and material

const geometry2 = new THREE.BoxGeometry(10, 10, 10); //size
const material2 = new THREE.MeshStandardMaterial({ map:loader.load("/ben.jpg") }); //colour
const cube2 = new THREE.Mesh(geometry2, material2); //combines the geometry and material

const geometry3 = new THREE.DodecahedronGeometry(10.0, 0);
const material3 = new THREE.MeshStandardMaterial({ map:loader.load("/ben.jpg") }); //colour
const dodec = new THREE.Mesh(geometry3, material3);

const geometry4 = new THREE.SphereGeometry(15, 32, 16);
const material4 = new THREE.MeshStandardMaterial({ map:loader.load("/ben.jpg") }); //colour
const sphere = new THREE.Mesh(geometry4, material4);

let group = new THREE.Group();
group.add(cube,cube2,dodec,sphere);
scene.add(group); //adds the cube to the scene

const light = new THREE.AmbientLight({color:0xfdfeff, intensity:1 }); // creates a soft white light
scene.add(light);

const audioLoader = new THREE.AudioLoader();
audioLoader.load( '/b2tb.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 1.0 );
	sound.play();
});

cube.position.set(10,10,0);
cube2.position.set(10,20,0);
dodec.position.set(-10,-10,0);
sphere.position.set(-20,20,0);

camera.position.z = 50; //sets the camera position

// animates the cube by rotating it
function animate() {
  requestAnimationFrame(animate); //calls the animate function every frame

  cube.rotation.x += 0.01; //rotates the cube on the x axis
  cube.rotation.y += 0.01; //rotates the cube on the y axis
  cube2.rotation.x += 0.05; 
  cube2.rotation.y += 0.02; 
  dodec.rotation.x += 0.01; 
  dodec.rotation.y += 0.01; 
  sphere.rotation.x += 0.05; 
  sphere.rotation.y += 0.02; 

  controls.update();
  renderer.render(scene, camera); //renders the scene and camera
}

animate(); //calls the animate function