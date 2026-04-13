import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { acceptGroupInvitation, declineGroupInvitation, quitGroup, removeMemberFromGroup, sendGroupInvitation } from "../services/groupInteraction";
import { useLocation } from "react-router";
import { useUtils } from "../../../shared/hooks/useUtils";
import { notify } from "../../../shared/utils/notify";

const useInviteToGroup = (groupId: string, userId: string) => {
    const {
        mutate: sendAGroupInvitation,
        error: sendGroupInvitationError,
        isPending: isSendingGroupInvitation,
        isSuccess: isSendingGroupInvitationSuccess,
    } = useMutation({
        mutationFn: () => sendGroupInvitation({groupId, userId}),
        onSuccess: () => {
            notify("Friend request sent successfully", "success");
		},
		onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            notify("Failed to send friend request: " + errorMessage, "error");
		}
    });

    const handleSendingInvitation = () => {
        sendAGroupInvitation();
    }
    return {
        handleSendingInvitation,
        sendGroupInvitationError,
        isSendingGroupInvitation,
        isSendingGroupInvitationSuccess
    }
}

const useQuitGroup = (groupId: string) => {
    const { pathname } = useLocation();
    const { navigate } = useUtils();

    const {
        mutate: quitTheGroup,
        error: quitError,
        isPending: isQuitting,
        isSuccess: isQuitSuccess,
    } = useMutation({
        mutationFn: () => quitGroup(groupId),
        onSuccess: () => {
            notify("You have successfully quit the group", "success");
            if (pathname.includes("/profile")) {
                navigate("/home");
            }
        },
        onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            notify("Failed to quit the group: " + errorMessage, "error");
        }
    });
    
    const handleQuitGroup = () => {
        /* TODO : Confirmation here */
        quitTheGroup();
    }

    return {
        handleQuitGroup,
        quitError,
        isQuitting,
        isQuitSuccess
    }
}

const useGroupRequestInteraction = (requestId : string) => {
	const [ openDescription, setOpenDescription ] = useState(false);

	const showGroupDescription = () => {
        setOpenDescription(true);
	}

    const {
        mutate: acceptInvitation,
        error: acceptError,
        isPending: isAccepting,
        isSuccess: isAcceptSuccess,
    } = useMutation({
        mutationFn: () => acceptGroupInvitation(requestId),
        onSuccess: () => {
            notify("You have successfully accepted the group invitation", "success");
		},
		onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            notify("Failed to accept the group invitation: " + errorMessage, "error");
		}
    });
    
    const handleAcceptInvitation = () => {
        acceptInvitation();
    }

    const {
        mutate: declineInvitation,
        error: declineError,
        isPending: isDeclining,
        isSuccess: isDeclineSuccess,
    } = useMutation({
        mutationFn: () => declineGroupInvitation(requestId),
        onSuccess: () => {
            notify("You have successfully declined the group invitation", "success");
		},
		onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            notify("Failed to decline the group invitation: " + errorMessage, "error");
		}
    });
    
    const handleDeclineInvitation = () => {
        declineInvitation();
    }

    return {
        openDescription,
        setOpenDescription,
        showGroupDescription,
        handleAcceptInvitation,
        handleDeclineInvitation,
        acceptError,
        isAccepting,
        isAcceptSuccess,
        declineError,
        isDeclining,
        isDeclineSuccess,
    }
}

const useRemoveGroupMember = (groupId: string, userId: string) => {
    const {
        mutate: removeMember,
        error,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: () => removeMemberFromGroup({groupId, userId}),
        onSuccess: () => {
			notify("The member has been successfully removed from the group", "success");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
            notify("Failed to remove the member from the group: " + errorMessage, "error");
		}
    });
    
    const handleRemovingMember = () => {
        /* TODO : Confirmation here */
        removeMember();
    }

    return {
        handleRemovingMember,
        error,
        isPending,
        isSuccess
    }
}

export { 
    useGroupRequestInteraction,
    useInviteToGroup,
    useQuitGroup,
    useRemoveGroupMember
};