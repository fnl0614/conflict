const bodySchemaForRegistration = {
    type: "object",
    properties: {
        lastName: {type: "string"},
        firstName: {type: "string"},
        email: {
            type: "string",
            format: "email"
        },
        password: {
            type: "string",
            minLength: 8
        }
    },
    required: ["email", "password"]
}

const bodySchemaForLogin = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email"
        },
        password: { 
            type: "string",
            minLength: 8
        }
    },
    required: ["email", "password"]
}

const idSchema = {
    type: "object",
    properties: {
        idUser: { type: "string" }
    },
    required: ["idUser"]
}

const listUserSchema = {
    type: "object",
    // name: "userIds",
    properties: {
        userIds : {
            type: "array",
            items: {
                type: "string"
            }
        }
    }
}

const userSchema = {
    bodySchemaForRegistration,
    bodySchemaForLogin,
    idSchema,
    listUserSchema
}

  export default userSchema;