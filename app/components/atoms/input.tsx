import { CFormInput } from "@coreui/react";
import { CFormInputProps } from "@coreui/react/dist/esm/components/form/CFormInput";
import React from "react";

const Input: React.FC<CFormInputProps> = React.forwardRef((props, ref) => (
  <CFormInput {...props} ref={ref as React.Ref<HTMLInputElement>} />
));

export default Input;
