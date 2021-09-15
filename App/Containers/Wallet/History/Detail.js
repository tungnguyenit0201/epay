import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Header, HeaderBg, Text} from 'components';
import {useTranslation} from 'context/Language';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts} from 'themes';
const DetailHistory = () => {
  const translation = useTranslation();
  return (
    <View>
      <Header back title="Xem chi tiết" avoidStatusBar blackIcon />
      <Text>History</Text>
    </View>
  );
};

export default DetailHistory;
