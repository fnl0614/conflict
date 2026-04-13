import { useUtils } from "../../../shared/hooks/useUtils";

const useNavigateToGroupId = (id: string) => {
	const { navigate } = useUtils();
	navigate(`/groups/${id}`);
}


export { useNavigateToGroupId }