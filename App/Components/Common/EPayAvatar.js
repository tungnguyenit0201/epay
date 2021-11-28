import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Text} from 'components';
import LinearView from 'components/Common/LinearView';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

const EPayAvatar = ({avatar, name, noLinear, containerStyle, avatarStyle}) => {
  const Wrapper = noLinear ? View : LinearView;
  return (
    <Wrapper style={containerStyle}>
      {avatar ? (
        <Image source={avatar} style={[styles.avatar, avatarStyle]} />
      ) : (
        <View style={styles.defaultAvatar}>
          <Text style={styles.defaultShowName} bold>
            {name?.slice(0, 1)}
          </Text>
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: scale(50),
    height: scale(50),
  },
  defaultAvatar: {
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultShowName: {
    color: Colors.white,
  },
});

export default EPayAvatar;
