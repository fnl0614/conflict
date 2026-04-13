import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getFriendListById, getNumberRequest } from "../../friend/services/friendListing";
import { type ArrayData } from "../data/ProfileData";

const usePartialList = (type: "friend" | "group", content: "partial" | "all") => {

	/* Data to fetch from the database 
		Partial list of 3 or 6 (depending on screen) friends/groups max for display
			friend/group : id, url_profil, name
	*/

    const id = useParams().id ?? '';
	const groupArray = [
		{ id: '1', urlProfil: "/images/group1.jpg", firstName: "Group", lastName: "One" },
		{ id: '2', urlProfil: "/images/group2.jpg", firstName: "Group", lastName: "Two" },
		{ id: '3', urlProfil: "/images/group3.jpg", firstName: "Group", lastName: "Three" },
	]
    const screen = useOutletContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [userArray, setUserArray] = useState<ArrayData[]>([]);
    const [nb, setNb] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        async function fetchFriendList() {
            try {
                const result = await getFriendListById(id, screen, content, page);
                const request_nb_result = await getNumberRequest('friend', id);
                
                if (request_nb_result)
                    setNb((request_nb_result as { count : number }).count);
                if (result)
                    setUserArray(result);
            } catch (error) {
                console.error("Failed to fecth: ", error);
                return (null);
            } finally { setLoading(false); }
        }
        fetchFriendList();
    }, [page, screen, id]);

	const items = type === "group" ? groupArray : userArray;

	return ({
		nb,
		items,
		id,
        loading,
        page,
        setPage
	});
}

export default usePartialList;
