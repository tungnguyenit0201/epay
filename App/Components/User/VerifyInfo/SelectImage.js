import React from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from 'components';
import {useImagePicker} from 'context/User/utils';
import {TEXT} from 'configs/Constants';
import {scale} from 'utils/Functions';

const SelectImage = ({title, onSelectImage}) => {
  const {image, onCamera, onPhoto} = useImagePicker(onSelectImage);

  return (
    <View>
      {image ? (
        <Image
          style={{width: scale(425), height: scale(270)}}
          source={{uri: image}}
        />
      ) : (
        <View>
          <Text>{title}</Text>
        </View>
      )}
      <Button onPress={onCamera} label={TEXT.TAKE_PHOTO} />
      <Button onPress={onPhoto} label={TEXT.SELECT_IMAGE_IN_LIBRARY} />
    </View>
  );
};

export default SelectImage;
