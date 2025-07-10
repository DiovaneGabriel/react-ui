import styles from "./Input.module.css";
import { forwardRef, InputHTMLAttributes } from "react";
import Label, { LabelProps } from "./Label";

export type InputProps = Omit<LabelProps, 'children'> & InputHTMLAttributes<HTMLInputElement> & {
  theme?: "box";
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ dimensions = "s12 m6 l3", label, labelPosition = 'top', theme, ...props }, ref) => {

    const value = props.value === null || props.value === undefined ? '' : props.value;

    return (
      <Label dimensions={dimensions} label={label} labelPosition={labelPosition}>
        <input
          ref={ref}
          {...props}
          className={`${styles.input} ${props?.className ? props.className : ''} ${theme ? styles[theme] : ''}`}
          value={value}
        />
      </Label>
    );
  }
);

Input.displayName = "CustomInput";

export default Input;
