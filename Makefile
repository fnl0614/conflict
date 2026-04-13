NAME=docker-compose.yml
FRONT_ENV_DIR=docker/utils_frontend/frontend
BACK_GATEWAY_ENV_DIR=docker/backend_gateway/backend
BACK_USER_ENV_DIR=docker/backend_user/backend
BACK_POST_ENV_POST=docker/backend_post/backend
BACK_UPLOAD_FILE_ENV_DIR=docker/backend_upload_file/backend
VOLUME_PATH = ~/goinfre/docker/volumes/ft_transcendence_certAuth

all: 
	@cp $(FRONT_ENV_DIR)/.env.example $(FRONT_ENV_DIR)/.env
	@cp $(BACK_GATEWAY_ENV_DIR)/.env.example $(BACK_GATEWAY_ENV_DIR)/.env
	@cp $(BACK_USER_ENV_DIR)/.env.example $(BACK_USER_ENV_DIR)/.env
	@cp $(BACK_UPLOAD_FILE_ENV_DIR)/.env.example $(BACK_UPLOAD_FILE_ENV_DIR)/.env
	@cp $(BACK_USER_ENV_DIR)/.env.example $(BACK_USER_ENV_DIR)/.env
	@cp $(BACK_POST_ENV_POST)/.env.example $(BACK_POST_ENV_POST)/.env
	@cp .env.example .env
	@docker compose down; docker volume ls -q | grep certAuth | xargs -r docker volume rm
	@rm -rf $(VOLUME_PATH)
	@DOCKER_BUILDKIT=0 docker compose -f $(NAME) up -d --build
	@docker image prune -a -f

up:
	@docker compose up -d

down:
	@docker compose down

clean:
	@docker compose down -v
	@docker volume ls -q | grep certAuth | xargs -r docker volume rm
	@rm -rf $(VOLUME_PATH)

fclean: clean
	@docker container prune
	@docker network prune

rmi:
	@docker rmi $$(docker image ls -q)
	echo "Remove images..."
