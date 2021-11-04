import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'components';
import DashedLine from 'react-native-dashed-line';
import {Colors, base} from 'themes';
import {Switch} from 'react-native-ui-lib'; //eslint-disable-line
// import {scale} from 'utils/Functions';

// import {GENDER, SCREEN} from 'configs/Constants';
// import Navigator from 'navigations/Navigator';

const SwitchLineBottom = ({
  name, data, noLine,
  mt=12,mb=12,
  widthName='48%',widthData='52%'}) => {
    const [accept, isAccepted] = useState(false);

    return(
      <>
        <View style={[styles.flexRow, {
          marginTop: mt,
          marginBottom: mb,
        }]}>
          <View style={{width: widthName}}>
            <Text fs="h6" mr={10} color={Colors.cl3}>
              {name}
            </Text>
          </View>

          <View style={{width: widthData}}>
            <Switch
              style={base.leftAuto}
              onColor={Colors.brd2}
              offColor={Colors.bs1}
              value={accept}
              onValueChange={isAccepted}
            />
          </View>
        </View>
        {!noLine && (
          <DashedLine dashLength={4} dashThickness={1} dashColor={Colors.bs1} />
        )}
      </>
  )};

const styles = StyleSheet.create({
  flexRow: {flexDirection: 'row'},
  //---------------
  my1: {marginVertical: 12},
});

export default SwitchLineBottom;
