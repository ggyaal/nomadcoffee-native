import React, { useEffect, useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import AvoidKeyboard from "../components/AvoidKeyboard";
import { AuthInput } from "../components/share";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthLink from "../components/auth/AuthLink";
import { LogUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ navigation, route: { params } }) {
  const goToCreateAcount = () => navigation.navigate("createAccount");
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });

  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await LogUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const passwordRef = useRef();

  const onNext = (next) => {
    next?.current?.focus();
  };

  const onVaild = (data) => {
    if (!loading) {
      login({ variables: { ...data } });
    }
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <AvoidKeyboard behavior="padding" keyboardVerticalOffset={50}>
        <AuthInput
          value={watch("username")}
          placeholder="username"
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("username", text)}
        />
        <AuthInput
          value={watch("password")}
          placeholder="password"
          ref={passwordRef}
          secureTextEntry
          lastInput={true}
          autoCapitalize="none"
          onChangeText={(text) => setValue("password", text)}
          onSubmitEditing={handleSubmit(onVaild)}
        />
        <AuthButton
          text="Log in"
          onPress={handleSubmit(onVaild)}
          disabled={!watch("username") || !watch("password") || loading}
          loading={loading}
        />
        <AuthLink
          text="Create Account. &rarr;"
          onPress={goToCreateAcount}
          description="You don't have Account?"
        />
      </AvoidKeyboard>
    </AuthLayout>
  );
}
