/* eslint-disable react/forbid-prop-types */
import "scss/inputs.scss";
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const SimpleInput = React.memo(
  ({
    inputProps,
    onChange,
    type,
    label,
    value,
    uncontrolled,
    validation,
    readOnly,
    allowIncorrectValues,
    classFieldName,
    classInputName,
    error,
    helperText,
    name,
    icon,
    textAlign,
  }) => {
    const propValue = value === null ? "" : value;
    const [lastValue, setLastValue] = useState(propValue);
    const inputRef = useRef(null);
    const onInputChange = useCallback(
      (event) => {
        const changedValue = event.target.value;
        if (
          changedValue !== "" &&
          validation &&
          !allowIncorrectValues &&
          !validation(changedValue)
        ) {
          inputRef.current.value = !lastValue ? "" : lastValue;
        } else {
          onChange(changedValue);
          setLastValue(changedValue);
        }
      },
      [allowIncorrectValues, lastValue, onChange, validation]
    );
    const inputElementProps = useMemo(() => {
      const inputElementPropsList = {};

      if (!uncontrolled) {
        inputElementPropsList.value = propValue;
      }

      return { ...inputElementPropsList, ...inputProps };
    }, [inputProps, uncontrolled, propValue]);

    const validElement = validation && value ? validation(String(value)) : true;

    const inputElement = (
      <span className={`field ${classFieldName}`}>
        <span className="control">
          <TextField
            className={`${classInputName}`}
            ref={inputRef}
            onChange={onInputChange}
            type={type}
            label={label}
            error={!validElement || error}
            helperText={!validElement || error ? helperText : null}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...inputElementProps}
            inputProps={{
              style: { textAlign: `${textAlign}` },
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              readOnly,
              startAdornment: icon ? (
                <InputAdornment position="start">
                  <i className={icon} />
                </InputAdornment>
              ) : null,
            }}
            name={name}
            variant="standard"
          />
        </span>
      </span>
    );

    // if (label) {
    //   inputElement = <InputLabel text={label}>{inputElement}</InputLabel>;
    // }
    return inputElement;
  }
);

SimpleInput.defaultProps = {
  inputProps: null,
  label: null,
  value: "",
  onChange: () => null,
  uncontrolled: false,
  validation: null,
  readOnly: false,
  allowIncorrectValues: false,
  classFieldName: "",
  classInputName: "",
  error: false,
  helperText: null,
  name: "",
  icon: null,
  textAlign: "left",
};
SimpleInput.propTypes = {
  inputProps: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  uncontrolled: PropTypes.bool,
  validation: PropTypes.func,
  readOnly: PropTypes.bool,
  allowIncorrectValues: PropTypes.bool,
  classFieldName: PropTypes.string,
  classInputName: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  textAlign: PropTypes.string,
};

export default SimpleInput;
