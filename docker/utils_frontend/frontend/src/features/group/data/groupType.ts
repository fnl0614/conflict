type GroupContentType = {
	id: string;
	urlProfil: string;
	urlCover: string;
	name: string;
	description: string;
	creatorId?: string;
	role: 'admin' | 'member' | 'invitation';
}

type GroupType = {
	group: GroupContentType,
	role: string
}

type GroupInvitationType = {
	invitationGroup: {
		requestId : string,
		id: string;
		urlProfil: string;
		urlCover: string;
		name: string;
		description: string;
		creatorId?: string;
		role: 'admin' | 'member' | 'invitation';
	}
}

type GroupCreateType = Pick<GroupContentType, 'name' | 'description'>;

type GroupListType = {
	groupId: string,
	count?: number
	page?: number,
}

type GroupUserListType = {
	userId? : string,
	count?: number,
	page?: number
}

type GroupAndUserType = {
	userId : string,
    groupId : string,
	variant? : 'extended' | 'normal'
}

export type {
	GroupContentType,
	GroupType,
	GroupInvitationType,
	GroupCreateType,
	GroupListType,
	GroupUserListType,
	GroupAndUserType
}