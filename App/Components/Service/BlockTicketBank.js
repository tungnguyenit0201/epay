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
import {Colors, base, Fonts} from 'themes';
// import {SCREEN} from 'configs/Constants';
// import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import DashedLine from 'react-native-dashed-line';

const BlockTicket = ({
  mt=0,mb=16,
  term='23.06.2019 | 16:35:01',
  nameStation='Trạm An Sương - An Lạc',
  status='Đang hoạt động',
  arrayData=[],
}) => {
  const [xacNhan, isXacNhan] = useState(false);
  const translation = useTranslation();

	const renderFirstThreeCol = (arr) => {
		let cols=[];
		for(i=0; i<2; i++) {
			cols.push(
				<Col
					width={`27%`}
					space={30}
					key={i}
					style={{
						borderRightWidth: 1,
						borderColor: Colors.bs1,}}>
					<Text fs="sm" color={Colors.tp3} mb={6}>{arr[i].name}</Text>
					<Text fs="md">{arr[i].data}</Text>
				</Col>);
		}
		cols.push(
			<Col
				width={`46%`}
				space={30}
				key={3}>
				<Text fs="sm" color={Colors.tp3} mb={6}>{arr[2].name}</Text>
				<Text fs="md">{arr[2].data}</Text>
			</Col>);
		return cols;
	};

  return (
    //TODO: TRANSLATE
    <View style={[base.boxShadowGray, {
      marginTop: mt,
      marginBottom: mb,
    }]}>
      <View style={styles.boxBgBlue} marginBottom={18}>
        <View flexDirection='row' 
					alignItems='center' marginBottom={8}>
          <View flex={1}>
						<Text fs="sm" color={Colors.tp3}>
							{term}
						</Text>
          </View>
          <Text ml={10} fs="sm" right color={Colors.tp3}>{status}</Text>
        </View>

				<Text bold fs="h6" mr={10}>{nameStation}</Text>
      </View>

			<Row space={30} style={[styles.px1,styles.mb1]}>
				{renderFirstThreeCol(arrayData)}
			</Row>
			<DashedLine dashLength={4} dashThickness={1} 
				dashGap={3.5} dashColor={Colors.bs1}/>

      <View style={styles.pxy1}>
        {arrayData.map((e, index) => {
					if(index > 2) {
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
  mb1: {marginBottom: 18},
  //-----------------
  pxy1: {
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 18,
  },
  px1: {paddingHorizontal: 16},
  //----------------
  boxBgBlue: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.bg1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
