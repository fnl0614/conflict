const listWithPagination = {
    type: "object",
    properties: {
        page: { type: 'number' },
        count: { type: 'number' },
    }
}

const userId = {
    type: "object",
    properties: {
        userId: { type: 'string' }
    },
    required: ["userId"]
}

const validatorSchema = {
    listWithPagination,
    userId
}

  export default validatorSchema;