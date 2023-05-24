import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

window.addEventListener("DOMContentLoaded", function () {
  var sceneEl = document.querySelector("a-scene");

  AFRAME.registerComponent("first-person-controls", {
    init: function () {
      this.cameraRigEl = document.querySelector("#rig");
      this.cameraEl = document.querySelector("#camera");
      this.camera = this.cameraEl.object3D.children[0];
      this.distance = 1.5;
      this.scaleFactor = 1.0;
      // Set initial position of the camera rig based on the camera's current position
      this.cameraRigEl.object3D.position.copy(this.camera.position);

      // Set the initial rotation of the camera rig based on the camera's current rotation
      this.cameraRigEl.object3D.rotation.copy(this.camera.rotation);

      // Create a helper object to represent the desired distance from the camera to the object
      this.helperObject = new THREE.Object3D();
      this.helperObject.position.z = -this.distance;
      this.camera.add(this.helperObject);

      this.controls = new FirstPersonControls(this.camera, this.cameraEl);
      this.controls.lookSpeed = 0.1;
      this.controls.movementSpeed = 10;
      this.controls.noFly = true;
      this.controls.lookVertical = true;
      window.addEventListener(
        "devicemotion",
        this.handleDeviceMotion.bind(this)
      );
    },
    tick: function (time, delta) {
      this.cameraRigEl.object3D.position.copy(this.camera.position);

      // Update the rotation of the camera rig based on the camera's current rotation
      this.cameraRigEl.object3D.rotation.copy(this.camera.rotation);

      var position = new THREE.Vector3(0, 0, -this.distance);
      position.applyQuaternion(this.camera.quaternion);
      position.add(this.camera.position);

      // Update the position of the object in the world coordinates
      var objectEl = document.querySelector("#object");
      objectEl.object3D.position.copy(position);
      objectEl.object3D.scale.set(
        this.scaleFactor,
        this.scaleFactor,
        this.scaleFactor
      );

      this.controls.update(delta / 1000);
    },
    handleDeviceMotion: function (event) {
      var acceleration = event.accelerationIncludingGravity;
      var accelerationX = acceleration.x || 0;
      var accelerationY = acceleration.y || 0;
      var accelerationZ = acceleration.z || 0;

      // Adjust distance based on acceleration
      this.distance -= accelerationZ * 0.1; // Adjust the sensitivity as needed

      // Clamp the distance within a specific range
      this.distance = Math.max(0.5, Math.min(5, this.distance));
      this.scaleFactor = Math.max(1.0, Math.min(0.1, 1.0 / this.distance));
    },
  });
  AFRAME.registerComponent("scene-setup", {
    init: function () {
      var cameraRigEl = document.querySelector("#rig");
      var objectEl = document.querySelector("#object");

      // Set initial camera position
      cameraRigEl.object3D.position.set(0, 0, 0);

      // Set initial object position
      objectEl.object3D.position.copy(cameraRigEl.object3D.position);

      // Add FirstPersonControls to cameraRig
      cameraRigEl.setAttribute("first-person-controls", "");
    },
  });
  if (sceneEl.hasLoaded) {
    run();
  } else {
    sceneEl.addEventListener("loaded", run);
  }
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", motion, false);
  } else {
    console.log("DeviceMotionEvent is not supported");
  }
  function run() {
    var setupEl = document.createElement("a-entity");
    setupEl.setAttribute("scene-setup", "");
    sceneEl.appendChild(setupEl);
  }
});

function motion(event) {
  const helper = document.querySelector("#helpers");
  const downTilt = event.accelerationIncludingGravity.y; //10 - vertical (en face) 0 - horizontal (down)
  const upTilt = event.accelerationIncludingGravity.z; //0 - vertical (en face) -10 - horizontal (up)
  helper.textContent =
    "Accelerometer: x: " +
    Math.round(event.accelerationIncludingGravity.x) +
    ", y: " +
    Math.round(event.accelerationIncludingGravity.y) +
    ", z: " +
    Math.round(event.accelerationIncludingGravity.z);
}
