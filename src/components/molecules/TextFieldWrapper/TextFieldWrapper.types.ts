export interface TextFieldWrapperProps {
  endAdornment?: React.ReactNode;
  focusedInputIndex: number | null;
  handleBlur: (index: number | null) => void;
  handleFocus: (index: number) => void;
  index: number;
  label: string;
  startAdornment?: React.ReactNode;
  totalFields: number;
  type?: string;
  value?: string;
}

export type useTextFieldWrapperProps = Pick<TextFieldWrapperProps, "value">;
