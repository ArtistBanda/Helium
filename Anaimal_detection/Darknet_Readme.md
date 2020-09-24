# Animal Detection using Darknet53

## Contains

***This repo contaions a yolov3_train.cgf file in cfg folder, a yolo.data and obj_names file in data folder.***
***This repo also contains a trained weights file yolov3.backup in weights folder, trained for 9 custom animal classes.***

## Installation
***1)clone the darkent github repo from <code>git clone https://github.com/AlexeyAB/darknet</code> and just copy past the folder in this repo to the cloned Darknet repo***<br>
***2)While in the darkent folder run <code>./darknet detector data/yolo.data cfg/yolov3_train.cgf weights/yolov3_train.backup {dir_image}image.jpg</code> in bash/cmd for a single image detection***<br>
***For real time detection make sure to enable opencv, GPU and Cuda while making darknet and run <code>./darknet detector demo data/yolo.data cfg/yolov3_train.cgf weights/yolov3_train.backup</code>***
