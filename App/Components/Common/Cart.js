import React from 'react';
import {Pressable, Image} from 'react-native';
import {Colors, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {Badge, View, Text} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import {scale} from 'utils/Functions';

const Cart = ({style}) => {
  const qty = useSelector(state => state.cart.cart?.length);

  return (
    <Pressable
      onPress={() => {
        Navigator.push('Cart');
      }}
      style={[!!qty && {paddingTop: 10, paddingRight: 10}, style]}>
      <Image
        source={Images.Cart}
        style={{width: scale(20), height: scale(18)}}
      />
      {!!qty && (
        <View absF>
          <Badge
            label={`${qty}`}
            size={'small'}
            absR
            backgroundColor={Colors.PRIMARY}
          />
        </View>
      )}
    </Pressable>
  );
};

export default Cart;
