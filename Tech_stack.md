# <span style="color:#8e94f2">Technical Stack for Likeo Platform</span>

## Technical Stack Overview

**Technical Stack:**
- **Frontend technologies and frameworks used**: ⚛️ React, 🟦 TypeScript, ⚡ Vite, 🎨 Tailwind CSS, 📱 Material UI, 🛣️ React Router, 📝 React Hook Form, 🌐 Axios, 🔌 Socket.IO Client, 🌍 i18next, 🔔 React Toastify
- **Backend technologies and frameworks used**: 🟢 Node.js, 🟦 TypeScript, 🚀 Fastify, 🐘 PostgreSQL, 💎 Prisma ORM, 🔐 JWT, 🔒 bcrypt, 💬 Socket.IO, 🔧 Fastify Plugins
- **Database system and why it was chosen**: 🐘 PostgreSQL was selected for its ACID compliance, advanced features like JSON support and full-text search, excellent concurrency handling, and superior data integrity guarantees compared to other relational databases
- **Any other significant technologies or libraries**: 🐳 Docker & Docker Compose for containerization, 📦 MinIO for S3-compatible object storage, 🔄 Nodemon and ⚡ tsx for development workflow
- **Justification for major technical choices**: The stack prioritizes developer experience (TypeScript), performance (Fastify, Vite), scalability (microservices, PostgreSQL), and maintainability (Prisma, React) while ensuring type safety, real-time capabilities, and modern development practices

## <span style="color:#dab6fc">Frontend Stack</span>

### Core Framework
- **⚛️ React 18.3.1**
  - **Justification**: React is the most popular frontend library with a massive ecosystem, excellent community support, and proven scalability for social media platforms. Its component-based architecture allows for reusable UI components and efficient rendering with the virtual DOM. React 18 provides concurrent features and automatic batching for better performance.

- **🟦 TypeScript 5.x**
  - **Justification**: TypeScript provides static type checking, which catches errors at compile time rather than runtime, leading to more reliable code. It enhances developer experience with better IDE support, autocompletion, and refactoring capabilities. For a complex social media platform, type safety is crucial for maintaining code quality as the codebase grows.

### Build Tools & Development
- **⚡ Vite 5.x**
  - **Justification**: Vite offers lightning-fast development server with instant hot module replacement (HMR). It's significantly faster than traditional bundlers like Webpack, especially for large applications. The native ES modules support and optimized production builds make it ideal for modern React applications.

- **🔍 ESLint**
  - **Justification**: Code linting ensures consistent code style and catches potential bugs early. It enforces best practices and maintains code quality across the team, which is essential for collaborative development.

### Styling & UI
- **🎨 Tailwind CSS 4.x**
  - **Justification**: Tailwind's utility-first approach allows for rapid UI development without writing custom CSS. It provides consistent spacing, colors, and responsive design utilities out of the box. The small bundle size (due to purging unused styles) and excellent responsive design support make it perfect for modern web applications.

- **📱 Material UI (MUI) 7.x**
  - **Justification**: MUI provides a comprehensive set of pre-built, accessible components following Material Design principles. It ensures consistent UI/UX across the platform and significantly speeds up development. The theming system allows for easy customization to match the brand identity.

### Routing & State Management
- **🛣️ React Router 7.x**
  - **Justification**: React Router is the de facto standard for client-side routing in React applications. It provides declarative routing, nested routes, and code splitting capabilities. Version 7 offers improved performance and modern React patterns integration.

- **📝 React Hook Form 7.x**
  - **Justification**: React Hook Form provides performant, flexible forms with easy validation. It minimizes re-renders and offers better user experience compared to controlled components. The small bundle size and TypeScript support make it ideal for form-heavy applications like social media platforms.

### HTTP & Real-time Communication
- **🌐 Axios 1.x**
  - **Justification**: Axios provides a clean, promise-based HTTP client with request/response interceptors, automatic JSON transformation, and error handling. It's more feature-rich than the native fetch API and provides better browser compatibility.

