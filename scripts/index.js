function onSceneLoaded() {
  const raycaster = document.querySelector("[ar-raycaster]");
  const cursor = document.querySelector("#cursor");
  raycaster.addEventListener("raycaster-intersection", (event) => {
    console.log(event);
    cursor.setAttribute("position", event.detail.intersections[0].point);
  });
}
document.addEventListener("DOMContentLoaded", function (event) {
  const scene = document.querySelector("a-scene");
  scene.addEventListener("loaded", onSceneLoaded);
});
function loadPosition(e) {
  console.log(e);
}
