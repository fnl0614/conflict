import LoadingCircular from "../../../shared/components/LoadingCircular";
import type { GroupType } from "../data/groupType";
import { Navigate } from "react-router";

interface RenderGroupStateProps {
	status: string,
	groupData: GroupType | null | undefined,
	error: unknown
}

export const RenderGroupState = ({ status, groupData, error }: RenderGroupStateProps) => {
	if (status === 'pending' || groupData === undefined) {
		return <LoadingCircular />;
	}
	if (status === 'error' || groupData === null) {
		console.log("Error loading group data:", error);
		return <Navigate to="/notFound" replace />;
	}
	return null;
};
