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

const userSchema = {
    bodySchemaForRegistration,
    bodySchemaForLogin,
    idSchema
}

  export default userSchema;