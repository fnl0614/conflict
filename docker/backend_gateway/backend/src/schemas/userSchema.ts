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

const userSchema = {
    bodySchemaForRegistration,
    bodySchemaForLogin
}

  export default userSchema;