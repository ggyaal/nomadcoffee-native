import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";
import { gql, useQuery } from "@apollo/client";

const SEE_COFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      user {
        name
        email
        avatarURL
      }
      photos(page: 1) {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
`;

const Shop = styled.View``;

const ShopText = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
`;

const Img = styled.Image``;

export default function ({ navigation }) {
  const { data, loading, refetch, fetchMore } = useQuery(
    SEE_COFFEESHOPS_QUERY,
    {
      variables: { offset: 0 },
    }
  );

  const renderShop = ({ item: shop }) => {
    return <Photo {...shop} />;
  };

  const refresh = async () => {
    setRefreshting(true);
    await refetch();
    setRefreshting(false);
  };

  const [refreshing, setRefreshting] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <Text>Home</Text>
      <FlatList
        onEndReachedThreshold={0}
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.seeCoffeeShops?.length } })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(shop) => String(shop.id)}
        renderItem={renderShop}
      />
    </ScreenLayout>
  );
}
