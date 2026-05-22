export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the user selects an option. */
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  label?: string;
  hint?: string;
  /** Error message; also applies error border + ring. */
  error?: string;
  /** Node rendered inside the left edge of the trigger. */
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  /** Applied to the trigger button. */
  className?: string;
  id?: string;
}
