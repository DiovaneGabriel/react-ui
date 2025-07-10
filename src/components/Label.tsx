import React from "react";
import styles from "./Label.module.css";

export type LabelProps = {
  children: React.ReactNode;
  dimensions?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
}

const Label = ({ children, dimensions = "s12 m6 l3", labelPosition = "top", ...props }: LabelProps) => {
  return (
    <div className={`${styles.container} ${labelPosition == 'top' ? styles.column : ''} ${dimensions}`}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      {children}
    </div>
  );
};

export default Label;
