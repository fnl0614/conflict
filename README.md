*This project has been created as part of the 42 curriculum by barandri, farakoto, jramihaj, rsafidy-, srazafin*

# Project description  
LIKEO is a social media platform that allows people to connect, communicate and share content online with these key features :
  - User profile : User has a personnal space where he can post contents with images, update his profile information and  how he access the app.
  - Friends and connections : User can send friend requests, accept or decline friends invitation, remove an user from his friends list.
  - News feed : User can see his friends posts, and live a like on them on his feed in the Home section.
  - Chat : User can send message to his friends.
  - Group : User can create a group and delete it, receive a join request from a group, quit the group, post contents and images inside the group space.

# Instruction 
### Software
### Tools (+ version )
### Configuration
### Guide for running the project

# Resources
### Documentations
### Articles
### Tutorials
### Use of AI

## Team 

| Login    | Role | Description |
|----------|------|-------------|
| rsafidy  | Project Owner - Backend developer | <ul><li>Defines the product vision, prioritizes features, and ensures the project meets user needs</li><li>Makes decisions on features and priorities.</li><li>Validates completed work.</li> <li>Write code for assigned features in the frontend.</li><li>Participate in code reviews.</li><li>Test their implementations.</li></ul> |
| jramihaj | Project Manager - Frontend developer | <ul><li>Organizes team meetings and planning sessions.</li><li>Tracks progress and deadlines.</li><li>Ensures team communication.</li><li>Manages risks and blockers.</li><li>Write code for assigned features in the frontend.</li><li>Participate in code reviews.</li><li>Test their implementations.</li></ul> |
| farakoto | Technical Lead - Backend developer | <ul><li>Defines technical architecture.</li><li>Makes technology stack decisions.</li><li>Ensures code quality and best practices.</li><li>Reviews critical code changes.</li><li>Write code for assigned features in the frontend.</li><li>Participate in code reviews.</li><li>Test their implementations.</li></ul>|
| srazafin | Backend developer | <ul><li>Write code for assigned features in the backend.</li><li>Participate in code reviews.</li><li>Test their implementations.</li></ul>|
| barandri | Frontend developer - Web designer | <ul><li>Write code for assigned features in the frontend.</li><li>Participate in code reviews.</li><li>Test their implementations.</li><li>Make the website design on Figma</li></ul> |

# Project Organization

| Area | Details |
|-----|---------|
| **Task Distribution** | Regular coordination between PO, PM, and Tech Lead.<br>PM assigns tasks and manages deadlines. |
| **Meetings** | Daily stand-ups to monitor progress and address issues. |
| **Tools** | GitHub, Figma, Excalidraw, Slack |
 
# Technical stack 

*( + Justifications)*  

|**FRONTEND**|   |
|--------|---|
| Base | React |
| Styling | TailwindCss, Material UI |
| Router | react-router |
| Hook | react-router |
| Query | react-tanstack-query |
| Data fetching | Axios |
| Web socket | socket.io-client |

|**BACKEND**|   |
|--------|---|
| Base | NodeJs |
| Framework | Fastify |
| Database | Postgresql |
| ORM | prisma |
| Web socket | socket.io-server |

