
const groupCreationSchema = {
    type : "object",
    properties : {
        name : { type: "string" },
        description : { type : "string"},
        urlProfil : { type : "string"},
        urlCover : { type : "string"}
    },
    required : ["name", "description"]
}

const groupUpdateSchema = {
    type : "object",
    properties : {
        name : { type: "string" },
        descritpion : { type : "string"},
        urlProfil : { type : "string"},
        urlCover : { type : "string"}
    },
}

const groupIdSchema = {
    type : "object",
    properties : {
        groupId : { 
            type: "string" ,
            minLength: 26,
            maxLength: 26
        }
    },
    required : ["groupId"]
}

const groupIdAndUserIdSchema = {
    type : "object",
    properties : {
        groupId : { 
            type: "string" ,
            minLength: 26,
            maxLength: 26
         },
        userId : { type: "string" }
    },
    required : ["groupId", "userId"]
}

const groupSchema = {
    groupCreationSchema,
    groupUpdateSchema,
    groupIdSchema,
    groupIdAndUserIdSchema
}

export default groupSchema;