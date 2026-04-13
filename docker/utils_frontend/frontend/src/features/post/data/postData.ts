export type PostAuthorData = {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
}

export type PostGroupData = {
    id: string;
    name: string;
}

export type PostContentData = {
    id: string;
    description: string;
    url_image?: string;
    likeCount: number;
    author: PostAuthorData;
    group?: PostGroupData;
}

export type PostData = {
    id: string;
    description: string;
    url_image?: string;
    group_id?: string;
    group_name?: string;
    likeCount: number;
    isLiked: boolean;
    author: PostAuthorData;
}

export type PostItemProps = {
    postId: string;
    author: {
        ownerId: string;
        ownerFirstName: string;
        ownerLastName: string;
        ownerImageUrl?: string;
    }
    groupId?: string;
    groupName?: string;
    textContent: string;
    imageUrl?: string;
    isLiked: boolean;
    likes: number;
    created_at: Date;
}

export type PostDataResponse = {
    author: {
        id: string;
        firstName: string;
        lastName: string;
        urlProfil?: string;
    }
    id: string;
    group_id?: string;
    description: string;
    url_image?: string;
    isLiked: boolean;
    likeCount: number;
    created_at: Date;
}

