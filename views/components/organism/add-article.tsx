import React, { useContext } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/application/contexts/account";
import api from "@/infrastructure/services/api";
import styled from "styled-components";

type AddArticleType = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddArticle({ setEditing }: AddArticleType) {
  const { register, handleSubmit, watch, reset } = useForm();
  const context = useContext(AuthContext);
  const name = watch("name");
  const price = watch("price");
  const description = watch("description");
  const thumbnail = watch("thumbnail")?.[0];

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("key", thumbnail);

    try {
      const savedImageObj = await api.saveProductImage(formData);
      const dataSession = await context?.getSession();

      api.saveProduct({
        sellerId: dataSession?.user?.getUsername() as string,
        name,
        description,
        price,
        savedImageObj,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Preview>
        <CCard style={{ width: "18rem" }}>
          {thumbnail && (
            <CCardImage
              orientation="top"
              src={URL.createObjectURL(thumbnail)}
            />
          )}
          <CCardBody>
            <CCardTitle>{name}</CCardTitle>
            <CCardText>{description}</CCardText>
            <CCardText>{price} $</CCardText>
          </CCardBody>
        </CCard>
        <p style={{ textAlign: "center" }}>Aperçu</p>
      </Preview>

      <CForm
        className="m-8"
        onSubmit={handleSubmit(onSubmit)}
        style={formStyle}
      >
        <CRow>
          <CCol md={4}>
            <CFormInput
              {...register("name")}
              id="exampleFormControlInput1"
              label="Name"
              placeholder="Super hat"
            />
          </CCol>

          <CCol md={4}>
            <CFormInput
              {...register("price")}
              id="exampleFormControlInput1"
              label="Price"
              placeholder="50"
            />
          </CCol>

          <CCol md={4}>
            <CFormInput
              {...register("thumbnail")}
              type="file"
              id="exampleFormControlInput1"
              label="Thumbnail"
              placeholder="my-secured-password"
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CCol>
        </CRow>

        <CFormTextarea
          {...register("description")}
          id="exampleFormControlInput1"
          label="Description"
          placeholder="The thing for this period"
        />
        <ActionsBtn>
          <CButton
            color="info"
            variant="outline"
            type="submit"
            size="sm"
            className="mr-5"
          >
            Add to my shop
          </CButton>
          <CButton
            color="secondary"
            size="sm"
            variant="outline"
            onClick={() => setEditing(false)}
          >
            Cancel
          </CButton>
        </ActionsBtn>
      </CForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
  }
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 2em;
  position: relative;
  bottom: 10px;
`;

const formStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "flex-end",
  gap: "1em",
};

const ActionsBtn = styled.div`
  gap: 1em;
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;
