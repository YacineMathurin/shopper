"use client";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CButton, CCardLink, CForm, CFormInput } from "@coreui/react";
import { AuthContext } from "@/application/contexts/account";
import Link from "next/link";

export default function Auth() {
  const { register, handleSubmit, watch, reset } = useForm();
  const context = useContext(AuthContext);

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async () => {
    console.log("Submitted !");
    try {
      const result = await context?.signup(email, password);
      console.log("signup", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create your account and join us</h1>

      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CFormInput
          {...register("email")}
          type="email"
          id="exampleFormControlInput1"
          label="Email address"
          placeholder="name@example.com"
          text="Must be 8-20 characters long."
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <br />
        <CFormInput
          {...register("password")}
          type="password"
          id="exampleFormControlInput1"
          label="Password"
          placeholder="my-secured-password"
          text="Must be 8-20 characters long."
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <br />
        <CButton color="secondary" type="submit" size="sm">
          Register
        </CButton>
      </CForm>
      <br />
      <div>
        <p>
          Alreay registred, go back to the <Link href="/auth">login page</Link>{" "}
          to get in.
        </p>
      </div>
    </div>
  );
}
