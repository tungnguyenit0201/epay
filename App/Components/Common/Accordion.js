import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Pressable,
  Platform,
} from 'react-native';
import {Text, Icon} from 'components';
import {scale} from 'utils/Functions';
import {Colors, Fonts, Images, Spacing} from '../../Themes';

const Accordion = ({
  title,
  rightTitle,
  style = {},
  disable,
  isExpand = true,
  setExpandList,
  isHeader = false,
  renderProps = () => {},
  renderHeader = () => false,
}) => {
  const animation = useRef(new Animated.Value(0.01)).current;
  const heightRef = useRef(0);

  const onToggle = () => {
    if (disable) return;
    setExpandList();
  };

  const onLayout = event => {
    heightRef.current = event.nativeEvent.layout.height;
    Animated.spring(animation, {
      toValue: isExpand ? heightRef.current : 0.01,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={[styles.container, style]}>
      {!isHeader ? (
        <Pressable style={styles.layout} onPress={onToggle}>
          <View style={[styles.titleContainer]}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.wrapImage}>
            <Text style={styles.textRight}>{rightTitle}</Text>
            <Icon icon={!isExpand ? Images.Down : Images.Up} />
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={onToggle}>{renderHeader()}</Pressable>
      )}
      {!Platform.OS == 'android' ? (
        <Animated.View
          style={[{height: animation}]}
          key={`animated-${Math.random(1, 1000)}`}>
          <View
            style={{
              position: 'absolute',
              display: isExpand ? 'flex' : 'none',
              left: 0,
              right: 0,
            }}
            onLayout={onLayout}>
            {renderProps()}
          </View>
        </Animated.View>
      ) : (
        isExpand && renderProps()
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUNDACCORDION,
    marginHorizontal: -Spacing.PADDING,
    borderBottomColor: Colors.BACKGROUNDCOLOR,
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.PADDING,
    flexDirection: 'column',
  },
  layout: {
    paddingHorizontal: Spacing.PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  titleContainer: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    paddingRight: Spacing.PADDING,
  },
  textRight: {
    paddingRight: Spacing.PADDING,
    fontSize: Fonts.FONT_SMALL,
  },
  wrapImage: {
    marginLeft: Spacing.PADDING,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Accordion;
