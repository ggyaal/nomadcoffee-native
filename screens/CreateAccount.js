import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import AuthLink from "../components/auth/AuthLink";
import AvoidKeyboard from "../components/AvoidKeyboard";
import { AuthInput } from "../components/share";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const goToLogin = () => navigation.navigate("login");
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    console.log("OK: ", ok);
    if (ok) {
      navigation.navigate("login", {
        username,
        password,
      });
    }
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const onNext = (next) => {
    next?.current?.focus();
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("name", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  const onVaild = (data) => {
    if (!loading) {
      createAccount({ variables: { ...data } });
    }
  };

  return (
    <AuthLayout>
      <AvoidKeyboard behavior="padding" keyboardVerticalOffset={80}>
        <AuthInput
          placeholder="username"
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => onNext(emailRef)}
          onChangeText={(text) => setValue("username", text)}
        />
        <AuthInput
          ref={emailRef}
          placeholder="email"
          returnKeyType="next"
          autoCapitalize="none"
          keyboardType="email-address"
          onSubmitEditing={() => onNext(nameRef)}
          onChangeText={(text) => setValue("email", text)}
        />
        <AuthInput
          ref={nameRef}
          placeholder="name"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("name", text)}
        />
        <AuthInput
          placeholder="password"
          ref={passwordRef}
          secureTextEntry
          lastInput={true}
          onChangeText={(text) => setValue("password", text)}
          onSubmitEditing={handleSubmit(onVaild)}
        />
        <AuthButton
          text="Create Account"
          onPress={handleSubmit(onVaild)}
          loading={loading}
          disabled={
            loading ||
            !watch("username") ||
            !watch("email") ||
            !watch("name") ||
            !watch("password")
          }
        />
        <AuthLink
          text="Login &rarr;"
          onPress={goToLogin}
          description="already existed your Account?"
        />
      </AvoidKeyboard>
    </AuthLayout>
  );
}
