#Darkent
***clone Darknet
git clone https://github.com/AlexeyAB/darknet
cd Darknet
and make
 ***
#usage darknet
***to use, copy the .cfg file from here to Darknet folder -> cfg folder and paste***
***copy the .data file to Darknet folder->data folder -> and paste***
*** copy the .weights file to darkent folder***

***on your machine, while in darknet folderuse cmd***

./darknet detect cfg/cfg_filename.cfg weights_filename.weghts {dir_image}image.jpg

*** in the above line use -i 1 for GPU to detect  or while make, set opencv=1,cudann=1,gpu =1 in Makefile ****
