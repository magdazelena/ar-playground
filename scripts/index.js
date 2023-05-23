import * as THREE from "three";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
function onSceneLoaded() {
  const raycaster = document.querySelector("[ar-raycaster]");
  const cursor = document.querySelector("#cursor");
  const obj = document.querySelector("#obj");
  const rig = document.querySelector("#rig");
  let firstTime = true;
  let count = 0;
  var objectWrapper = document.getElementById("objectWrapper");

  var scene = rig.object3D;
  var camera = scene.children[0].children.find(
    (el) => el.type === "PerspectiveCamera"
  );
  console.log(camera);
  var controls = new THREE.DeviceOrientationControls(camera.el.object3D);
  controls.connect();

  // Add FirstPersonControls for user movement
  var firstPersonControls = new FirstPersonControls(camera, window);
  firstPersonControls.movementSpeed = 1; // Adjust movement speed as needed
  firstPersonControls.lookSpeed = 0.1; // Adjust look speed as needed
  firstPersonControls.lookVertical = true;

  function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Update FirstPersonControls for user movement
    firstPersonControls.update();

    // Synchronize object wrapper rotation with the camera
    var cameraRotation = new THREE.Quaternion();
    camera.el.object3D.getWorldQuaternion(cameraRotation);
    objectWrapper.object3D.setRotationFromQuaternion(cameraRotation);
  }

  animate();
  // raycaster.addEventListener("raycaster-intersection", (event) => {
  //   count += 1;
  //   if (firstTime) return (firstTime = false);
  //   alert("hey" + count);
  //   const rigCamera = rig.querySelector("#focus-camera");
  //   rigCamera.setAttribute("camera", "active", true);
  // });
  // window.addEventListener("mouseup", handleDeviceOrientation, true);
  // if (window.DeviceOrientationEvent) {
  //   var rotationOffset = { x: 0, y: 0, z: 0 };

  //   // Update rotation offset based on device orientation
  //   window.addEventListener("deviceorientation", function (e) {
  //     rotationOffset = { x: e.beta, y: e.gamma, z: e.alpha };
  //   });
  //   window.addEventListener("devicemotion", function (e) {
  //     var objectWrapper = document.getElementById("rig");
  //     var rotation = objectWrapper.getAttribute("rotation");

  //     rotation.x = rotationOffset.x + (e.rotationRate.beta || 0);
  //     rotation.y = rotationOffset.y + (e.rotationRate.gamma || 0);
  //     rotation.z = rotationOffset.z + (e.rotationRate.alpha || 0);

  //     objectWrapper.setAttribute("rotation", rotation);
  //   });

  //   //window.addEventListener("deviceorientation", handleDeviceOrientation, true);
  // } else {
  //   console.log("DeviceOrientation API not supported");
  // }

  function handleDeviceOrientation(event) {
    // Extract rotation values
    var alpha = event.alpha; // Z-axis rotation
    var beta = event.beta; // X-axis rotation
    var gamma = event.gamma; // Y-axis rotation
    console.log(event);
    // Update camera rotation based on device rotation
    var cameraEl = document.querySelector("#rig");
    cameraEl.setAttribute("rotation", {
      x: beta,
      y: gamma,
      z: alpha,
    });
    var objectWrapper = document.getElementById("objectWrapper");
    objectWrapper.setAttribute("rotation", {
      x: cameraEl.object3D.rotation.x,
      y: 0,
      z: 0,
    });

    document.querySelector("#helpers").textContent = `
    z: ${Math.round(alpha)},
    y: ${Math.round(gamma)},
    x: ${Math.round(beta)},
    `;
  }
}
document.addEventListener("DOMContentLoaded", function (event) {
  const scene = document.querySelector("a-scene");
  scene.addEventListener("loaded", onSceneLoaded);
});
