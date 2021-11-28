import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from 'themes';
import {Text} from 'components';
import {scale} from 'utils/Functions';
import {Images} from 'themes';
import {get} from 'lodash';

const MoneySourceItem = ({item, isSelected, onSelectItem = () => {}}) => {
  const bankLogoUrl = get(item, 'BankLogoUrl', '');
  const icon = get(item, 'icon', '');
  const bankName = get(item, 'BankName', '');
  const isAvailable = get(item, 'IsAvailable', false);

  const iconSource = icon || {uri: bankLogoUrl};
  return (
    <TouchableOpacity
      onPress={onSelectItem}
      disabled={isSelected || !isAvailable}>
      <View style={[styles.container, isSelected && styles.selectedItem]}>
        <Image source={iconSource} style={styles.iconSize} />
        <View style={styles.sourceInfoSection}>
          <View style={styles.rowTitle}>
            <Text bold style={styles.title}>
              {bankName}
            </Text>
            <Image
              source={
                isSelected
                  ? Images.LinearCircleChecked
                  : Images.LinearCircleUnChecked
              }
              style={styles.iconCheckSize}
            />
          </View>
          <View style={styles.rowTitle}>
            <Text style={styles.sourceNumber}>1233 *******976</Text>
            <Text style={styles.sourceNumber}>Phí dịch vụ: Miễn phí</Text>
          </View>
        </View>
        {!isAvailable ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: scale(16),
              backgroundColor: Colors.black,
              opacity: 0.4,
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: scale(16),
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: scale(16),
    shadowOpacity: 1,
    elevation: 2,
  },
  iconSize: {
    width: scale(28),
    height: scale(28),
    resizeMode: 'contain',
  },
  title: {
    color: Colors.textPlaceholder,
  },
  iconCheckSize: {
    width: scale(18),
    height: scale(18),
  },
  rowTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sourceInfoSection: {
    flex: 1,
    paddingLeft: scale(10),
  },
  sourceNumber: {
    color: Colors.gray,
    fontSize: 12,
  },
  selectedItem: {
    backgroundColor: Colors.selectedSourceBackground,
  },
});

export default MoneySourceItem;
