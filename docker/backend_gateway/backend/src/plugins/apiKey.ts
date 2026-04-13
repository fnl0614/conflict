import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.decorate(
    "checkApiKey",
    async (request: any, reply: any) => {
      const apiKey = request.headers["x-api-key"];

      if (!apiKey || apiKey !== process.env.API_KEY) {
        return reply.code(403).send({ message: "Invalid API key" });
      }
    }
  );
});

