import styles from "./Toggle.module.css";
import Label, { LabelProps } from "./Label";

type ToggleProps = Omit<LabelProps, 'children'> & {
  className?: string;
  isOn: boolean;
  setIsOn: (val: boolean) => void;
};

const Toggle = ({ isOn, setIsOn, ...props }: ToggleProps) => {

  return (
    <Label dimensions={props.dimensions} label={props.label} labelPosition={props.labelPosition}>
      <div className={`${styles.toggleContainer} ${isOn ? styles.toggleOn : ''}`} onClick={() => setIsOn(!isOn)}>
        {isOn && <span>On</span>}
        <div className={styles.toggleSwitch} />
        {!isOn && <span>Off</span>}
      </div>
    </Label>
  );
};

export default Toggle;
