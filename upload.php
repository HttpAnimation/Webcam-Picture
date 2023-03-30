<?php
// get image data from POST request
$imageData = $_POST['image'];

// remove data URL header
$imageData = str_replace('data:image/png;base64,', '', $imageData);

// convert base64 encoded image data to binary data
$imageData = base64_decode($imageData);

// generate unique filename
$filename = uniqid() . '.png';

// save image to server
file_put_contents($filename, $imageData);

// send success response
echo "Image uploaded.";
?>
