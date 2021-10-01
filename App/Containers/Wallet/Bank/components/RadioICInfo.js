import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Radio, Text} from 'components';
import {Colors} from 'themes';

const RadioICInfo = forwardRef(({kycInfo, selectedValue, style}, ref) => {
    const data = kycInfo;
    const [selectedItem, setSelectedItem] = useState(
        selectedValue && selectedValue > 0 ? data?.[selectedValue - 1] : data?.[0],
    );

    useImperativeHandle(ref, () => ({getItem}));
    const getItem = () => {
        return selectedItem;
    };
    const handleChange = value => {
        setSelectedItem(data?.[value - 1]);
    };

    return (
        <View>
            <Text style={{}}>
                Thông tin giấy tờ tuỳ thân mà bạn chọn để liên kết phải trùng khớp với
                thông tin giấy tờ tuỳ thân được khai báo tại ngân hàng.
            </Text>
            <Radio
                onChange={handleChange}
                items={data}
                selectedValue={selectedItem?.value}
                style={[styles.radio]}
                wrapStyle={{flexDirection: 'column', flexWrap: ''}}
                marginBottom={0}
            />
        </View>
    );
});
export default RadioICInfo;
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BACKGROUNDCOLOR,
        paddingBottom: 40,
        marginTop: 16,
        // padding: 16,
    },
    image: {
        width: 20,
        height: 20,
    },
    icon: {
        position: 'absolute',
        top: 48,
        left: 10,
        paddingRight: 10,
        borderRightWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.cl4,
        zIndex: 1,
    },
    input_text: {
        paddingLeft: 50,
        // borderRightWidth: 1,
        // borderStyle: 'solid',
        // borderColor: Colors.l4,
        borderWidth: 0,
        borderRadius: 8,
    },
    item: {alignItems: 'center', flex: 1},
    radio: {
        marginRight: 0,
        marginTop: 4,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'column',
    },
});
