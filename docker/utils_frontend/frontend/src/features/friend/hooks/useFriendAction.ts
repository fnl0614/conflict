import { useState } from "react";
import { acceptFriendRequest, declineFriendRequest, sendFriendRequest, removeFriend } from "../services/friendAction";
import { notify } from "../../../shared/utils/notify";

const useFriendAction = () => {
    const [loadingAccept, setLoadingAccept] = useState<boolean>(false);
    const [loadingDecline, setLoadingDecline] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const onClickAcceptInvitation = async (id: string) => {
        setLoadingAccept(true);
        const result = await acceptFriendRequest(id);

        setLoadingAccept(false);
        if (!result)
            return ;
        setDisabled(true);
        notify("Friend request accepted", "success");
    };

    const onClickDeclineInvitation = async (id: string) => {
        setLoadingDecline(true);
        const result = await declineFriendRequest(id);

        setLoadingDecline(false);
        if (!result)
            return ;
        setDisabled(true);
        notify("Friend request declined", "success");
    };

    const onClickSendInvitation = async (id: string) => {
        setLoading(true);
        const result = await sendFriendRequest({receiverId: id});

        setLoading(false);
        if (!result)
            return ;
        setDisabled(true);
        notify("Friend request sent", "success");
    };

    const onClickRemoveFriend = async (id: string) => {
        setLoading(true);
        const result = await removeFriend(id);
        setLoading(false);
        if (!result)
            return ;
        setDisabled(true);
        notify("Friend removed", "success");
    };

    return {
        loading,
        loadingAccept,
        loadingDecline,
        disabled,
        onClickAcceptInvitation,
        onClickDeclineInvitation,
        onClickSendInvitation,
        onClickRemoveFriend
    };
};

export default useFriendAction