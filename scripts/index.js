import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

window.addEventListener("DOMContentLoaded", function () {
  var sceneEl = document.querySelector("a-scene");

  AFRAME.registerComponent("first-person-controls", {
    init: function () {
      this.cameraRigEl = document.querySelector("#rig");
      this.camera = document.querySelector("#camera");
      // Set initial position of the camera rig based on the camera's current position
      this.cameraRigEl.object3D.position.copy(this.camera.object3D.position);

      // Set the initial rotation of the camera rig based on the camera's current rotation
      this.cameraRigEl.object3D.rotation.copy(this.camera.object3D.rotation);
      this.controls = new FirstPersonControls(
        this.camera.object3D,
        this.camera.parentElement
      );
      this.controls.lookSpeed = 0.5;
      this.controls.movementSpeed = 10;
      this.controls.noFly = true;
      this.controls.lookVertical = true;
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
      this.objectEl = document.querySelector("#object");
      this.cameraRigEl = document.querySelector("#rig");

      // Set initial camera position
      this.objectEl.object3D.position.set(0, 0, 0);

      // Add FirstPersonControls to cameraRig
      this.cameraRigEl.setAttribute("first-person-controls", "");
    },
  });
  if (sceneEl.hasLoaded) {
    run();
  } else {
    sceneEl.addEventListener("loaded", run);
  }
  function run() {
    var setupEl = document.createElement("a-entity");
    setupEl.setAttribute("scene-setup", "");
    sceneEl.appendChild(setupEl);
  }
});
