import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'components';
import DashedLine from 'react-native-dashed-line';
import {Colors, Spacing, Images, Fonts} from 'themes';
import {scale} from 'utils/Functions';

// import {GENDER, SCREEN} from 'configs/Constants';
// import Navigator from 'navigations/Navigator';

const InfoLineBottom = ({
  name, data, noLine,
  mt=12,mb=12,
  widthName='48%',widthData='52%'}) => (
  <>
    <View flexDirection='row' style={{
      marginTop: mt,
      marginBottom: mb,
    }}>
      <View style={{width: widthName}}>
        <Text fs="h6" mr={10} color={Colors.cl3}>
          {name}
        </Text>
      </View>

      <View style={{width: widthData}}>
        <Text fs="h6" right>
          {data}
        </Text>
      </View>
    </View>
    {!noLine && (
      <DashedLine dashLength={4} dashThickness={1} dashColor={Colors.bs1} />
    )}
  </>
);

export default InfoLineBottom;
