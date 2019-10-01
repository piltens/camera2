// Set constraints for the video stream
var constraints = { video: { facingMode: {exact: "environment" } }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    span = document.querySelector('#brightness span');
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
        video.addEventListener( "loadedmetadata", function (e) {
             setInterval(function(){
        getBrightness();
      },500);
    });
        function getBrightness(){
  // we don't need to scan the whole video, 32 pixels is fine
  canvas.width = 32 || video.videoWidth;
  canvas.height = 32 || video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  var ctx = canvas.getContext("2d");
  var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
  var colorSum = 0;
  var data = imageData.data;
  var r,g,b,avg;
  for(var x = 0, len = data.length; x < len; x+=4) {
    r = data[x];
    g = data[x+1];
    b = data[x+2];
    avg = Math.floor((r+g+b)/3);
    colorSum += avg;
  }
  var brightness = Math.floor(colorSum / (canvas.width*canvas.height));
  //screenshotImage.src = canvas.toDataURL('image/webp');
  span.innerHTML = brightness;
  // check if brightness is below threshold
  if (brightness < 30){
    if (!isDark){
      isDark = true;
      document.body.classList.add("isDark");
    }
  } else {
    if (isDark){
      isDark = false;
      document.body.classList.remove("isDark");
    }
  }
}
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });

};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);