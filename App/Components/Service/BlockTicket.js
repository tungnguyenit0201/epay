import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Text,Row,Col
} from 'components';
import { InfoLineBottom,SwitchLineBottom } from 'components/Service';
import {Switch} from 'react-native-ui-lib'; //eslint-disable-line
import {Colors, base} from 'themes';
// import {SCREEN} from 'configs/Constants';
// import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const BlockTicket = ({
  mt=0,mb=16,
  term='09/09/21 - 09/10/21',
  nameStation='Trạm An Sương - An Lạc',
  status='Đang hoạt động',
  arrayData=[],
}) => {
  const [xacNhan, isXacNhan] = useState(false);
  const translation = useTranslation();

  return (
    //TODO: TRANSLATE
    <View style={[base.boxShadowGray, {
      marginTop: mt,
      marginBottom: mb,
    }]}>
      <View style={styles.boxBgBlue}>
        <Text fs="md" mb={8}>
          Ngày hiệu lực: {term}
        </Text>

        <View flexDirection='row' alignItems='center'>
          <View flex={1}>
            <Text bold fs="h6" mr={10}>{nameStation}</Text>
          </View>

          <Text fs="sm" right color={Colors.tp3}>{status}</Text>
        </View>
      </View>

      {/* <Row space={15} style={styles.px1}>
        <Col
          width={`30%`}
          space={15}
          key={1}
          style={{backgroundColor: 'yellow'}}
        >
          <Text bold fs="h6" mr={10}>{nameStation}</Text>
          <Text fs="sm" color={Colors.tp3}>{status}</Text>
        </Col>
        <Col
          width={`30%`}
          space={15}
          key={2} style={{backgroundColor: 'yellow'}}
        >
          <Text bold fs="h6" mr={10}>{nameStation}</Text>
          <Text fs="sm" color={Colors.tp3}>{status}</Text>
        </Col>
        <Col
          width={`40%`}
          space={15}
          key={3}
          style={{backgroundColor: 'yellow'}}>
          <Text bold fs="h6" mr={10}>{nameStation}</Text>
          <Text fs="sm" color={Colors.tp3}>{status}</Text>
        </Col>
      </Row> */}

      <View style={styles.pxy1}>
        {arrayData.map((e, index) => {
            if (index === arrayData.length - 1) {
            return e.switch?
              <SwitchLineBottom key={index} name={e.name} 
                noLine={true} />:
              <InfoLineBottom key={index} name={e.name} data={e.data} 
              noLine={true}/>;
            } else {
              return e.switch?
              <SwitchLineBottom key={index} name={e.name}/>:
              <InfoLineBottom key={index} name={e.name} data={e.data}/>;
            }
        })}
      </View>
    </View>
  );
};
export default BlockTicket;

const styles = StyleSheet.create({
  mr1: {marginRight: 10},
  //-----------------
  pxy1: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 18,
  },
  px1: {paddingHorizontal: 8},
  //----------------
  boxBgBlue: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.bg1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
