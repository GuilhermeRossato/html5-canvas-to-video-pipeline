# HTML Canvas-to-Video pipeline

This repository contains code to generate video from html5's canvas experiments. It uses javascript to create the visualization, nodejs to save the images to the system and ffmpeg to create the resulting video.

Example of what it is generating right now:

![Demo](https://github.com/GuilhermeRossato/html5-canvas-to-video-pipeline/raw/master/demo.gif?raw=true)

## How does it work

An update function is used to create an animation on a canvas, this function optionally saves the canvas content to another local server

## How to use

Serve the root statically and then run the `server.js` script to run the file-saving server, then configure the frontend to send the images at the right time.

It's advised to use ffmpeg to make the video from the images with the following command (from root):

```batch
ffmpeg -framerate 20 -i ./data/image%d.png ./data/output.mp4
```