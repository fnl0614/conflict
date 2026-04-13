const requestIdSchema = {
    type : "object",
    properties : {
        groupId : { 
            type: "string",
            minLength : 26,
            maxLength : 26
        }
    },
    required : ["requestId"]
}

const joinRequestSchema = {
    type : "object",
    properties : {
        receiverId : { type : "string"},
        groupId : { type : "string"}
    },
    required : ["receiverId", "groupId"]
}

const requestSchema = {
    requestIdSchema,
    joinRequestSchema
}

export default requestSchema;