import React from 'react'
import { NumericFormat } from 'react-number-format';

export const FormattedNumber = ({ value, decimalScale = 2 }) => {
    return (
        <NumericFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" Dhs"}
          decimalScale={decimalScale}
          fixedDecimalScale={true}
        />
      );
}
