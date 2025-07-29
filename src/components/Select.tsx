import styles from "./Select.module.css";
import { forwardRef, Fragment, SelectHTMLAttributes, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Label, { LabelProps } from "./Label";
import Input from "./Input";

export type OptionProps = {
  key: string;
  value: string;
  children?: OptionProps[];
};

export type SelectProps = Omit<LabelProps, 'children'> & SelectHTMLAttributes<HTMLSelectElement> & {
  options: OptionProps[];
};

type SelectMultipleProps = Omit<LabelProps, 'children'> & {
  value?: string[];
  options: OptionProps[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

type SelectMultipleOptionProps = Omit<LabelProps, 'children'> & {
  options: OptionProps[];
  level: number;
  selecteds: string[];
  setSelecteds: (v: string[]) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMultipleOptions = ({ options, level = 0, selecteds, setSelecteds, ...props }: SelectMultipleOptionProps) => {

  const handleSelect = (val: string) => {

    let vals = [];
    if (selecteds.includes(val)) {
      vals = [...selecteds.filter((v) => v != val)];
    } else {
      vals = [...selecteds, val];
    }

    if (props.onChange !== undefined) {
      
      const event = {
        target: {
          selectedOptions: vals.map(value => ({ value })), // simula o HTMLCollection
          value: '', // não importa, pode ser string vazia
        }
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      
      props.onChange(event);
    }
    
    setSelecteds(vals);
  };

  return (
    options.map((opt, i) => (
      <Fragment key={i} >
        <div key={i} className={styles.selectMultipleOption} onClick={() => { handleSelect(opt.key) }}>
          <div className={`${styles.check} ${selecteds.includes(opt.key) ? styles.checked : ''}`}></div>
          {`${'\u00A0'.repeat(level * 2)}${opt.value}`}
        </div>
        {opt.children && <SelectMultipleOptions options={opt.children} level={level + 1} selecteds={selecteds} setSelecteds={setSelecteds} onChange={props.onChange} />}
      </Fragment>
    ))
  );
};

const SelectMultiple = ({ dimensions = "s12 m6 l3", label, labelPosition = 'top', options, ...props }: SelectMultipleProps) => {

  const divRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [selecteds, setSelecteds] = useState<string[]>(props.value || []);
  const [valueText, setValueText] = useState<string>('');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    if (isFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  useEffect(() => {
    let lbl = '';

    const getOptionByKey = (opts: OptionProps[], key: string): OptionProps | null => {
      let rt;
      for (let i = 0; i < opts.length; i++) {
        if (opts[i].key === key) {
          return opts[i];
        } else if ((opts[i].children ?? []).length > 0) {
          rt = getOptionByKey(opts[i].children ?? [], key);
          if (rt !== null) {
            return rt;
          }
        }
      }
      return null;
    };

    if (selecteds.length === 1) {
      const option = getOptionByKey(options, selecteds[0]);
      lbl = option?.value || '';
    } else if (selecteds.length > 1) {
      lbl = `${selecteds.length} selecionados`;
    }

    setValueText(lbl);
    // if (props.onChange !== undefined) {

    //   const event = {
    //     target: {
    //       selectedOptions: selecteds.map(value => ({ value })), // simula o HTMLCollection
    //       value: '', // não importa, pode ser string vazia
    //     }
    //   } as unknown as React.ChangeEvent<HTMLSelectElement>;

    //   props.onChange(event);
    // }
  }, [selecteds, options]);

  return (
    <Label dimensions={dimensions} label={label} labelPosition={labelPosition}>
      <div ref={divRef} className={styles.selectMultipleOptionsWrapper}>
        <Input
          readOnly
          onFocus={() => setIsFocused(true)}
          value={valueText}
        />
        <div className={`${styles.selectMultipleButtonDown} ${isFocused ? styles.hovered : ''}`}>
          <IoIosArrowDown />
        </div>
        {isFocused &&
          <div className={styles.selectMultipleOptionsContainer}>
            <SelectMultipleOptions options={options} level={0} selecteds={selecteds} setSelecteds={setSelecteds} onChange={props.onChange} />
          </div>
        }
      </div>
    </Label>
  );
}

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
      <>
        {props.multiple ?
          <SelectMultiple
            options={options}
            dimensions={dimensions}
            label={label}
            labelPosition={labelPosition}
            value={props.value as string[]}
            onChange={props.onChange}
          />
          :
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
        }
      </>
    );
  }
);

export default Select;
