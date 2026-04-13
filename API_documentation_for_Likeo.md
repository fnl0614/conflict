# <span style="color:#8e94f2">API Endpoints Summary</span>

This document summarizes all API endpoints in the platform, organized by service with names and ports.

## <span style="color:#8e94f2">Table of Contents</span>
- [Gateway Service (Port 3000)](#gateway-service-port-3000)
  - [Auth Endpoints](#auth-endpoints)
  - [User Auth Endpoints](#user-auth-endpoints-handled-by-gateway)
- [User Service (Port 3001)](#user-service-port-3001-proxied-via-apiv1user)
  - [Friends Endpoints](#friends-endpoints)
  - [Friend Requests Endpoints](#friend-requests-endpoints)
- [Post Service (Port 3002)](#post-service-port-3002-proxied-via-apiv1post)
- [Chat Service (Port 3003)](#chat-service-port-3003-proxied-via-apiv1chat)
- [Upload File Service (Port 3004)](#upload-file-service-port-3004-proxied-via-apiv1file)
- [Common Information](#common-information)
- [Notes](#notes)

## <span style="color:#8e94f2">Gateway Service (Port 3000)</span>

The gateway handles authentication and proxies requests to other services. It acts as the entry point for all API calls.

### <span style="color:#8e94f2">Auth Endpoints</span>
- <span style="color:#dab6fc">**GET** `/api/v1/auth/refreshToken`</span>  
  This endpoint refreshes the authentication token. It requires a valid refresh token in the request. The response includes a new access token for continued authentication.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid refresh token (cookie or header)

### <span style="color:#8e94f2">User Auth Endpoints (handled by gateway)</span>
- <span style="color:#dab6fc">**POST** `/api/v1/user/login`</span>  
  This endpoint allows users to log in by providing credentials. It validates the username and password. Upon success, it returns an access token and sets cookies.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 📋 Body: { email: string, password: string }
- <span style="color:#dab6fc">**GET** `/api/v1/user/logout`</span>  
  This endpoint logs out the current user. It invalidates the session and clears authentication cookies. The user must re-authenticate to access protected resources.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token

## <span style="color:#8e94f2">User Service (Port 3001, Proxied via `/api/v1/user/`)</span>

The user service manages user profiles, friends, and friend requests. It handles user registration, updates, and social interactions.

- <span style="color:#dab6fc">**GET** `/api/v1/user/`</span>  
  This is a health check endpoint for the user service. It confirms the service is running. No authentication is required for this basic check.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - ✅ None
- <span style="color:#dab6fc">**GET** `/api/v1/user/myProfile`</span>  
  This endpoint retrieves the current user's profile information. It requires authentication. The response includes user details like username and profile data.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token
- <span style="color:#dab6fc">**GET** `/api/v1/user/profile/:id`</span>  
  This endpoint fetches a specific user's profile by ID. Authentication is needed. It returns public profile information for the specified user.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (user ID)
- <span style="color:#dab6fc">**DELETE** `/api/v1/user/removeUser/:username`</span>  
  This endpoint removes a user account by username. It requires admin privileges. The action permanently deletes the user and associated data.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: username
- <span style="color:#dab6fc">**GET** `/api/v1/user/logout`</span>  
  This endpoint logs out the user from the user service. It clears user-specific sessions. Authentication is required before logout.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token
- <span style="color:#dab6fc">**GET** `/api/v1/user/listUsers`</span>  
  This endpoint lists all users in the system. It supports pagination. Authentication is required to access user lists.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token
- <span style="color:#dab6fc">**GET** `/api/v1/user/findUser/:UserInfo`</span>  
  This endpoint searches for users based on provided info. It matches usernames or emails. Results are paginated and require authentication.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: UserInfo (search string)
- <span style="color:#dab6fc">**POST** `/api/v1/user/register`</span>  
  This endpoint registers a new user account. It validates input data. Upon success, it creates the user and returns confirmation.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 📋 Body: { lastName: string, firstName: string, email: string, password: string } (email and password required)
- <span style="color:#dab6fc">**PUT** `/api/v1/user/update`</span>  
  This endpoint updates the current user's information. It requires authentication. Changes are applied to the user's profile.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 📋 Body: fields to update (e.g., lastName, firstName, etc.)
- <span style="color:#dab6fc">**PUT** `/api/v1/user/updatePassword`</span>  
  This endpoint changes the user's password. It requires current password verification. The new password must meet security criteria.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 📋 Body: { currentPassword: string, newPassword: string, newPasswordConfirm: string }

### <span style="color:#8e94f2">Friends Endpoints</span>
- <span style="color:#dab6fc">**DELETE** `/api/v1/user/friends/delete`</span>  
  This endpoint removes a friend relationship. It uses a query parameter for the friend ID. Authentication is required to manage friendships.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - ❓ Query: { idFriend: string }
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/list/myFriends`</span>  
  This endpoint lists the current user's friends. It supports pagination via query parameters. Authentication is needed to view personal friends.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - ❓ Query: { page?: number, count?: number }
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/list/friends/:idUser`</span>  
  This endpoint lists friends of a specific user by ID. It includes pagination. Authentication is required to access others' friend lists.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: idUser  
  - ❓ Query: { page?: number, count?: number }
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/list/notFriends`</span>  
  This endpoint lists users who are not friends. It uses pagination. Authentication helps find potential new connections.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - ❓ Query: { page?: number, count?: number }
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/count/:idUser`</span>  
  This endpoint counts the friends of a user by ID. It returns a numerical count. Authentication is required for friend statistics.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: idUser
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/relation/:idUser`</span>  
  This endpoint checks the friendship relation with a user. It indicates if they are friends. Authentication is needed for relation checks.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: idUser

### <span style="color:#8e94f2">Friend Requests Endpoints</span>
- <span style="color:#dab6fc">**POST** `/api/v1/user/friends/requests/send`</span>  
  This endpoint sends a friend request to another user. It requires the recipient's details. Authentication is mandatory for sending requests.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 📋 Body: { receiverId: string }
- <span style="color:#dab6fc">**PUT** `/api/v1/user/friends/requests/accept/:id`</span>  
  This endpoint accepts a friend request by ID. It establishes the friendship. Authentication ensures only the recipient can accept.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (request ID)
- <span style="color:#dab6fc">**PUT** `/api/v1/user/friends/requests/deny/:id`</span>  
  This endpoint denies a friend request by ID. It rejects the connection. Authentication is required for denial actions.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (request ID)
- <span style="color:#dab6fc">**DELETE** `/api/v1/user/friends/requests/cancel/:id`</span>  
  This endpoint cancels a sent friend request by ID. It withdraws the request. Authentication prevents unauthorized cancellations.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (request ID)
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/requests/list/received`</span>  
  This endpoint lists received friend requests. It supports pagination. Authentication is needed to view incoming requests.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - ❓ Query: { page?: number, count?: number }
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/requests/list/sent`</span>  
  This endpoint lists sent friend requests. It includes pagination options. Authentication ensures privacy of sent requests.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - ❓ Query: { page?: number, count?: number }
- <span style="color:#dab6fc">**GET** `/api/v1/user/friends/requests/received/count/:idUser`</span>  
  This endpoint counts received friend requests for a user. It returns a number. Authentication is required for request counts.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: idUser

## <span style="color:#8e94f2">Post Service (Port 3002, Proxied via `/api/v1/post/`)</span>

The post service manages social media posts, including creation, retrieval, and interactions. It handles content sharing and engagement features.

- <span style="color:#dab6fc">**GET** `/api/v1/post/post`</span>  
  This is a health check for the post service. It verifies service availability. No special authentication is needed for this check.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - ✅ None
- <span style="color:#dab6fc">**GET** `/api/v1/post/getPost/:id`</span>  
  This endpoint retrieves a specific post by ID. It includes post details. Authentication is required to access posts.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (post ID)
- <span style="color:#dab6fc">**GET** `/api/v1/post/getAllFriendsPosts`</span>  
  This endpoint fetches posts from all friends. It aggregates social feed. Authentication ensures personalized content.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token
- <span style="color:#dab6fc">**GET** `/api/v1/post/getUserPosts/:target_id`</span>  
  This endpoint gets posts by a specific user ID. It shows user activity. Authentication is needed for user post access.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: target_id (user ID)
- <span style="color:#dab6fc">**GET** `/api/v1/post/getAllUserPosts`</span>  
  This endpoint retrieves all posts by the current user. It lists personal content. Authentication protects user posts.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token
- <span style="color:#dab6fc">**GET** `/api/v1/post/getAllGroupPosts/:GroupId`</span>  
  This endpoint fetches posts for a specific group. It orders by date descending. Authentication is required for group content.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: GroupId
- <span style="color:#dab6fc">**POST** `/api/v1/post/createPost`</span>  
  This endpoint creates a new post. It accepts post data. Authentication is mandatory for content creation.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 📁 Multipart form: { desc: string (required), group_id?: string, file?: file }
- <span style="color:#dab6fc">**DELETE** `/api/v1/post/deletePost/:id`</span>  
  This endpoint deletes a post by ID. It removes content permanently. Authentication ensures ownership verification.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (post ID)
- <span style="color:#dab6fc">**PUT** `/api/v1/post/updatePost/:id`</span>  
  This endpoint updates an existing post. It modifies post content. Authentication is required for edits.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (post ID)  
  - 📋 Body: update data (similar to create)
- <span style="color:#dab6fc">**PUT** `/api/v1/post/likePost/:id`</span>  
  This endpoint likes a post by ID. It increases engagement. Authentication is needed for interactions.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: id (post ID)

## <span style="color:#8e94f2">Chat Service (Port 3003, Proxied via `/api/v1/chat/`)</span>

The chat service handles real-time messaging and chat functionalities. It supports WebSocket connections for live communication.

- <span style="color:#dab6fc">**GET** `/api/v1/chat/api/v1/chat`</span>  
  This endpoint checks the chat service status. It confirms operational health. Authentication may be required for service access.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token

## <span style="color:#8e94f2">Upload File Service (Port 3004, Proxied via `/api/v1/file/`)</span>

The upload file service manages file uploads and deletions. It supports various file types for profiles, posts, and documents.

- <span style="color:#dab6fc">**GET** `/api/v1/file/`</span>  
  This is a health check for the upload service. It indicates service readiness. Basic access is allowed for status checks.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - ✅ None
- <span style="color:#dab6fc">**POST** `/api/v1/file/upload/:type`</span>  
  This endpoint uploads a file of specified type. Types include pdp, pdc, post. Authentication is required for file operations.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: type (e.g., pdp, pdc, post)  
  - 📁 Multipart form: { file: file }
- <span style="color:#dab6fc">**DELETE** `/api/v1/file/delete/:type`</span>  
  This endpoint deletes a file by type. It removes stored files. Authentication ensures secure file management.  
  <span style="color:#dab6fc">**Requirements:**</span>  
  - 🔐 Valid authentication token  
  - 🔗 URL param: type  
  - ❓ Query or body: file identifier (e.g., filename or ID)

## <span style="color:#8e94f2">Common Information</span>

### Authentication
Most endpoints require a valid JWT token in the Authorization header or as a cookie. Tokens are obtained via the login endpoint.

### Response Formats
All responses are in JSON format. Successful responses include a `message` field, while errors include an error description.

### Error Codes
- 200: Success
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

### Pagination
Endpoints supporting pagination use `page` and `count` query parameters. Default page is 1, count is 10.

## Notes
- All endpoints are served through the API Gateway on port 3000.
- Authentication is required for most endpoints (preHandler: auth).
- Some endpoints have query parameters or request bodies as specified.
- WebSocket support is enabled for proxied services.