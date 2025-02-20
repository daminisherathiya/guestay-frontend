import { forwardRef } from "react";

import MUISlide, { SlideProps as MUISlideProps } from "@mui/material/Slide";

export interface SlideProps extends MUISlideProps {}

export const Slide = forwardRef<HTMLDivElement, SlideProps>((props, ref) => (
  <MUISlide ref={ref} {...props} />
));

Slide.displayName = "Slide";