- **🔌 Socket.IO Client 4.x**
  - **Justification**: For real-time features like chat and notifications, Socket.IO provides reliable bidirectional communication with automatic reconnection and fallback mechanisms. It works seamlessly with the backend Socket.IO server.

### Internationalization & Utilities
- **🌍 i18next 25.x**
  - **Justification**: i18next provides comprehensive internationalization support with features like pluralization, interpolation, and lazy loading of translations. As a social media platform, supporting multiple languages is crucial for global reach.

- **🔔 React Toastify**
  - **Justification**: Provides elegant notification system for user feedback (success, error, warning messages). Essential for user experience in interactive applications.

## <span style="color:#dab6fc">Backend Stack</span>

### Runtime & Language
- **🟢 Node.js**
  - **Justification**: Node.js allows using JavaScript/TypeScript on both frontend and backend, enabling code sharing and reducing context switching for developers. Its non-blocking I/O model is perfect for handling multiple concurrent connections in a social media platform.

- **🟦 TypeScript 5.x**
  - **Justification**: Same benefits as frontend - type safety, better developer experience, and maintainability. Critical for large-scale backend applications with complex business logic.

### Web Framework
- **🚀 Fastify 5.x**
  - **Justification**: Fastify is one of the fastest Node.js web frameworks with low overhead and high performance. It provides excellent plugin ecosystem, built-in validation, and serialization. Its speed is crucial for handling high traffic social media APIs, and it's more performant than Express.js for our use case.

### Database & ORM
- **🐘 PostgreSQL**
  - **Justification**: PostgreSQL is a robust, ACID-compliant relational database with advanced features like JSON support, full-text search, and excellent concurrency handling. It's more suitable than MySQL for complex social media data relationships and provides better data integrity guarantees.

- **💎 Prisma 6.x**
  - **Justification**: Prisma provides type-safe database access with auto-generated TypeScript types. It offers excellent developer experience with migrations, schema introspection, and optimized queries. The type safety prevents runtime database errors and improves development speed.

### Authentication & Security
- **🔐 JWT (JSON Web Tokens)**
  - **Justification**: Stateless authentication tokens that don't require server-side storage, making them scalable for microservices architecture. Perfect for API authentication in distributed systems.

- **🔒 bcrypt**
  - **Justification**: Industry-standard password hashing algorithm that's computationally expensive, making brute-force attacks difficult. Essential for user security.

### Real-time Features
- **💬 Socket.IO 4.x**
  - **Justification**: Provides reliable real-time bidirectional communication for chat features. Handles connection drops, reconnections, and scales well with Redis adapter support.

### Additional Libraries
- **🌐 Axios**
  - **Justification**: For internal API calls between microservices, providing consistent HTTP client behavior.

- **🔧 Fastify Plugins** (CORS, Rate Limiting, Cookies, etc.)
  - **Justification**: Official Fastify plugins provide battle-tested implementations of common web server features, ensuring security and performance.

## <span style="color:#dab6fc">Infrastructure & DevOps</span>

### Containerization
- **🐳 Docker & Docker Compose**
  - **Justification**: Docker provides consistent environments across development, staging, and production. Docker Compose simplifies multi-service orchestration, making it easy to run the entire stack locally. Essential for microservices architecture.

### File Storage
- **📦 MinIO**
  - **Justification**: S3-compatible object storage that's self-hosted and cost-effective. Provides scalable file storage for user uploads (images, videos) with features like bucket policies and pre-signed URLs.

### Development Tools
- **🔄 Nodemon**
  - **Justification**: Automatically restarts the server on file changes during development, improving developer productivity.

- **⚡ tsx**
  - **Justification**: Allows running TypeScript files directly without compilation, speeding up development workflow.

## <span style="color:#dab6fc">Architecture Decisions</span>