# Database schema 
The database schema was build with dbdiagram.io by the Tech
Link [here](https://dbdiagram.io/d/likeo-6943f30ce4bb1dd3a98eedbd  "likeo database")

# Features list

|Feature       |Description                                                                                                                                                       |Frontend         |Backend           |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|------------------|
|Authentication|Handles user login, signup, logout and security (passwords, OAuth).  Ensures only authorized users access accounts.                                               |barandri         |rsafidy-  farakoto|
|Feed          |The main timeline where users see posts from friends, groups                                                                                                      |jramihaj         |rsafidy-          |
|Post          |Allows users to create and share content like text and images                                                                                                     |jramihaj         |rsafidy-          |
|Reaction      |Lets users interact with posts by giving a like                                                                                                                   |jramihaj         |rsafidy-          |
|Chat          |Private real-time conversation between friend users                                                                                                               |barandri         |srazafin          |
|Profile       |A user’s personal page showing their info, posts, friends and group list                                                                                          |jramihaj barandri|rsafidy-  farakoto|
|Search        |Helps users find people quickly with the filter related to name and relationship                                                                                  |barandri         |farakoto          |
|Friend        |Manages connections between users (send/accept/decline requests/ remove from friendlist)                                                                                                   |jramihaj         |farakoto          |
|Group         |Community spaces where multiple users share posts and interact around common interests                                                                            |barandri         |farakoto          |
|Upload        |Handles media uploads images and storage management                                                                                                               |jramihaj         |rsafidy-          |
|Language      |Allows users to switch the app’s interface to different languages for accessibility. : English, French and Spanish                                                |barandri jramihaj|-                 |
|Setting       |Update user profile information and access to the app : user names, cover and profile images, password, email                                                     |jramihaj         |srazafin          |
|Dashboard     |A central overview page where users can quickly see and manage their activity.  It typically includes recent posts, messages, friend requests, and basic analytics|jramihaj         |srazafin          |

# Modules 

|Module topic                                |Module Type|Module Points|Description                                                                                                                                                                                                   |Implementation                                                                                                                                                                                |Frontend           |Backend                    |
|--------------------------------------|------|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|--------------------------|
|Web                                   |Major |2     |Use framework for both frontend and backend                                                                                                                                                              |                                                                                                                                                                                      |barandri jramihaj|farakoto rsafidy- srazafin|
|Web                                   |Major |2     |Implement real-time features using WebSockets or similar technology.                                                                                                                                     |Using socket.io to make a real time chat app                                                                                                                                          |barandri         |srazafin                  |
|Web                                   |Major |2     |Allow users to interact with other users :  A basic chat system (send/receive messages between users). A profile system (view user information). A friends system (add/remove friends, see friends list).|                                                                                                                                                                                      |barandri jramihaj|farakoto rsafidy- srazafin|
|Web                                   |Major |2     |A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints                                                                                |                                                                                                                                                                                      |-                |farakoto rsafidy- srazafin|
|Web                                   |Minor |1     |Use an ORM for the database.                                                                                                                                                                             |                                                                                                                                                                                      |-                |farakoto rsafidy- srazafin|
|Web                                   |Minor |1     |Implement advanced search functionality with filters, sorting, and pagination.                                                                                                                           |Search was implemented for users with the filters name (first name, last name, full name) and user relationship (All, friend) Sorting by alphabetic ascendant or descandant Pagination|barandri         |farakoto                  |
|Web                                   |Minor |1     |File upload and management system.                                                                                                                                                                       |Image upload for profile and cover images                                                                                                                                             |jramihaj         |rsafidy-                  |
|Accessibility and Internationalization|Minor |1     |Support for multiple languages (at least 3 languages).                                                                                                                                                   |Use of i18next to implement three languages : english, french and spanish JSON file to store all the text necessary for the app                                                       |barandri jramihaj|                          |
|User Management                       |Major |2     |Standard user management and authentication.                                                                                                                                                             |                                                                                                                                                                                      |jramihaj         |farakoto rsafidy- srazafin|
|User Management                       |Minor |1     |Implement remote authentication with OAuth 2.0 (Google, GitHub, 42, etc.).                                                                                                                               |                                                                                                                                                                                      |barandri         |rsafidy-                  |
|User Management                       |Major |2     |An organization system                                                                                                                                                                                   |                                                                                                                                                                                      |barandri         |farakoto                  |
|User Management                       |Minor |1     | User activity analytics and insights dashboard.                                                                                                                                                         |                                                                                                                                                                                      |jramihaj         |srazafin                  |
|Devops                                |Major |2     | Backend as microservices.                                                                                                                                                                               |                                                                                                                                                                                      |                 |rsafidy-                  |

# Individual contribution

| |Contribution|Challenges|Solutions|
|----------|------|-------------|---|
| barandri |      |             |   |
| farakoto |      |             |   |
| jramihaj |      |             |   |
| rsafidy  |      |             |   |
| srazafin |      |             |   |