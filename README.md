# Darkent
***clone Darknet
<code>git clone https://github.com/AlexeyAB/darknet</code>
cd Darknet
and make***
### usage darknet
***1)to use, copy the .cfg file from here to Darknet folder -> cfg folder and paste***
<br>
***2)copy the .data file to Darknet folder->data folder -> and paste***
<br>
***3)copy the .weights file to darkent folder***
<br>
***4)on your machine, while in darknet folderuse cmd***
<br>
<code> 
./darknet detect cfg/cfg_filename.cfg weights_filename.weghts {dir_image}image.jpg
</code>
<br>
***(optional)in the above line use -i 1 for GPU to detect  or while make, set opencv=1,cudann=1,gpu =1 in Makefile***
