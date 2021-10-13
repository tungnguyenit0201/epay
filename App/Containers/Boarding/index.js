import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import {base, Colors, Images, Spacing} from 'themes';
import {Button, Text} from 'components';
import FooterContainer from 'components/Auth/FooterContainer';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Boarding = ({route}) => {
  const indexScreen = route?.params?.indexScreen || 0;
  const {bottom} = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const translation = useTranslation();

  const data = [
    {
      title: translation.simple_payment,
      content:
        translation.comes_with_advanced_technology_ensuring_the_best_utility,
      action: translation.next,
    },
    {
      title: translation.airport_service,
      content:
        translation.provide_customers_with_the_convenience_of_paying_for_airline_tickets_via_electronic_transactions,
      action: translation.next,
    },
    {
      title: translation.traffic_service,
      content:
        translation.support_to_receive_transmit_and_process_data_in_transactions,
      action: translation.close,
    },
  ];
  const onPress = () => {
    route?.params?.indexScreen == 2
      ? Navigator.reset(SCREEN.AUTH)
      : Navigator.push(SCREEN.BOADRING, {
          indexScreen: indexScreen + 1,
        });
  };
  return (
    <ImageBackground
      style={[styles.container, {height: height}]}
      source={Images.Boarding[indexScreen]}
    >
      <View style={styles.bottom}>
        <View style={styles.slide}>
          {[0, 1, 2].map(index => (
            <View
              key={Math.random(1, 100)}
              style={[styles.circle, indexScreen == index && styles.active]}
            ></View>
          ))}
        </View>
        <View style={styles.wrapText}>
          <Text fs="h5" fw="700" mb={14}>
            {data[indexScreen].title}
          </Text>
          <Text centered style={styles.content}>
            {data[indexScreen].content}
          </Text>
        </View>
        <FooterContainer
          style={[
            // styles.bottomBtn,
            {width: width},
            {paddingBottom: bottom ? bottom : Spacing.PADDING},
          ]}
        >
          <Button label={data[indexScreen].action} onPress={onPress} />
        </FooterContainer>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  img: {width: '100%'},
  slide: {
    paddingTop: Spacing.PADDING,
    paddingBottom: scale(36),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    width: scale(8),
    height: scale(8),
    backgroundColor: Colors.cl2,
    borderRadius: scale(4),
    marginRight: Spacing.PADDING / 2,
  },
  active: {
    width: scale(22),
    backgroundColor: Colors.cl1,
  },
  wrapText: {
    alignItems: 'center',
    paddingHorizontal: scale(38),
    paddingBottom: Spacing.PADDING,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  content: {lineHeight: 24},
});
export default Boarding;
