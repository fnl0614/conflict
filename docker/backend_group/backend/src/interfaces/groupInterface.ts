export interface IgroupData{
    id : string | null,
    name : string,
    description : string,
    urlProfil : string | null,
    urlCover : string | null
}

export interface IjoinRequest{
    receiverId : string,
    groupId : string
}

export interface IUserIdAndGroupId{
    userId : string,
    groupId : string
}