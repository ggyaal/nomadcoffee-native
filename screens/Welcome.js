import React from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import AuthLink from "../components/auth/AuthLink";

export default function Welcome({ navigation }) {
  const goToCreateAcount = () => navigation.navigate("createAccount");
  const goToLogin = () => navigation.navigate("login");

  return (
    <AuthLayout>
      <AuthButton
        text="Create New Account"
        disabled={false}
        onPress={goToCreateAcount}
      />
      <AuthLink text="Login" onPress={goToLogin} />
    </AuthLayout>
  );
}
