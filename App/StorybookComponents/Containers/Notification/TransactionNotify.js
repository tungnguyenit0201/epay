import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { Colors, Fonts, base, Images } from 'themes';
/* import Header from 'components/Common/Header' */
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import { scale } from 'utils/Functions';
import Text from '../../Atoms/Text';
import Button from '../../Atoms/Button';
import Col from '../../Atoms/Col';
import Row from '../../Atoms/Row';
const Notify = ({ data }) => {
    const translation = require('../../../Context/Language/vi.json');
    return (
        <>
            <HeaderBg>
                <Header style={[styles.mt30]} back title={translation.notification} />
            </HeaderBg>
            <View style={base.container}>
                <View style={styles.success}>
                    <Image
                        source={Images.Success.default}
                        style={styles.imgSuccess}
                    />
                    <Text bold size={Fonts.H5} mb={15}>
                        {translation.successful_transaction}
                    </Text>
                    <Text centered>Mã giao dịch: 34567834345 <br />
                        Thời gian: 01/09/2021 01:01:01</Text>
                </View>
                <View style={styles.block}>
                    {data.map((item, index) => {
                        return (
                            <View key={index}>
                                <View
                                    style={[
                                        styles.row,
                                        index + 1 === data.length && {
                                            borderBottomWidth: 0,
                                        },
                                    ]}>
                                    <Text style={styles.textLeft}>{item.label}</Text>

                                    <Text bold size={Fonts.H6} style={styles.textRight}>
                                        {item.value}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={styles.contact}>
                    <Text>Hỗ trợ khiếu nại</Text>
                    <Text bold>Gọi 1900-0000</Text>
                </View>
                <View style={styles.spaceBetween}>
                    <Button
                        label={translation.continue}
                        style={styles.buttonSave}
                        color={Colors.cl1}
                    />
                    <Button
                        label={translation.continue}
                        style={styles.buttonShare}
                        color={Colors.white}
                    />
                </View>
                <Text style={[styles.backHome]}>Về trang chủ</Text>
            </View>
        </>
    )
}
export default Notify;
const styles = StyleSheet.create({
    mt30: {
        marginTop: -30
    },
    block: {
        marginBottom: 15,
        position: 'relative',
        minHeight: 128,
    },
    success: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imgSuccess: {
        width: 70,
        height: 70,
        marginBottom: 10,
    },
    bgImg: {
        width: 128,
        height: 128,
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: [{ translateX: scale(-64) }, { translateY: 0 }],
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: Colors.l3,
        borderBottomWidth: 1,
        paddingVertical: 15,
    },

    textLeft: {
        fontSize: Fonts.H6,
        color: Colors.cl3,
    },
    textRight: {
        fontSize: Fonts.H6,
        color: Colors.BLACKTEXT,
        maxWidth: 160,
    },
    contact: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 15
    },
    spaceBetween: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonSave: {
        width: "47%",
        height: scale(42),
        backgroundColor: 'transparent',
        borderColor: Colors.cl1,
        borderWidth: 1,
    },
    buttonShare: {
        width: "47%",
        height: scale(42),
        backgroundColor: Colors.cl1,
    },
    backHome: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 10
    }
});
