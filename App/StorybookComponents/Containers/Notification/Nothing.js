import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { Colors, Fonts, base, Images } from 'themes';
import Text from '../../Atoms/Text';
/* import Header from 'components/Common/Header' */
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import { scale } from 'utils/Functions';
import NOTIFY from '../../../Configs/Enums/Notify'

const Notify = ({ menu }) => {
    const translation = require('../../../Context/Language/vi.json');
    return (
        <>
            <HeaderBg>
                <Header style={[styles.mt30]} back title={translation.notification} />
            </HeaderBg>
            <View style={[base.container, styles.row, styles.flexRow]}>
                <FlatList
                    data={menu}
                    keyExtractor={item => item.title}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable
                            style={[styles.tag, item.title === NOTIFY.ALL && styles.tagActive]}
                            onPress={() => {
                                setType(item.title);
                            }}>
                            <Text style={[item.title === NOTIFY.ALL && styles.textWhite]}>
                                {item.title}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>
            <View style={styles.bellBlock}>
                <Image style={{ width: 90, height: 90 }} source={Images.Bell.default} resizeMode="contain" />
                <Text>Chưa có thông báo mới</Text>
            </View>
        </>
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
    flexRow: { flexDirection: 'row' },
    textWhite: {
        color: Colors.white,
    },
    mt30: {
        marginTop: -30
    },
    bellBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 250
    }
});
