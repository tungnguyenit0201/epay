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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomModal = (props = {}) => {
    const { navigation, route = {} } = props;
    const { onClose, screen: ScreenComp, title, params } = route.params || {};
    const { width } = useWindowDimensions();
    const { bottom } = useSafeAreaInsets();

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
        <View style={[styles.modal, { width: width, bottom: -bottom }]}>
            <View style={styles.header}>
                <Text bold fs="h6" centered color={Colors.cl1}>
                    {title}
                </Text>
                <Pressable style={styles.btn} onPress={onPressClose}>
                    <Image source={Images.WidthDraw.Plus} style={styles.img} />
                </Pressable>
            </View>
            <View style={styles.wrap}>
                {renderScreen()}
            </View>
        </View>
    );
};

export default BottomModal;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: Colors.white,
        position: 'absolute',
        borderTopLeftRadius: Spacing.PADDING,
        borderTopRightRadius: Spacing.PADDING,
    },
    wrap: {
        // paddingHorizontal: Spacing.PADDING,
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
