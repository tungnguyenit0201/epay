import React, { useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Icon from '../../Atoms/Icon';
import TextInput from '../../Atoms/TextInput';
import { Colors, Fonts, Spacing, Images } from 'themes';
import { scale } from 'utils/Functions';
import HelpModal from '../../Groups/HelpModal';
import Content from '../../Atoms/Content';
import BigLogo from '../../Atoms/BigLogo';
import HeaderBg from '../../Atoms/HeaderBg';
import { Formik } from 'formik';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const EnterEmail = () => {
    let [disable, setDisable] = useState(true);
    const translation = require('../../../Context/Language/vi.json');
    const [showModal, setShowModal] = useState(false);
    return (
        <SafeAreaProvider>
            <Formik
                initialValues={{
                    FullName: '',
                }}
                // validationSchema={phoneSchema}
                onSubmit={() => console.log('press')}>
                {({
                    handleChange: _handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    errors,
                    values,
                }) => {
                    const handleChange = field => value => {
                        setFieldValue(field, value);
                        setFieldTouched(field, true, false);
                        console.log('setpersonalinfo')
                    };

                    return (
                        <>
                            <View style={styles.container}>
                                <HeaderBg>
                                    <Header style={[styles.mt30]} back title={translation.notification} />
                                </HeaderBg>
                                <Content
                                    title="Nhập email"
                                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                />
                                <View style={[styles.wrap, { marginTop: Spacing.PADDING * 2 }]}>
                                    <TextInput
                                        required
                                        onFocus={e => setDisable(false)}
                                        placeholder="Nhập email của bạn"
                                        onChange={handleChange('FullName')}
                                        onBlur={handleBlur('FullName')}
                                        // error={touched.FullName && errors.FullName}
                                        value={values.FullName}
                                        isDeleted={values.FullName}
                                    />
                                </View>
                            </View>

                            <View
                                style={[
                                    styles.wrap,
                                    {
                                        paddingVertical: Spacing.PADDING,
                                        backgroundColor: Colors.BACKGROUNDCOLOR,
                                    },
                                ]}>
                                <Button
                                    disabled={disable}
                                    label={translation.continue}
                                    style={styles.btn}
                                    onPress={handleSubmit}
                                />
                            </View>
                            <HelpModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                                onPress={() => console.log('press')}
                            />
                        </>
                    );
                }}
            </Formik>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUNDCOLOR,
    },
    wrap: {
        paddingHorizontal: Spacing.PADDING,
    },
    btn: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    pRight: {
        position: 'absolute',
        right: 15,
    },
    firstIcon: {
        width: scale(24),
        height: scale(24),
    },
    header: {
        paddingTop: 10,
        backgroundColor: Colors.white,
        color: Colors.BLACK,
    },
    mt30: {
        marginTop: -30
    }
});

export default EnterEmail;
