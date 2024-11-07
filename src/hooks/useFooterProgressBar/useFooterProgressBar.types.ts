export interface useFooterProgressBarProps {
  buttonText?: string;
  isDisabled: boolean;
  isLoading: boolean;
  onSubmit: () => void;
}

export interface FooterDetailsType {
  backUrl: string;
  nextUrl: string;
  progressPercentage: {
    setp1: number;
    setp2: number;
    setp3: number;
  };
}
