import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Contact, Contacts, fetchContacts } from "../../src/lib/api";
import { useUserInfo } from "../../src/lib/userContext";
import ContactItem from "../../src/components/ContactItem";
import { useNavigation } from "expo-router";
import { SCREENS } from "../../src/constants/Screens";
// import ContactItem from "../components/ContactItem";
// import { Contact, Contacts, fetchContacts } from "../lib/api";
// import { useUserInfo } from "../lib/userContext";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contacts>([]);
  const { profile } = useUserInfo();
  const navigation = useNavigation();

  useEffect(() => {
    if (profile) fetchContacts(profile.id).then(setContacts);
  }, [profile]);

  const handleContactPress = (contact: Contact) => {
    // @ts-ignore
    navigation.navigate(SCREENS.CHAT, {
      contactId: contact.id,
      username: contact.username || "",
    });
  };

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          onPressItem={() => handleContactPress(item)}
        />
      )}
    />
  );
}
const styles = StyleSheet.create({});
