import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    useWindowDimensions,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Text } from 'components';
import { Images, Colors, Spacing } from 'themes';
import { useTranslation } from 'context/Language';

const AlertModal = (props = {}) => {
    const { navigation, route = {} } = props;
    const { onClose, title, message, positiveButton, negativeButton, style, icon, iconColor } = route.params || {};
    const strings = useTranslation();
    const { width, height } = useWindowDimensions();
    const popupHeight = height * 311 / 812;
    const modalStyle = {
        width: width * 0.8,
        minHeight: height * 0.48,
    };

    const headerStyle = {
        width: modalStyle.width,
        minHeight: popupHeight * 0.4,
    };

    const iconStyle = {
        tintColor: iconColor,
    };

    const onPressPositive = () => {
        positiveButton?.onPress?.();
        navigation.pop();
        onClose?.();
    };

    const onPressNegative = () => {
        negativeButton?.onPress?.();
        navigation.pop();
        onClose?.();
    };

    return (
        <View style={styles.container}>
            <View style={[styles.modal, modalStyle, style]}>
                <View style={[styles.header, headerStyle]}>
                    <ImageBackground
                        source={Images.BgModal}
                        style={[styles.headerBackground]}
                        resizeMode="contain">
                        {!!icon && (
                            <View style={styles.iconContainer}>
                                <Image
                                    source={icon}
                                    style={[styles.icon, iconStyle]}
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                    </ImageBackground>
                </View>
                <View style={styles.main}>
                    {!!title &&
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    }
                    {!!message &&
                        <Text style={styles.message}>
                            {message}
                        </Text>
                    }
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={onPressPositive}>
                        <ImageBackground
                            source={Images.primaryButton}
                            resizeMode="cover"
                            style={styles.positiveButton}
                        >
                            <Text style={styles.positiveText}>{positiveButton?.title || strings?.agree}</Text>
                        </ImageBackground>

                    </TouchableOpacity>
                    {
                        !!negativeButton &&
                        <TouchableOpacity
                            style={styles.negativeButton}
                            onPress={onPressNegative}>
                            <Text style={styles.negativeText}>{negativeButton.title}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
};

export default AlertModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: Colors.white,
        borderRadius: 16,
    },
    header: {
        width: '100%',
        height: 124,
        alignItems: 'center',
    },
    headerBackground: {
        width: '100%',
        height: '100%',
        marginTop: -10,
    },
    main: {
        paddingVertical: 16,
        marginHorizontal: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 8,
        marginTop: -8,
    },
    message: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666666',
    },
    positiveButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.PADDING / 2,
    },
    positiveText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    negativeButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    negativeText: {
        color: '#666666',
    },
    icon: {
        width: 60,
        height: 60,
    },
    iconContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        overflow: 'hidden',
        borderRadius: 10,
        elevation: 2,
        backgroundColor: Colors.cl1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15,
        flexDirection: 'row',
    },
});
