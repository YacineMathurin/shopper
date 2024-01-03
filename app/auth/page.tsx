"use client";

import Link from "next/link";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CButton } from "@coreui/react";
import { AuthContext } from "../contexts/account";
import { useRouter } from "next/navigation";

import Input from "../components/atoms/input";
import Form from "../components/atoms/form";

export default function Auth() {
  const { register, handleSubmit, watch, reset } = useForm();
  const context = useContext(AuthContext);
  const router = useRouter();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async () => {
    console.log("Submitted !", watch("email"), password);
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

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          type="email"
          label="Email address"
          placeholder="name@example.com"
          text="Must be 8-20 characters long."
          aria-describedby="exampleFormControlInputHelpInline"
          defaultValue={"baby@baby.com"}
        />
        <br />
        <Input
          {...register("password")}
          type="password"
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
      </Form>
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
