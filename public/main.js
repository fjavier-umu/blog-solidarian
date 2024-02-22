console.log("MAIN-JS")
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
