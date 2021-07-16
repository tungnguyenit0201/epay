import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Colors, View, Text, Spacings } from 'react-native-ui-lib';
import { SliderHuePicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';

import { hexToRgb, deltaE } from 'utils/ColorFunctions';

const COLOR_WIDTH = 32;

const TYPES = {
  OTHER: 1,
  BLACK: 2,
  WHITE: 3
};

const NAMES = {
  [TYPES.OTHER]: 'Màu khác',
  [TYPES.WHITE]: 'Màu trắng',
  [TYPES.BLACK]: 'Màu đen'
};

const ColorPicker = ({ colors, setPaintColor }) => {
  const { width: screenWidth } = useWindowDimensions();
  const [pallete, setPallete] = useState([]);
  const [color, setColor] = useState(
    tinycolor({ h: 180, s: 1, v: 1 }).toHexString()
  );
  const [selectedColor, setSelectedColor] = useState({});
  const [currentType, setCurrentType] = useState(TYPES.OTHER);

  const width = screenWidth - Spacings.card * 2;
  const maxColors = Math.floor(width / (COLOR_WIDTH + 6)) * 2;

  const changeColor = (colorHsvOrRgb, resType) => {
    if (resType === 'end') {
      setColor(tinycolor(colorHsvOrRgb).toHexString());
    }
  };

  const renderColor = (item) => {
    const isSelected = item.id === selectedColor.id;

    return (
      <Pressable
        key={item.id}
        onPress={() => {
          setSelectedColor(item);
          setPaintColor?.(item.id);
        }}>
        <View
          margin-3
          backgroundColor={item.code}
          width={32}
          height={32}
          border={isSelected}
          borderColor={Colors.primary}
          radius={4}>
          <View flex border borderColor={'white'} radius={4} />
        </View>
      </Pressable>
    );
  };

  const renderType = (type) => {
    const isSelected = type === currentType;
    return (
      <Pressable
        key={type}
        onPress={() => {
          setCurrentType(type);
          if (type === TYPES.WHITE) {
            setColor('#ffffff');
          } else if (TYPES.BLACK) {
            setColor('#000000');
          }
        }}>
        <View paddingH-card>
          <View borderB={isSelected} paddingV-7 marginV-5>
            <Text>{NAMES[type]}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  useEffect(() => {
    setPallete(() => {
      const mappedDeltaE = colors.map((item) => ({
        ...item,
        deltaE: deltaE(hexToRgb(color), hexToRgb(item.code))
      }));
      return mappedDeltaE
        .filter((item) => item.deltaE < 20)
        .sort((a, b) => a.deltaE - b.deltaE)
        .slice(0, maxColors);
    });
  }, [color]); // eslint-disable-line

  return (
    <View marginT-10 width={width}>
      <View paddingH-card marginB-4>
        <Text medium>Chọn màu sơn</Text>
      </View>
      <View row>{Object.values(TYPES).map(renderType)}</View>
      {currentType === TYPES.OTHER && (
        <View centerH>
          <SliderHuePicker
            oldColor={color}
            trackStyle={[{ height: 12, width: width - Spacings.card * 4 }]}
            thumbStyle={styles.thumb}
            useNativeDriver
            onColorChange={changeColor}
          />
        </View>
      )}
      <View paddingH-card marginB-4>
        <Text medium>Bảng màu sản phầm</Text>
      </View>
      <View row flexWrap={'wrap'} centerH>
        {pallete?.map(renderColor)}
      </View>
      {!!selectedColor?.id && (
        <View>
          <View paddingH-card marginT-10 marginB-4>
            <Text medium>Màu đã chọn</Text>
            <View row centerV marginT-8>
              <View
                backgroundColor={selectedColor.code}
                width={96}
                height={32}
                radius={4}
              />
              <View flex paddingH-card>
                <Text sm medium>
                  {selectedColor.label}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  thumb: {
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.35,
    elevation: 1
  }
});

export default ColorPicker;
