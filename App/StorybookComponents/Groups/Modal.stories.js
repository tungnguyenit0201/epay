import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, object, select} from '@storybook/addon-knobs';
import {Images} from 'themes';
import Modal from './Modal';
import Button from '../Atoms/Button';

storiesOf('Groups', module)
  .addDecorator(withKnobs)
  .add('Modal', () => <Modal
                      visible
                      onClose={() => console.log('press')}
                      content="Đã có lỗi xảy ra trong quá trình đồng bộ. Vui lòng thử lại."
                      buttonGroup={() => (
                        <Button label="Thử lại" onPress={() => console.log('press')} />
                      )}
                    />)
