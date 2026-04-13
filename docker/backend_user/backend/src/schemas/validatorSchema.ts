const listWithPagination = {
    type: "object",
    properties: {
        page: { type: 'number' },
        count: { type: 'number' },
    }
}

const idOnly = {
    type: "object",
    properties: {
        id: { 
            type: 'string',
            minLength: 1
        }
    },
    required: ["id"]
}

const idFriend = {
    type: "object",
    properties: {
        idFriend: { type: 'string' }
    },
    required: ["idFriend"]
}
 

const sendFriendRequestBody = {
    type: "object",
    properties: {
        receiverId: { type: 'string' }
    },
    required: ["receiverId"]
}

const validatorSchema = {
    listWithPagination,
    idOnly,
    idFriend,
    sendFriendRequestBody
}

  export default validatorSchema;