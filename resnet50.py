import numpy as np 
from keras import layers
from keras.layers import Input, Add, Dense, Activation, ZeroPadding2D, BatchNormalization, Flatten, Conv2D, AveragePooling2D, MaxPooling2D, GlobalMaxPooling2D
from keras.models import Model, load_model
from keras.preprocessing import image
from keras.utils import layer_utils
from keras.utils.data_utils import get_file
import matplotlib as plt
import keras.backend as K
from keras.initializers import glorot_uniform
K.set_image_data_format('channels_last')

class Resnet50:

    @staticmethod
    def identity_block(X, f, filters, stage, block):
    
        conv_name_base = 'res' + str(stage) + block + '_branch'
        bn_name_base = 'bn' + str(stage) + block + '_branch'
        conv_name_base = 'res' + str(stage) + block + '_branch'
        bn_name_base = 'bn' + str(stage) + block + '_branch'
        F1, F2, F3 = filters
    
        X_shortcut = X
    
        X = Conv2D(filters = F1, kernel_size = (1, 1), strides = (1,1), padding = 'valid', name = conv_name_base + '2a', kernel_initializer = glorot_uniform(seed=0))(X)
        X = BatchNormalization(axis = 3, name = bn_name_base + '2a')(X)
        X = Activation('relu')(X)
        X = Conv2D(filters = F2, kernel_size = (f, f), strides = (1, 1),padding = 'same', name = conv_name_base + '2b',kernel_initializer = glorot_uniform(seed=0))(X)
        X = BatchNormalization(axis = 3, name = bn_name_base + '2b')(X)
        X = Activation('relu')(X)
        X = Conv2D(filters = F3, kernel_size = (1, 1), strides = (1, 1),padding = 'valid', name = conv_name_base + '2c',kernel_initializer = glorot_uniform(seed=0))(X)
        X = BatchNormalization(axis = 3, name = bn_name_base + '2c')(X)
        X = Add()([X,X_shortcut])
        X = Activation('relu')(X)
        
        return X
    @staticmethod
    def convolutional_block(X, f, filters, stage, block, s = 2):
    
        conv_name_base = 'res' + str(stage) + block + '_branch'
        bn_name_base = 'bn' + str(stage) + block + '_branch'

        F1, F2, F3 = filters
    
        X_shortcut = X

        X = Conv2D(F1, kernel_size =(1, 1), strides = (s,s), padding="valid", name = conv_name_base + '2a', kernel_initializer = glorot_uniform(seed=0))(X)
        X = BatchNormalization(axis = 3, name = bn_name_base + '2a')(X)
        X = Activation('relu')(X)
    
        X = Conv2D(F2, kernel_size =(f,f), strides = (1,1), padding="same", name = conv_name_base + '2b', kernel_initializer = glorot_uniform(seed=0))(X)  
        X = BatchNormalization(axis = 3, name = bn_name_base + '2b')(X)
        X = Activation('relu')(X)
        X = Conv2D(F3, kernel_size =(1,1), strides = (1,1), padding="valid", name = conv_name_base + '2c', kernel_initializer = glorot_uniform(seed=0))(X)  
        X = BatchNormalization(axis = 3, name = bn_name_base + '2c')(X)

        X_shortcut = Conv2D(F3, kernel_size =(1,1), strides = (s,s), padding="valid", name = conv_name_base + '1', kernel_initializer = glorot_uniform(seed=0))(X_shortcut)  
        X_shortcut = BatchNormalization(axis = 3, name = bn_name_base + '1')(X_shortcut)
        X = Add()([X,X_shortcut])
        X = Activation('relu')(X)
        
        return X

    @staticmethod
    def ResNet50(input_shape = (64, 64, 3), classes = 6):
        X_input = Input(input_shape)

        X = ZeroPadding2D((3, 3))(X_input)
        X = Conv2D(64, (7, 7), strides = (2, 2), name = 'conv1', kernel_initializer = glorot_uniform(seed=0))(X)
        X = BatchNormalization(axis = 3, name = 'bn_conv1')(X)
        X = Activation('relu')(X)
        X = MaxPooling2D((3, 3), strides=(2, 2))(X)
        X = Resnet50.convolutional_block(X, f = 3, filters = [64, 64, 256], stage = 2, block='a', s = 1)
        X = Resnet50.identity_block(X, 3, [64, 64, 256], stage=2, block='b')
        X = Resnet50.identity_block(X, 3, [64, 64, 256], stage=2, block='c')
 
        X = Resnet50.convolutional_block(X, f = 3, filters = [128, 128, 512], stage = 3, block='a', s = 2)
        X = Resnet50.identity_block(X, 3, [128, 128, 512], stage=3, block='b')
        X = Resnet50.identity_block(X, 3, [128, 128, 512], stage=3, block='c')
        X = Resnet50.identity_block(X, 3, [128, 128, 512], stage=3, block='d')
        X = Resnet50.convolutional_block(X, f = 3, filters = [256, 256, 1024], stage = 4, block='a', s = 2)
        X = Resnet50.identity_block(X, 3, [256, 256, 1024], stage=4, block='b')
        X = Resnet50.identity_block(X, 3, [256, 256, 1024], stage=4, block='c')
        X = Resnet50.identity_block(X, 3, [256, 256, 1024], stage=4, block='d')
        X = Resnet50.identity_block(X, 3, [256, 256, 1024], stage=4, block='e')
        X = Resnet50.identity_block(X, 3, [256, 256, 1024], stage=4, block='f')
        X = Resnet50.convolutional_block(X, f = 3, filters = [512, 512, 2048], stage = 5, block='a', s = 2)
        X = Resnet50.identity_block(X, 3, [512, 512, 2048], stage=5, block='b')
        X = Resnet50.identity_block(X, 3, [512, 512, 2048], stage=5, block='c')
        X = AveragePooling2D((2, 2),name="avg_pool")(X)
        X = Flatten()(X)
        X = Dense(classes, activation='softmax', name='fc' + str(classes), kernel_initializer = glorot_uniform(seed=0))(X)
        model = Model(inputs = X_input, outputs = X, name='ResNet50')

        return model
