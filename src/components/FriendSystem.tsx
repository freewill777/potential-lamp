import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import {
  handleSendRequest,
  handleAcceptRequest,
  handleRejectRequest,
  handleCancelRequest,
  handleUnfriend,
  handleFriendshipStatus,
} from "../lib/api";

const FriendSystem = ({ userId }: { userId: string }) => {
  const [friendshipStatus, setFriendshipStatus] = useState("");

  useEffect(() => {
    const fetchFriendshipStatus = async () => {
      const status = handleFriendshipStatus(userId);
      setFriendshipStatus(status);
    };

    fetchFriendshipStatus();
  }, [userId]);

  return (
    <View>
      {friendshipStatus === "friends" && (
        <Button title="Unfriend" onPress={() => handleUnfriend(userId)} />
      )}
      {friendshipStatus === "pending" && (
        <Button
          title="Cancel Request"
          onPress={() => handleCancelRequest(userId)}
        />
      )}
      {friendshipStatus === "requested" && (
        <View>
          <Button
            title="Accept Request"
            onPress={() => handleAcceptRequest(userId)}
          />
          <Button
            title="Reject Request"
            onPress={() => handleRejectRequest(userId)}
          />
        </View>
      )}
      {friendshipStatus === "none" && (
        <Button
          title="Send Request"
          onPress={() => handleSendRequest(userId)}
        />
      )}
    </View>
  );
};

export { FriendSystem };
