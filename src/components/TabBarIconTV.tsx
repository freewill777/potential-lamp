import { Feather } from "@expo/vector-icons";

function TabBarIconTV(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default TabBarIconTV;
