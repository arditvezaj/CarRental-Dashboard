import React, { forwardRef, useId } from "react";
import cn from "classnames";
import Label from "@/components/atoms/Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
  valid?: boolean;
  classNameInput?: string;
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg";
  qa?: string | null;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    type = "text",
    error = false,
    required = false,
    disabled = false,
    valid = false,
    classNameInput = "",
    className = "",
    errorText = "",
    rounded = "lg",
    qa = null,
    icon = null,
    ...rest
  } = props;

  const id = useId();

  const styles = {
    base: "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:shadow-inner disabled:text-gray-400 block h-10 flex-1 border-0 disabled:bg-gray-100 appearance-none border w-full py-2 px-3 bg-white text-gray-700 shadow-sm text-base focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-1 focus:ring-inset focus:ring-primary-600",
    state: {
      normal: "placeholder-gray-400 border-gray-300 focus:ring-primary-600",
      error: "border-red-600 focus:ring-red-600",
      valid: "border-green-600 focus:ring-green-600",
      disabled: "cursor-not-allowed bg-gray-100 shadow-inner text-gray-400",
    },
    rounded: {
      none: null,
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <Label id={id}>
          {label} {required && <span className="text-sm text-gray-500">*</span>}
        </Label>
      )}
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[18px]">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={cn(classNameInput, [
          styles.base,
          rounded && styles.rounded[rounded],
          error ? styles.state.error : styles.state.normal,
          valid ? styles.state.valid : styles.state.normal,
          disabled && styles.state.disabled,
          icon && "pl-[42px]",
        ])}
        disabled={disabled}
        required={required}
        data-qa={qa}
        autoComplete={type === "password" ? "current-password" : "off"}
        {...rest}
      />
      {error && <p className="mt-2 text-sm text-red-600">{errorText}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
