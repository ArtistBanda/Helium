#%%
from resnet50 import Resnet50
import numpy as np
from keras.applications.imagenet_utils import preprocess_input
from keras.preprocessing.image import img_to_array
import keras.backend as K

class_no=5
#%%
def laod_data():

    return 


#%%
model = Resnet50.ResNet50(input_shape=(64,64,3),classes=class_no)
model.compile(optimizer='adam', loss='categorical_crossentropy',metrics=['accuracy'])
model.summary()
#%%
X_train, Y_train, X_test, Y_test = load_data()

x_train = X_train/255.
x_test = X_test/255.
y_train = Y_train
y_test = Y_test




model.fit(x_train,y_train, epochs=100, batch_size=64)

