import React from "react";
import { CForm } from "@coreui/react";
import { CFormProps } from "@coreui/react/dist/esm/components/form/CForm";

const Form: React.FC<CFormProps> = ({ children, ...props }) => {
  return <CForm {...props}>{children}</CForm>;
};

export default Form;
