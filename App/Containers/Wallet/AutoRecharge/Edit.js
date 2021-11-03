import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  HeaderBg,
  Header,
  Button,
  InputBlock,
  Checkbox,
  TextInput,
  Text,
} from 'components';
import { InfoLineBottom } from 'components/Service';

// import DashedLine from 'react-native-dashed-line';
import {Switch} from 'react-native-ui-lib'; //eslint-disable-line
import {Colors, Spacing, Images, Fonts, base} from 'themes';
// import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const EditAutoReCharge = props => {
  const [xacNhan, isXacNhan] = useState(false);
  const translation = useTranslation();
  const dataTest1 = [
    {
      name: 'NH nạp tiền tự động',
      data: 'BIDV',
    },
    {
      name: 'Số tiền tự động nạp',
      data: '5.000.000đ',
    },
    {
      name: 'Số dư tối thiểu trong ví',
      data: '10.000đ',
    },
  ];

  // delete when no use
  //  const renderInfoType1 = (name, data, lastChild) => (
  //   <View>
  //     <View style={[styles.flexRow, styles.mxy1]}>
  //       <View style={styles.wPercent1}>
  //         <Text fs="h6" mr={10} color={Colors.cl3}>
  //           {name}
  //         </Text>
  //       </View>

  //       <View style={styles.wPercent2}>
  //         <Text fs="h6" right bold>
  //           {data}
  //         </Text>
  //       </View>
  //     </View>
  //     {!lastChild && (
  //       <DashedLine dashLength={4} dashThickness={1} dashColor={Colors.bs1} />
  //     )}
  //   </View>
  // );

  return (
    //TODO: TRANSLATE
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg>
        <Header back title={'Nạp ví tự động'} />
      </HeaderBg>

      <ScrollView
        contentContainerStyle={[styles.px1, styles.py1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.boxShadowGray, styles.mb1]}>
          <View style={styles.boxBgBlue1}>
            <View flex={1}>
              <Text fs="sm" mr={10} color={Colors.tp3}>
                23.06.2019 | 16:35:01
              </Text>
            </View>

            <View style={[styles.flexRow, styles.alignCenter]}>
              <Switch
                onColor={Colors.brd2}
                offColor={Colors.bs1}
                style={styles.mr1}
                value={xacNhan}
                onValueChange={isXacNhan}
              />
            </View>
          </View>

          <View style={styles.pxy1}>
            {dataTest1.map((e, index) => {
              if (index === dataTest1.length - 1) {
                return <InfoLineBottom key={index} name={e.name} 
                  data={e.data} noLine={true} widthName='70%' widthData='30%'/>;
              } else {
                return <InfoLineBottom key={index} name={e.name} data={e.data}
                  widthName='70%' widthData='30%'/>;
              }
            })}

            <Button
              label={translation.edit}
              mt={10}
              // fs={Fonts.MD}
              // onPress={onRetry}
            />
          </View>
        </View>

        <View style={[styles.boxShadowGray, styles.mb1]}>
          <View style={styles.boxBgBlue1}>
            <View flex={1}>
              <Text fs="sm" mr={10} color={Colors.tp3}>
                23.06.2019 | 16:35:01
              </Text>
            </View>

            <View style={[styles.flexRow, styles.alignCenter]}>
              <Switch
                onColor={Colors.brd2}
                offColor={Colors.bs1}
                style={styles.mr1}
                // value={xacNhan}
                // onValueChange={isXacNhan}
              />
              <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  source={Images.Profile.Trash}
                  style={styles.iconTrash}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pxy1}>
            {dataTest1.map((e, index) => {
              if (index === dataTest1.length - 1) {
                return <InfoLineBottom key={index} name={e.name} 
                  data={e.data} noLine={true} widthName='70%' widthData='30%'/>;
              } else {
                return <InfoLineBottom key={index} name={e.name} data={e.data}
                  widthName='70%' widthData='30%'/>;
              }
            })}
          </View>
        </View>

        <View style={[styles.boxShadowGray, styles.mb1]}>
          <View style={styles.boxBgBlue1}>
            <View flex={1}>
              <Text fs="sm" mr={10} color={Colors.tp3}>
                23.06.2019 | 16:35:01
              </Text>
            </View>

            <View style={[styles.flexRow, styles.alignCenter]}>
              <Switch
                onColor={Colors.brd2}
                offColor={Colors.bs1}
                style={styles.mr1}
                // value={xacNhan}
                // onValueChange={isXacNhan}
              />
              <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  source={Images.Profile.Trash}
                  style={styles.iconTrash}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pxy1}>
            {dataTest1.map((e, index) => {
              if (index === dataTest1.length - 1) {
                return <InfoLineBottom key={index} name={e.name} 
                  data={e.data} noLine={true}
                  widthName='70%' widthData='30%'/>;
              } else {
                return <InfoLineBottom key={index} 
                  name={e.name} data={e.data}
                  widthName='70%' widthData='30%'/>;
              }
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default EditAutoReCharge;

const styles = StyleSheet.create({
  flexRow: {flexDirection: 'row'},
  //---------------
  alignCenter: {alignItems: 'center'},
  //---------------
  //delete if no use func renderInfoType1
  // wPercent1: {width: '70%'},
  // wPercent2: {width: '30%'},
  //---------------
  mxy1: {marginVertical: 8},
  //-----------------
  mb1: {marginBottom: 16},
  //-----------------
  mr1: {marginRight: 10},
  //-----------------
  pxy1: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 22,
  },
  //-----------------
  px1: {paddingHorizontal: Spacing.PADDING},
  //-----------------
  py1: {paddingVertical: Spacing.PADDING},
  //-----------------
  iconTrash: {
    width: 24,
    height: 24,
  },
  //-----------------
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
  //----------------
  boxBgBlue1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.bg1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
