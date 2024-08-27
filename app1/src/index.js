// You can write your own logic here to determine the actual url
console.log(process.env.NODE_ENV);

const isProd = process.env.NODE_ENV === "production";

window.app2Url = isProd ? 
  "file://wsl.localhost/Ubuntu/home/michal/module-federation/app2/dist/remoteEntry.js" : "http://localhost:3002/remoteEntry.js"

// Use dynamic import here to allow webpack to interface with module federation code
import("./bootstrap");
