function onSceneLoaded() {
  const raycaster = document.querySelector("[ar-raycaster]");
  const cursor = document.querySelector("#cursor");
  const obj = document.querySelector("#obj");
  const rig = document.querySelector("#rig");
  let firstTime = true;
  let count = 0;
  raycaster.addEventListener("raycaster-intersection", (event) => {
    count += 1;
    if (firstTime) return (firstTime = false);
    alert("hey" + count);
    const rigCamera = rig.querySelector("#focus-camera");
    rigCamera.setAttribute("camera", "active", true);
  });

  // let firstTime = true;
  // obj.addEventListener("click", () => {
  //   console.log(this.camera.el.object3D);
  //   if (firstTime) {
  //     const pos = this.camera.el.object3D.getWorldPosition();
  //     obj.setAttribute("position", pos);
  //     firstTime = false;
  //   }
  // });
}
document.addEventListener("DOMContentLoaded", function (event) {
  const scene = document.querySelector("a-scene");
  //scene.addEventListener("loaded", onSceneLoaded);
  if (window.DeviceOrientationEvent) {
    // Listen for device orientation changes
    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
  } else {
    console.log("DeviceOrientation API not supported");
  }

  function handleDeviceOrientation(event) {
    // Extract rotation values
    var alpha = event.alpha; // Z-axis rotation
    var beta = event.beta; // X-axis rotation
    var gamma = event.gamma; // Y-axis rotation

    // Update camera rotation based on device rotation
    var cameraEl = document.querySelector("#rig");
    cameraEl.setAttribute("rotation", {
      x: beta,
      y: gamma,
      z: alpha,
    });
  }
});

function getWorldPosition(obj) {
  // local position
  obj.getAttribute("position");

  const mesh = obj.object3D;
  const worldpos = new THREE.Vector3();

  console.log(worldpos);
  mesh.getWorldPosition(worldpos);
}

// addEventListener('raycaster-intersected'