### Microservices Architecture
- **Justification**: Separating concerns into independent services (user, post, chat, upload, gateway) allows for:
  - Independent scaling of services based on load
  - Technology diversity if needed
  - Easier maintenance and deployment
  - Better fault isolation

### API Gateway Pattern
- **Justification**: Single entry point for all client requests provides:
  - Centralized authentication and authorization
  - Request routing and load balancing
  - Rate limiting and security policies
  - Simplified client-side integration

### Choice of PostgreSQL over MongoDB
- **Justification**: While MongoDB offers flexibility for social media data, PostgreSQL was chosen for:
  - ACID compliance ensuring data consistency
  - Better support for complex relationships
  - Mature tooling and ecosystem
  - SQL expertise availability

### TypeScript over JavaScript
- **Justification**: For a platform of this complexity, TypeScript provides:
  - Compile-time error catching
  - Better IDE support and refactoring
  - Self-documenting code through types
  - Improved maintainability for team collaboration

## Features List

**Features List:**
- **Complete list of implemented features**:
  - 🔐 **Authentication System**: User registration, login, logout, JWT-based authentication
  - 👤 **User Management**: User profiles, friend requests, friend management, user search
  - 📝 **Post Management**: Create, edit, delete posts, like/unlike posts, post comments
  - 💬 **Real-time Chat**: Instant messaging between users, chat rooms
  - 📤 **File Upload**: Image and media file uploads with MinIO storage
  - 📰 **News Feed**: Timeline of posts from friends and followed users
  - 🌍 **Internationalization**: Multi-language support (i18n)
  - 📱 **Responsive Design**: Mobile-friendly interface
  - 🔍 **Search Functionality**: Search users and posts
  - 🔔 **Notifications**: Real-time notifications for interactions
  - ⚙️ **Settings**: User preferences and profile customization

- **Team member assignments** (to be filled by team members):
  - **Authentication System**: [Team member name(s)]
  - **User Management**: [Team member name(s)]
  - **Post Management**: [Team member name(s)]
  - **Real-time Chat**: [Team member name(s)]
  - **File Upload**: [Team member name(s)]
  - **News Feed**: [Team member name(s)]
  - **Internationalization**: [Team member name(s)]
  - **Responsive Design**: [Team member name(s)]
  - **Search Functionality**: [Team member name(s)]
  - **Notifications**: [Team member name(s)]
  - **Settings**: [Team member name(s)]

- **Brief description of each feature's functionality**:
  - **🔐 Authentication System**: Handles user registration with secure password hashing, login with JWT token generation, logout with token invalidation, and protected route access control
  - **👤 User Management**: Allows users to create and customize profiles, send/receive/accept friend requests, manage friend lists, and search for other users
  - **📝 Post Management**: Enables users to create text posts with optional images, edit their own posts, delete posts, like/unlike posts from others, and add comments to posts
  - **💬 Real-time Chat**: Provides instant messaging capabilities with WebSocket connections, supports private chats between friends, and maintains message history
  - **📤 File Upload**: Handles secure file uploads with type validation, stores files in MinIO object storage, generates pre-signed URLs for access, and associates files with posts
  - **📰 News Feed**: Displays a chronological feed of posts from friends and users the account follows, with pagination for performance
  - **🌍 Internationalization**: Supports multiple languages with translation files, automatic language detection, and user language preferences
  - **📱 Responsive Design**: Ensures the application works seamlessly across desktop, tablet, and mobile devices using responsive CSS frameworks
  - **🔍 Search Functionality**: Allows users to search for other users by name/username and search posts by content or hashtags
  - **🔔 Notifications**: Sends real-time notifications for likes, comments, friend requests, and new messages using Socket.IO
  - **⚙️ Settings**: Provides user interface for account settings, profile customization, privacy settings, and notification preferences

This technical stack provides a solid foundation for a scalable, maintainable social media platform with excellent developer experience and performance characteristics.