import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

window.addEventListener("DOMContentLoaded", function () {
  var sceneEl = document.querySelector("a-scene");

  AFRAME.registerComponent("first-person-controls", {
    init: function () {
      this.cameraRigEl = document.querySelector("#rig");
      var scene = document.querySelector("a-scene").object3D;
      this.camera = scene.children.find(
        (el) => el.type === "PerspectiveCamera"
      );

      // Set initial position of the camera rig based on the camera's current position
      this.cameraRigEl.object3D.position.copy(this.camera.object3D.position);

      // Set the initial rotation of the camera rig based on the camera's current rotation
      this.cameraRigEl.object3D.rotation.copy(this.camera.object3D.rotation);
      this.controls = new FirstPersonControls(
        this.camera.object3D,
        this.cameraRigEl
      );
      this.controls.lookSpeed = 0.1;
      this.controls.movementSpeed = 10;
      this.controls.noFly = true;
      this.controls.lookVertical = false;
    },
    tick: function (time, delta) {
      this.cameraRigEl.object3D.position.copy(this.camera.object3D.position);

      // Update the rotation of the camera rig based on the camera's current rotation
      this.cameraRigEl.object3D.rotation.copy(this.camera.object3D.rotation);

      this.controls.update(delta / 1000);
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
  console.log(event);
  helper.textContent =
    "Accelerometer: x: " +
    Math.round(event.accelerationIncludingGravity.x) +
    ", y: " +
    Math.round(event.accelerationIncludingGravity.y) +
    ", z: " +
    Math.round(event.accelerationIncludingGravity.z);
}
