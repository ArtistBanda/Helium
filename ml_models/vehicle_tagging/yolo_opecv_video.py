# importing libraries 
import cv2 
import numpy as np
import yolo_opencv 

# Create a VideoCapture object and read from input file 
cap = cv2.VideoCapture('/home/artistbanda/Downloads/A_2.mp4') 

# Check if camera opened successfully 
if (cap.isOpened()== False): 
    print("Error opening video file") 


# Code for saving the final video

# frame_width = int(cap.get(3)) 
# frame_height = int(cap.get(4)) 
   
# size = (frame_height, frame_width) 

# result = cv2.VideoWriter('output.avi',  
#                          cv2.VideoWriter_fourcc(*'MJPG'), 
#                          10, size) 

counter = 0

# Read until video is completed 
while(cap.isOpened()): 
	
# Capture frame-by-frame 
    ret, frame = cap.read() 
    if ret == True: 

        # Display the resulting frame 
        frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE) 
        final_image, _ = yolo_opencv.main(image_file=frame)
        cv2.imshow('Frame', frame)
        # result.write(final_image) 
        print('frame ' + str(counter))
        counter += 1

        # Press Q on keyboard to exit 
        if cv2.waitKey(25) & 0xFF == ord('q'): 
            break

    # Break the loop 
    else: 
        break

# When everything done, release 
# the video capture object 

# result.release()
cap.release() 

# Closes all the frames 
cv2.destroyAllWindows() 
