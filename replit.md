# Smart Services Portal

## Overview

The Smart Services Portal is a modern React-based web application designed to provide users with AI assistance, interactive mapping capabilities, and seamless service management. The application features Firebase authentication, a conversational AI chatbot powered by Google's Gemini API, and interactive maps using Leaflet.js.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Routing**: Wouter for client-side routing
- **State Management**: React Context API for authentication and notifications
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage with planned PostgreSQL persistence
- **API Design**: RESTful endpoints under `/api` prefix

## Key Components

### Authentication System
- **Provider**: Firebase Authentication
- **Methods**: Email/password and Google OAuth
- **Implementation**: Custom React context (`AuthContext`) managing user state
- **Security**: Firebase handles all authentication flows and token management

### AI Chatbot Integration
- **API**: Google Gemini 2.0 Flash model
- **Service**: Custom `GeminiApiService` class for conversation management
- **Features**: Chat history persistence, error handling, and response formatting
- **UI**: Dedicated chat interface with message threading

### Interactive Mapping
- **Library**: Leaflet.js with React-Leaflet wrapper
- **Features**: Multiple service location markers, interactive popups, location-based services
- **Data**: Predefined Bangalore locations with service information

### Navigation & Routing
- **Structure**: Multi-page application with distinct routes
- **Pages**: Login, Dashboard, Chatbot, Map, and 404 error handling
- **Navigation**: Responsive navigation bar with mobile hamburger menu

### UI Components
- **Design System**: shadcn/ui components with consistent styling
- **Theme**: Custom color palette with CSS variables for dark/light mode support
- **Responsiveness**: Mobile-first design with Tailwind CSS breakpoints

## Data Flow

1. **Authentication Flow**:
   - User accesses login page
   - Firebase handles authentication (email/password or Google)
   - AuthContext updates global user state
   - User redirected to dashboard upon successful login

2. **Chatbot Flow**:
   - User types message in chat interface
   - Message sent to Gemini API with conversation history
   - Response processed and displayed in chat UI
   - Chat history maintained for context

3. **Map Interaction Flow**:
   - Map component loads with predefined locations
   - Users can interact with markers to view service details
   - Location data includes service types and descriptions

## External Dependencies

### Primary Dependencies
- **Firebase**: User authentication and session management
- **Google Gemini API**: AI chatbot responses (API key: AIzaSyAuL9WsDZ12Og7Ej-18DXfDSBgjMK5fxYU)
- **Leaflet.js**: Interactive mapping functionality
- **Neon Database**: PostgreSQL database hosting

### Development Dependencies
- **Vite**: Build tool and dev server
- **Drizzle Kit**: Database migrations and schema management
- **TypeScript**: Type safety and development experience
- **ESBuild**: Production bundling for server code

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite dev server with hot module replacement
- **Database**: Development database connection via DATABASE_URL environment variable
- **Build Process**: TypeScript compilation with Vite for client, ESBuild for server

### Production Deployment
- **Client Build**: Static files generated to `dist/public`
- **Server Build**: Bundled Express server to `dist/index.js`
- **Database**: PostgreSQL with Drizzle ORM migrations
- **Environment**: Node.js runtime with environment variable configuration

### Configuration Requirements
- `DATABASE_URL`: PostgreSQL connection string
- `VITE_FIREBASE_API_KEY`: Firebase configuration
- `VITE_FIREBASE_PROJECT_ID`: Firebase project identifier
- `VITE_FIREBASE_APP_ID`: Firebase application ID

## Changelog
- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.