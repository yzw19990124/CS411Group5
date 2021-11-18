window.onload = function () {
  // load models
  faceapi.nets.tinyFaceDetector.loadFromUri('./weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('./weights')
};

async function upload() {

  //get html elements in constants
  const imgFile = document.getElementById('myFileUpload').files[0];
  const canvas = document.getElementById('mycan');
  const imageView = document.getElementById('myImg');

  //create an html image element from a blob
  const img = await faceapi.bufferToImage(imgFile);

  //now show image in image tag
  imageView.src = img.src;

  //set display size of canvas according to image
  const displaySize = { width: imageView.width, height: imageView.height };
  faceapi.matchDimensions(canvas, displaySize);

  //now lets detect face and expressions
  const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

  //resize the detection boxes according to image size
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
  // two variable that store info for later use
  // 1. human face detection index
  const humanFace = detections[0].detection._score;
  console.log(detections);
  console.log(humanFace); 

  // 2. emotion index (dict)
  const expressions = detections[0].expressions;
  console.log(expressions);


  //now draw detections into canvas
  faceapi.draw.drawDetections(canvas, resizedDetections);//show face detected
  faceapi.draw.drawFaceExpressions(canvas, resizedDetections);//show expression


}