import React from 'react';
import {
    View,
    Pressable,
    Image,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { Text } from 'components';
import { Images, Colors, Spacing } from 'themes';
import { scale } from 'utils/Functions';

const PopupModal = (props = {}) => {
    const { navigation, route = {} } = props;
    const { onClose, screen: ScreenComp, title, params, style } = route.params || {};
    const { width, height } = useWindowDimensions();
    const modalStyle = {
        width: width * 0.9,
        minHeight: height * 0.3
    };

    const onPressClose = () => {
        navigation.pop();
        onClose?.();
    };

    const renderScreen = () => {
        if (ScreenComp) {
            return <ScreenComp
                {...params}
                requestClose={onPressClose}
            />;
        } return <View />;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.modal, modalStyle, style]}>
                <View style={styles.header}>
                    <Text bold fs="h6" centered color={Colors.cl1}>
                        {title}
                    </Text>
                    <Pressable style={styles.btn} onPress={onPressClose}>
                        <Image source={Images.WidthDraw.Plus} style={styles.img} />
                    </Pressable>
                </View>
                <View style={[styles.wrap]}>
                    {renderScreen()}
                </View>
            </View>
        </View>
    );
};

export default PopupModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: Colors.white,
        borderRadius: 8,
    },
    wrap: {
        paddingHorizontal: Spacing.PADDING,
    },
    header: {
        padding: Spacing.PADDING,
        borderStyle: 'solid',
        borderBottomColor: Colors.l2,
        borderBottomWidth: 1,
    },
    btn: {
        position: 'absolute',
        top: scale(20),
        right: Spacing.PADDING,
    },
    img: {
        height: scale(13),
        width: scale(13),
        transform: [{ rotate: '45deg' }],
    },
});
