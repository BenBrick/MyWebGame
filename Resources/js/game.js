import * as THREE from "three";


// creates a scene and camera
const scene = new THREE.Scene();
//FOV, Aspect Ratio, Near Clipping Plane, Far Clipping Plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//sets the size of the renderer 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// adds a canvas for the renderer to display the scene
document.body.appendChild(renderer.domElement);

// creates the cube that will be rendered in the scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// animates the cube by rotating it
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();