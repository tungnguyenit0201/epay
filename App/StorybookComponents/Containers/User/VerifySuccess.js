import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { Colors, Fonts, base, Images } from 'themes';
import Text from '../../Atoms/Text';
/* import Header from 'components/Common/Header' */
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import { scale } from 'utils/Functions';
import NOTIFY from '../../../Configs/Enums/Notify'
import Content from '../../Atoms/Content';
import Button from '../../Atoms/Button'
const Notify = ({ menu }) => {
    const translation = require('../../../Context/Language/vi.json');
    return (
        <View>
            <HeaderBg>
                <Header style={[styles.mt30]} back title="Xác thực Email" />
            </HeaderBg>
            <View style={[base.container, styles.flexRow]}>
                <Image style={{ width: 60, height: 60, marginBottom: 40 }} source={Images.Success.default} resizeMode="contain" />
                <Content
                    title="Xác thực email thành công"
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                />
            </View>
            <View style={[base.bottom, styles.flexRow]}>
                <Button
                    label="Trang chủ"
                    style={styles.buttonBlock}
                />
            </View>
        </View>
    )
}
export default Notify;
const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
        borderRadius: 99,
        backgroundColor: Colors.white,
        height: 32,
        borderColor: Colors.l2,
        borderWidth: 1,
        marginRight: scale(5),
    },
    tagActive: {
        backgroundColor: Colors.cl1,
        borderColor: Colors.cl1,
    },
    row: {
        borderBottomColor: Colors.l2,
        borderBottomWidth: 8,
        paddingVertical: 15,
    },
    flexRow: { justifyContent: 'center', alignItems: 'center' },
    textWhite: {
        color: Colors.white,
    },
    mt30: {
        marginTop: -30
    },
    buttonBlock: {
        width: "100%",
        marginTop: 50
    }
});
