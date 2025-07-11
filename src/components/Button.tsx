import styles from "./Button.module.css";
import { ButtonHTMLAttributes, forwardRef } from "react";
import LoadingIcon from '../images/loading_white.svg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    style?: 'primary' | 'secondary' | 'light';
    width?: 'default' | 'min';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, style, isLoading, ...props }, ref) => {

        let className = styles.button;
        className += props?.className ? ` ${props.className}` : '';
        className += style ? ` ${styles[style]}` : '';
        className += isLoading || props.disabled ? ` ${styles.loading}` : '';
        className += props.width ? ` ${styles[props.width]}` : '';

        return (
            <button
                disabled={isLoading ? true : false}
                // disabled={true}
                ref={ref}
                {...props}
                className={className}
            >
                <LoadingIcon />
                <div className={styles.children}>{children}</div>
            </button>
        );
    }
);

export default Button;
