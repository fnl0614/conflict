import { useAuth } from "../../authentication/context/AuthContext";

const usePostHeader = (ownerId: string, groupId?: string, groupName?: string) => {
  const { userData } = useAuth();

  return ({
    isOwner: userData?.id === ownerId,
    isInGroup: groupId && groupName
  });
}

export default usePostHeader;
