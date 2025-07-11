import Label, { LabelProps } from "./Label";
import styles from "./Select.module.css";
import { forwardRef, Fragment, SelectHTMLAttributes } from "react";

export type OptionProps = {
  key: string;
  value: string;
  children?: OptionProps[];
};

export type SelectProps = Omit<LabelProps, 'children'> & SelectHTMLAttributes<HTMLSelectElement> & {
  options: OptionProps[];
};

const Options = ({ options, level = 0 }: { options: OptionProps[], level: number }) => {
  return (
    options.map((opt, i) => (
      <Fragment key={i} >
        <option value={opt.key} className={styles.option}>{`${'\u00A0'.repeat(level * 2)}${opt.value}`}</option>
        {opt.children && <Options options={opt.children} level={level + 1} />}
      </Fragment>
    ))
  );
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ dimensions = "s12 m6 l3", label, labelPosition = 'top', options, ...props }, ref) => {

    return (
      <Label dimensions={dimensions} label={label} labelPosition={labelPosition}>
        <select
          ref={ref}
          {...props}
          className={`${styles.select} ${props?.className ? props.className : ''}`}
        >
          <option></option>
          <Options options={options} level={0} />
        </select>
      </Label>
    );
  }
);

export default Select;
