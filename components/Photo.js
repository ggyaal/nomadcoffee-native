import React, { useEffect, useState } from "react";
import PropTypes, { shape } from "prop-types";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import { Image, useWindowDimensions } from "react-native";
import SharedLink from "./shared/SharedLink";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 10px;
  width: 100%;
  margin-bottom: 10px;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const Avatar = styled.Image`
  border-radius: 25px;
  margin-right: 10px;
`;
const Main = styled.View``;
const ShopName = styled.Text`
  color: ${(props) => props.theme.subColor};
  margin-left: 10px;
  font-weight: 600;
  font-size: 17px;
`;
const PhotoFile = styled.Image``;
const Categories = styled.View`
  flex-direction: row;
  padding: 10px;
`;
const Category = styled(SharedLink)`
  margin-right: 10px;
`;
const Info = styled.View``;

export default function Photo({
  id,
  name,
  user,
  photos,
  categories,
  lat,
  long,
}) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 500);
  let photoFile = null;
  if (photos) {
    photoFile = photos[0]?.url;
  }
  useEffect(() => {
    if (photoFile) {
      Image.getSize(photoFile, (width, height) => {
        setImageHeight(height / 4);
      });
    }
  }, [photoFile]);
  return (
    <Container>
      <Header>
        <Avatar
          resizeMode="contain"
          source={{ uri: user.avatarURL }}
          style={{ width: 50, height: 50 }}
        />
        <SharedLink
          text={user.name}
          bold={600}
          size={16}
          onPress={() =>
            navigation.navigate("Profile", { username: user?.name })
          }
        />
      </Header>
      <Main>
        <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
          <ShopName>{name}</ShopName>
        </TouchableOpacity>
        {photoFile && (
          <PhotoFile
            resizeMode="contain"
            source={{ uri: photoFile }}
            style={{ width, height: imageHeight }}
          />
        )}
      </Main>
      <Categories>
        {categories?.map((category) => (
          <Category
            key={category.id}
            text={`#${category.name}`}
            bold={600}
          ></Category>
        ))}
      </Categories>
      {lat && long && <Info>{`${lat} / ${long}`}</Info>}
    </Container>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  categoties: PropTypes.arrayOf(PropTypes.string),
  lat: PropTypes.string,
  long: PropTypes.string,
};
