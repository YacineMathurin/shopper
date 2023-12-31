"use client";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CButton, CCardLink, CForm, CFormInput } from "@coreui/react";
import { AuthContext } from "../contexts/account";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { register, handleSubmit, watch, reset } = useForm();
  const context = useContext(AuthContext);
  const router = useRouter();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async () => {
    console.log("Submitted !", email, password);
    try {
      const result = await context?.authenticate(email, password);
      console.log("Authenticate", result);
      router.replace("/seller");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign in to your account</h1>

      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CFormInput
          {...register("email")}
          type="email"
          id="exampleFormControlInput1"
          label="Email address"
          placeholder="name@example.com"
          text="Must be 8-20 characters long."
          aria-describedby="exampleFormControlInputHelpInline"
          defaultValue={"baby@baby.com"}
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
          defaultValue={"Mybaby5*"}
        />
        <br />
        <CButton color="secondary" type="submit" size="sm">
          Sign in
        </CButton>
      </CForm>
      <br />
      <div>
        <p>
          Being in trouble ? May be you've{" "}
          <Link href="#">Forgotten your password</Link> or should you{" "}
          <Link href="/auth/register">create an account</Link>
        </p>
      </div>
    </div>
  );
}
