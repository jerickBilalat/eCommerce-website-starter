import React, { Fragment } from 'react';

const TextInput = ({ name, onChange, placeholder, value, error }) => {
  const style = {
    color: 'red'
  };
  return (
    <Fragment>
      {error && <div style={style}>{error}</div>}
      <input
        autoComplete="off"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Fragment>
  );
};

export default TextInput;
