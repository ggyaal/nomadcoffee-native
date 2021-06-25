import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions, ActivityIndicator, FlatList } from "react-native";
import styled from "styled-components/native";
import SharedLayout from "../components/shared/SharedLayout";

const SEARCH_SHOPS_QUERY = gql`
  query searchShops($term: String!) {
    searchShops(term: $term) {
      id
      name
      photos(page: 1) {
        url
      }
    }
  }
`;

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
`;

const SearchInput = styled.TextInput`
  width: ${(props) => props.width / 1.5}px;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  text-align: center;
`;

const View = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Shop = styled.TouchableOpacity`
  border: 1px solid ${(props) => props.theme.subColor};
  border-radius: 10px;
  padding: 5px;
  background-color: ${(props) => props.theme.mainColor};
  margin-top: 10px;
`;
const ShopPhoto = styled.Image``;
const ShopName = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
const ShopPhotoNot = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;
const NoPhoto = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

export default function ({ navigation }) {
  const { width } = useWindowDimensions();
  const [searchShops, { loading, data, called }] =
    useLazyQuery(SEARCH_SHOPS_QUERY);

  const { register, handleSubmit, setValue } = useForm();
  const onValid = (data) => {
    if (!loading) {
      searchShops({
        variables: { ...data },
      });
    }
  };
  const SearchBox = () => (
    <SearchInput
      width={width}
      placeholder="Search Shops and category"
      placeholderTextColor="white"
      autoCapitalize="none"
      returnKeyType="search"
      returnKeyLabel="Search"
      autoCorrect={false}
      onChangeText={(text) => setValue("term", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("term", {
      required: true,
      minLength: 2,
    });
  }, []);

  const renderItem = ({ item: shop }) => {
    console.log(shop);
    return (
      <Shop>
        {shop.photos.length > 0 ? (
          <ShopPhoto
            source={{ uri: shop.photos[0]?.url }}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <ShopPhotoNot>
            <NoPhoto>No Photo.</NoPhoto>
          </ShopPhotoNot>
        )}
        <ShopName>{shop.name}</ShopName>
      </Shop>
    );
  };

  return (
    <SharedLayout>
      {!called ? (
        <View>
          <Text>Searching by term !</Text>
        </View>
      ) : null}
      {loading ? (
        <View>
          <ActivityIndicator color="white" size="large" />
        </View>
      ) : null}
      {data?.searchShops ? (
        data.searchShops.length > 0 ? (
          <FlatList
            numColumns={3}
            data={data?.searchShops}
            keyExtractor={(shop) => "" + shop.id}
            renderItem={renderItem}
          />
        ) : (
          <View>
            <Text>Not found Shops.</Text>
          </View>
        )
      ) : null}
    </SharedLayout>
  );
}
