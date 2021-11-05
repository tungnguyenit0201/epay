import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Text} from 'components';
import { InfoLineBottom,SwitchLineBottom } from 'components/Service';
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
  pxy1: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 18,
  },
  //----------------
  boxBgBlue: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.bg1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
