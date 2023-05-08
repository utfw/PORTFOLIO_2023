var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// Setup our world
var world = new CANNON.World();
world.gravity.set(0, 0, -9.82); // m/s²

// Initialize the renderer and the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// Create the three.js renderer
var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);

// Create a point light
var pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 0, 30);
scene.add(pointLight);


// Create a ground plane
var groundGeometry = new THREE.PlaneGeometry(50, 50);
var groundMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);
groundMesh.rotation.x = Math.PI / 2;
groundMesh.position.z = -2;
scene.add(groundMesh);

// Create a sphere
var sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

// Create a sphere
var radius = 1; // m
var sphereBody = new CANNON.Body({
   mass: 1, // kg
   position: new CANNON.Vec3(0, 0, 10), // m
   shape: new CANNON.Sphere(radius)
});
world.addBody(sphereBody);

// Create a plane
var groundBody = new CANNON.Body({
  mass: 0 // mass == 0 makes the body static
});
var groundShape = new CANNON.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);

// Start the simulation loop
var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;

var lastTime;
(function simloop(time){
  requestAnimationFrame(simloop);
  if(lastTime !== undefined){
     var dt = (time - lastTime) / 1000;
     world.step(fixedTimeStep, dt, maxSubSteps);
  }
 // Update the sphere and ground position and rotation
 sphereMesh.position.copy(sphereBody.position);
 sphereMesh.quaternion.copy(sphereBody.quaternion);
 groundMesh.position.copy(groundBody.position);
 groundMesh.quaternion.copy(groundBody.quaternion);
 console.log("Sphere z position: " + sphereBody.position.z);
 lastTime = time;
})();