import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Matter from 'matter-js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // 배경색을 검은색으로, 투명도를 0으로 설정
document.body.appendChild(renderer.domElement);

const boxWidth = 20;
const boxHeight = 20;
const boxScale = 20
const stackA = new THREE.Group();
const numRows = Math.ceil(window.innerWidth / boxWidth);
const numCols = Math.ceil(window.innerHeight / boxHeight);
for (let i = 0; i < numCols; i++) {
  for (let j = 0; j < numRows; j++) {
    const geometry = new THREE.BoxGeometry(boxScale, boxScale, boxScale);
    const material = new THREE.MeshBasicMaterial({ color: 0xbbbbbb, wireframe: true });
    const box = new THREE.Mesh(geometry, material);
    box.position.x = (j - (numRows - 1) / 2) * boxWidth;
    box.position.y = (i - (numCols - 1) / 2) * boxHeight;
    stackA.add(box);
  }
}
scene.add(stackA);

camera.position.z = 100;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Matter.js 물리 엔진 설정
var Engine = Matter.Engine,
 Render = Matter.Render;
const engine = Matter.Engine.create();
const world = engine.world;
const boxes = []; // 모든 상자들의 배열
// 중력 설정
const gravity = new THREE.Vector3(0, -0.1, 0);
world.gravity = gravity;

// 클릭한 상자와 주변 상자들을 밀어내는 함수
function pushBoxes(box, radius) {
  const center = box.position.clone(); // 클릭한 상자의 위치
  for (let i = 0; i < boxes.length; i++) {
    const otherBox = boxes[i];
    const distance = center.distanceTo(otherBox.position); // 두 상자 사이의 거리
    if (distance <= radius) {
      const force = center.clone().sub(otherBox.position); // 밀어내는 힘의 방향
      force.setLength(1 / distance); // 힘의 크기
      Matter.Body.applyForce(otherBox.userData.body, otherBox.position, {
        x: force.x,
        y: force.y
      }); // Matter.js 물리 엔진에 힘을 가함
    }
  }
}

// 클릭 이벤트 추가
renderer.domElement.addEventListener('click', event => {
  event.preventDefault();
  console.log(1)
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(stackA.children, true);
  if (intersects.length > 0) {
    const box = intersects[0].object;
    pushBoxes(box, 200); // 클릭한 상자와 반경 50 내의 상자들을 밀어냄
  }
});

const velocity = new THREE.Vector3();
const acceleration = new THREE.Vector3(0, 0, 0); // 중력 방향

function updateBoxPosition(box) {
  // acceleration 벡터를 업데이트하여 중력 적용
  acceleration.y -= 0.001;

  // velocity 벡터를 업데이트하여 위치 이동
  velocity.add(acceleration);
  box.position.add(velocity);

  // 박스가 바닥에 닿으면 중력 적용 멈춤
  if (box.position.y < -50) {
    acceleration.y = 0;
    velocity.y = 0;
    box.position.y = -50;
  }
}

stackA.children.forEach(updateBoxPosition);

var render = Render.create({
  canvas: renderer.domElement,
  engine: engine,
  options: {
    wireframes: false,
    background: 'transparent',
    width: window.innerWidth,
    height: window.innerHeight,
  }
});
Engine.run(engine);
Render.run(render);