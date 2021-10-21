import React, {useState} from 'react';
import {base, Colors} from 'themes';
import {Switch} from 'react-native-ui-lib';

const SwitchCustom = ({
  style,
  onChange,
  onColor = Colors.brd1,
  offColor = Colors.bs1,
  initialValue = false,
  ...props
}) => {
  const [isActive, setActive] = useState(initialValue);

  const onValueChange = async value => {
    const result = onChange ? await onChange(value) : undefined;
    if (result === undefined || result) {
      setActive(value);
    }
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
