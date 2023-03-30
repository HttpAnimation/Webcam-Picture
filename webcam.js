// get video element
var video = document.getElementById('video');

// check if browser supports getUserMedia
if (navigator.mediaDevices.getUserMedia) {
  // get webcam stream
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // display webcam stream in video element
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("Error: " + err);
    });
}

// get canvas element
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// get button element
var snap = document.getElementById('snap');

// add event listener to button element
snap.addEventListener("click", function() {
  // draw video frame on canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // get image data from canvas
  var dataURL = canvas.toDataURL();
  
  // send image data to PHP script
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Image uploaded.");
    }
  };
  xhr.open('POST', 'upload.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send('image=' + dataURL);
});
