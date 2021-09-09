import React from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from 'components';
import {useImagePicker} from 'context/User/utils';
import {TEXT} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {base, Row, Col} from 'components';
import {Fonts} from 'themes';

const SelectImage = ({title, onSelectImage, chooseImage}) => {
  const {image, onCamera, onPhoto} = useImagePicker(onSelectImage);

  return (
    <View style={{marginBottom: 20}}>
      <Text size={Fonts.H6} mb={10}>
        {title}
      </Text>
      {image?.path && (
        <Image
          style={{marginBottom: 20, width: '100%', height: scale(270)}}
          source={{uri: image?.path}}
        />
      )}

      <Row justify="center">
        <Col width="35%">
          <Button
            onPress={onCamera}
            label={TEXT.TAKE_PHOTO}
            style={{paddingHorizontal: 5}}
          />
        </Col>
        {!!chooseImage && (
          <Col width="65%">
            <Button onPress={onPhoto} label={TEXT.SELECT_IMAGE_IN_LIBRARY} />
          </Col>
        )}
      </Row>
    </View>
  );
};

export default SelectImage;
