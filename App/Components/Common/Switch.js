import React, {useState} from 'react';
import {base, Colors} from 'themes';
import {Switch} from 'react-native-ui-lib';

const SwitchCustom = ({
  style,
  onChange,
  onColor = Colors.cl1,
  offColor = Colors.l3,
  initialValue = false,
  ...props
}) => {
  const [isActive, setActive] = useState(initialValue);

  const onValueChange = value => {
    setActive(value);
    onChange && onChange(value);
  };

  return (
    <Switch
      style={[base.leftAuto, style]}
      onColor={onColor}
      offColor={offColor}
      value={isActive}
      onValueChange={onValueChange}
      {...props}
    />
  );
};

export default SwitchCustom;
