import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SimpleButton, Text, TextInput } from "../../src/components";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { handleSubmitEvent } from "../handles";
import { useNavigation } from "expo-router";
import { SCREENS } from "../../src/constants/Screens";

const NewEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventMediaUrl, setEventMediaUrl] = useState("");
  const navigation = useNavigation();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setEventMediaUrl(result.assets[0].uri);
    }
  };

  const onPressSubmitEvent = async () => {
    await handleSubmitEvent(
      eventName,
      eventMediaUrl,
      eventDescription,
      eventLocation,
      eventDate
    );
    //@ts-ignore
    navigation.navigate(SCREENS.EVENTS);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={{
            uri: eventMediaUrl
              ? eventMediaUrl
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAMFBMVEXp6enAwMDU1NS9vb3s7Ozf39/Pz8/o6OjBwcHGxsbi4uLl5eXMzMzJycnR0dHb29sPVfl3AAAC9UlEQVR4nO3d23abMBRFUUBgA+by/3/b4AvZqQ60ai1AeM23oiGNaCWpMcZOlgEAAAAAAAAAAADAkVTFyy1gVjvPaqN9ZTuohueuhqAY86wq2le2g/knIyxGQYwZMQQxBDEEMQQxBDEEMQQxBDEEMYTEKKN9aTGV2dXwHaO1hhdIDGs4O3qhsmjy2pN3r22Zwwvyfp7VW7Oa8eA1epdbNMbfaySGxXV7b3dNOdgtIsXIXXHgn41bvbCtSDHyZu8dr2iXthUrRh7y4LQxYghiCGIIYghiiMUY0RCDGOnFWDgbj8YdOUaztQPHyMqt7b1hIBy/Jt+u1daue295Weu2duBHE066BDEEMQQxBDEEMQQxhMRwz2fzryf1Lv9x4LfR3Pznz5XMOUnEqC++++XP3j/e3Sd0/sD9ymdjrFSnFaMznkdcvr6nrjWeX0x7a4wJ1TRhMAb61GJ4g48Yxj0413sM41nG+Ijhr0QMWYkYshIxZCViyErEkJWIISsRQ1YihqxEDFmJGLISMWQlYshKxJCViCErEUNWIoaslFyM0Ctdxiv440mudDWDd+FyuF8DNS51Xqbj1kXTfmGl1K6B5sYr5qvH/2EgnRgbIUZyMQJ+TcIHEovRG7ccTf8fusI/Pk4T6tEfKKZdd8ZKTVoxFs8zWm9gfmj1Bs5znuENfvJJlzdIDEEMQQxBDEEMQQxBDEEMQQxBDEEMQQxBDEEMQQzxjOEPfECMN7yIdJbbpbdCDGIQ4yQxzI9xXDkePiGdGF3pf3zn9I6jr/MMb+D2eGj1JzweWv0JWWKPJuHnGcZy5znP8AY5AxXEEMQQxBDEEMQQxBDEEMQQxBDEEMQQxBDEEMQQHx3j/183Ocubb/rWu+G7Xbp3vJom1Mbx6d5x1xkrJXbvOO8q4KUCRQxBDEEMQQxxDfnrJe/Q773jNaP78wbe6dB/oLIczfOFSPKD/73B8lYY7+OOo7gdu0W26Sf0771VAAAAAAAAAAAAAAAAAEA8vwB4dmosKAxrDwAAAABJRU5ErkJggg==",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.input}>
        <TextInput
          placeholder="Event Name"
          value={eventName}
          onChangeText={setEventName}
          autoCapitalize="none"
          placeholderTextColor={"#380a2a"}
          style={[styles.input, styles.borders, styles.spacings]}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Event Description"
          value={eventDescription}
          onChangeText={setEventDescription}
          autoCapitalize="none"
          placeholderTextColor={"#380a2a"}
          style={[styles.input, styles.borders, styles.spacings]}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Event Location"
          value={eventLocation}
          onChangeText={setEventLocation}
          autoCapitalize="none"
          placeholderTextColor={"#380a2a"}
          style={[styles.input, styles.borders, styles.spacings]}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Event Date"
          value={eventDate}
          onChangeText={setEventDate}
          autoCapitalize="none"
          placeholderTextColor={"#380a2a"}
          style={[styles.input, styles.borders, styles.spacings]}
        />
      </View>
      <View style={[styles.input, { paddingHorizontal: 10 }]}>
        <SimpleButton title={"Submit event"} onPress={onPressSubmitEvent} />
      </View>
    </View>
  );
};

export default NewEventScreen;

const styles = StyleSheet.create({
  borders: { borderColor: "#380a2a", borderWidth: 1, borderRadius: 5 },
  spacings: { paddingHorizontal: 10, marginHorizontal: 10 },
  input: {
    paddingVertical: 8,
    color: "#380a2a",
  },
  image: {
    height: 250,
  },
});
