import React, { useState } from "react";
import Head from "next/head";
import SignupForm from "@/components/Forms/SignupForm";
import LoginForm from "@/components/Forms/LoginForm";

const AuthForms = () => {
  const [displayLoginForm, setDisplayLoginForm] = useState(true);

  return (
    <>
      <Head>
        <title>Herogram Login</title>
      </Head>
      {displayLoginForm ? (
        <LoginForm setDisplayLoginForm={setDisplayLoginForm} />
      ) : (
        <SignupForm setDisplayLoginForm={setDisplayLoginForm} />
      )}
    </>
  );
};

export default AuthForms;
