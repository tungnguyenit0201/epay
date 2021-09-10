import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { Colors, Fonts, base, Images } from 'themes';
import Text from '../../Atoms/Text';
/* import Header from 'components/Common/Header' */
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import { scale } from 'utils/Functions';
import NOTIFY from '../../../Configs/Enums/Notify'

const Notify = ({ data, menu }) => {
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
            <ScrollView>
                {data.map((item, index) => (
                    <View style={[base.container, styles.row]} key={index}>
                        <View style={styles.head}>
                            <Image style={{ width: 62, height: 62 }} source={Images.logoEpay.default} resizeMode="contain" />
                            <Text style={[styles.date]}>{item?.Time}</Text>
                        </View>
                        <Pressable>
                            <Text style={[styles.title]}>{item?.Title}</Text>
                        </Pressable>
                        <Text style={[styles.content]}>{item?.Content}</Text>
                        <Image
                            source={{ uri: `${item?.ContentImgUrl}` }}
                            style={styles.imageNotify}
                        />
                    </View>
                )
                )}
            </ScrollView>
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
    head: {
        borderBottomColor: Colors.l2,
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    date: {
        marginLeft: 'auto',
        fontSize: 12,
    },
    title: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
    icon: {
        width: 20,
        height: 20,
    },
    imageNotify: {
        width: '100%',
        height: 400,
    },
    content: {
        marginBottom: 30,
    },
    textWhite: {
        color: Colors.white,
    },
    mt30: {
        marginTop: -30
    }
});
