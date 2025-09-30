# Frontend Assignment

A Next.js application with user management features built using the App Router, Tailwind CSS, and ShadCN UI components.

## Design Reference

📐 **Figma Design**: [View Design in Figma](https://www.figma.com/design/kPmbTQReVK7iVReSVMIyUI/frontend-assignement?node-id=0-1&t=IqP0bt1mttosLPRI-1)

This project is based on the provided Figma design specifications.

## Features

- **User Management**: Complete CRUD operations for users
- **Search & Filter**: Search users by name/role and filter by skills
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Beautiful components using ShadCN UI
- **API Routes**: RESTful API endpoints for user operations
- **In-Memory Storage**: No database required - data stored in memory

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Project Structure

```
frontend-assignment/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.js          # GET, POST /api/users
│   │       └── [id]/
│   │           └── route.js       # PUT, DELETE /api/users/[id]
│   ├── profile/
│   │   └── page.js               # User profiles page
│   ├── layout.js                 # Root layout
│   └── page.js                   # Homepage
├── lib/
│   └── usersData.js              # In-memory user data
├── types/
│   └── index.js                  # User interface definition
├── components/
│   └── ui/                       # ShadCN UI components
└── public/
    └── reference.png             # Placeholder reference image
```

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Homepage

- Welcome message with project overview
- "Go to Profile" button to navigate to user management

### User Profiles Page

- **View Users**: Browse all users in a responsive grid
- **Search**: Search users by name or role
- **Filter**: Filter users by skills
- **Add User**: Click "Add New User" to create a new user
- **Edit User**: Click "Edit" on any user card to modify details
- **Delete User**: Click "Delete" to remove a user

### API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PUT /api/users/[id]` - Update a user
- `DELETE /api/users/[id]` - Delete a user

## User Data Structure

```javascript
{
  id: string,
  name: string,
  role: string,
  avatar: string,
  skills: string[]
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **Heroku**
- **AWS Amplify**

## Assignment Requirements

This boilerplate application includes:

✅ Next.js with App Router  
✅ JavaScript (no TypeScript)  
✅ Tailwind CSS configured  
✅ ShadCN UI components installed  
✅ Basic homepage with navigation  
✅ User management with CRUD operations  
✅ Search and filter functionality  
✅ Responsive design  
✅ API routes for user operations  
✅ In-memory data storage  
✅ README with setup instructions

## Next Steps

This is a boilerplate application ready for assignment completion. Students should:

1. Implement the `/profile` route (already created)
2. Add any additional features as required
3. Customize styling and components
4. Add tests if needed
5. Deploy to a hosting platform

## Contributing

This is an assignment boilerplate. Please follow the assignment guidelines for any modifications.

## License

This project is for educational purposes as part of a frontend assignment.
