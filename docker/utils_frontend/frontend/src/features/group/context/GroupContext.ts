import { createContext } from "react";
import type { GroupType } from "../data/groupType";

export interface GroupContextType {
    groupData: GroupType | null | undefined;
    error: unknown;
    status: string;
}

export const GroupContext = createContext<GroupContextType | null>(null);
