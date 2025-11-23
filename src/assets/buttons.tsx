import React from "react";
import styles from "@/app/page.module.css";

export const BUTTON_STYLES = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  action: styles.btnAction,
  retreat: styles.btnRetreat,
  warm: styles.btnWarm,
  error: styles.btnError,
  danger: styles.btnDanger,
  success: styles.btnSharp,
  inverted: styles.btnInverted,
};

export const BUTTON_SIZES = {
  small: styles.btnSmall,
  medium: styles.btnMedium,
  large: styles.btnLarge,
  Xlarge: styles.btnXLarge
};

export const BUTTON_VARIANTS = {
  contained: styles.btnContained,
  outlined: styles.btnOutlined,
  filled: styles.btnFilled,
  text: styles.btnText,
};

export const BUTTON_LOADING = styles.btnLoading;
export const BUTTON_DISABLED = styles.btnDisabled;
export const BUTTON_FULLWIDTH = styles.btnFullWidth;

type SxProps = React.CSSProperties;

const sxToStyle = (sx?: SxProps): React.CSSProperties => {
  return sx ? { ...sx } : {};
};

type ButtonBaseProps = {
  tone?: keyof typeof BUTTON_STYLES;
  size?: keyof typeof BUTTON_SIZES;
  variant?: keyof typeof BUTTON_VARIANTS;
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps;
};

type ButtonProps<C extends React.ElementType = "button"> = 
  ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps> & {
    component?: C;
  };

export const Button = <C extends React.ElementType = "button">({
  component,
  tone = 'primary',
  size = "medium",
  variant = "filled",
  loading = false,
  fullWidth = false,
  disabled,
  startIcon,
  endIcon,
  sx,
  children,
  ...rest
}: ButtonProps<C>) => {
  const Component = component || "button";

  const classList = [
    styles.btnBase,
    BUTTON_STYLES[tone],
    BUTTON_SIZES[size],
    BUTTON_VARIANTS[variant],
    fullWidth && BUTTON_FULLWIDTH,
    loading && BUTTON_LOADING,
    disabled && BUTTON_DISABLED,
    startIcon && styles.btnWithStartIcon,
    endIcon && styles.btnWithEndIcon
  ].filter(Boolean).join(" ");

  const inlineStyles = sxToStyle(sx);

  return (
    <Component
      className={classList}
      style={inlineStyles}
      disabled={disabled || loading}
      {...rest}
    >
      {startIcon && <span className={styles.btnIconWrapper}>{startIcon}</span>}
      {loading && <span className={styles.spinnerMedium} aria-hidden="true" />}

      <span>{children}</span>
      {endIcon && <span className={styles.btnIconWrapper}>{endIcon}</span>}
    </Component>
  );
};
