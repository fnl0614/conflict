import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { AuthData } from "../../authentication/data/authType";
import { getUserProfile } from "../../authentication/services/authService";
import { notify } from "../../../shared/utils/notify";
import type { AxiosError } from "axios";
import { useAuth } from "../../authentication/context/AuthContext";
import { getUserRelation } from "../../friend/services/friendAction";

export default function useProfile() {
	const params = useParams();
	const id = params.id ? params.id as string : '';
	const [user, setUser] = useState<AuthData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
    const [relation, setRelation] = useState<string>('');
    const { userData } = useAuth();

	useEffect(() => {
		async function fetchData() {
            if (userData && userData.id === id) {
                setUser(userData);
                setRelation('self');
                setLoading(false);
                return;
            }
			try {
					const result = await getUserProfile(id);
                    const relation_result = await getUserRelation(id);
					if (result) {
						setUser(result.user);
                    }
                    if (relation_result) {
                        const relation = (relation_result as {friend : boolean }).friend;

                        if (relation) {
                            setRelation('friend');
                        } else {
                            setRelation('user');
                        }
                    }
			} catch (error) {
                const axios_error = error as AxiosError;
                if (axios_error.response) {
                    notify((axios_error.response.data as { message: string }).message, "error");
                }
				return null;
			} finally { setLoading(false); }
		}
		fetchData();
	}, [id, userData]);
	return ( { user, loading, relation } )
}
