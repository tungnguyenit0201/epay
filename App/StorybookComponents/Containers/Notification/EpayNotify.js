import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { Colors, Fonts, base, Images } from 'themes';
/* import Header from 'components/Common/Header' */
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import { scale } from 'utils/Functions';
import Text from '../../Atoms/Text';
const Notify = () => {
    const translation = require('../../../Context/Language/vi.json');
    return (
        <>
            <HeaderBg>
                <Header style={[styles.mt30]} back title={translation.notification} />
            </HeaderBg>
            <View style={base.container}>
                <View style={styles.success}>
                    <Image style={{ width: 90, height: 90 }} source={Images.Bell.default} resizeMode="contain" />
                    <Text bold size={Fonts.H5} mb={15}>
                        {translation.epay_notification}
                    </Text>
                    <Text centered>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                    </Text>
                </View>
                <View style={styles.block}>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                        nulla pariatur.
                    </Text>
                </View>
            </View>

        </>
    )
}
export default Notify;
const styles = StyleSheet.create({
    block: {
        marginBottom: 20,
        marginTop: 20,
        position: 'relative',
        minHeight: 128,
    },
    success: {
        alignItems: 'center',
        marginBottom: 20,
    },
    mt30: {
        marginTop: -30
    }
});
