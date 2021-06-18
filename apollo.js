import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const LogUserIn = async (token) => {
  await AsyncStorage.setItem("token", token);
  isLoggedInVar(true);
};

export const LogUserOut = async () => {
  await AsyncStorage.removeItem("token");
  isLoggedInVar(false);
};

export const getTokenToStorage = async () => {
  return await AsyncStorage.getItem("token");
};

const httpLink = createHttpLink({
  uri: "https://nomadcoffee-backend-sexy.herokuapp.com/",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
