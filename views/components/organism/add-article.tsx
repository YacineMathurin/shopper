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
        sellerId: dataSession?.user.username,
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
    <div>
      <Wrapper>
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
      </Wrapper>

      <CForm className="m-8" onSubmit={handleSubmit(onSubmit)}>
        <CRow>
          <CCol md={4}>
            <CFormInput
              {...register("name")}
              id="exampleFormControlInput1"
              label="Name"
              placeholder="Super hat"
            />
          </CCol>
          <br />
          <CCol md={4}>
            <CFormInput
              {...register("price")}
              id="exampleFormControlInput1"
              label="Price"
              placeholder="50"
            />
          </CCol>
          <br />
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
        <br />
        <CFormTextarea
          {...register("description")}
          id="exampleFormControlInput1"
          label="Description"
          placeholder="The thing for this period"
        />
        <br />
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
      </CForm>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em;
`;
