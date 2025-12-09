# TimeFlow - Master Your Day

A beautiful, modern time tracking application that helps you log daily activities, visualize how you spend your time, and gain insights to optimize your productivity and well-being.

## 🚀 Live Demo

[View Live Demo](https://tabishachouhan.github.io/AI-Usage-Skills-Evaluation/)

## 📺 Video Walkthrough

[Watch Demo Video ](https://drive.google.com/file/d/1jiAN2wrCaWl1aqPLviUywBgAphwZDPl6/view?usp=sharing)

## ✨ Features

### 🔐 Authentication
- Secure Google OAuth login via Mocha Users Service
- Persistent sessions with HTTP-only cookies
- Seamless authentication flow with automatic redirects

### 📝 Activity Management
- **Add Activities**: Log activities with name, category, and duration
- **Edit Activities**: Modify existing activities with real-time validation
- **Delete Activities**: Remove activities with confirmation
- **Smart Validation**: Ensures total daily activities never exceed 24 hours (1440 minutes)
- **Real-time Tracking**: Shows remaining minutes available for the day

### 📊 Analytics Dashboard
- **Summary Cards**: Quick overview of total time, activity count, and categories
- **Interactive Pie Chart**: Visualize time distribution across categories
- **Bar Chart**: Compare individual activity durations
- **Category Breakdown Table**: Detailed view with percentages and visual indicators
- **Beautiful Visualizations**: Powered by Recharts with custom styling

### 🗓 Date Management
- **Date Picker**: Navigate between days with intuitive controls
- **Previous/Next Day**: Quick navigation buttons
- **Custom Date Selection**: Jump to any date using the date input

### 🎨 User Experience
- **World-class UI**: Modern, gradient-rich design with smooth animations
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Empty States**: Helpful prompts when no data is available
- **Loading States**: Clear feedback during data fetching
- **Error Handling**: User-friendly error messages

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive data visualizations
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation

### Backend
- **Hono** - Fast, lightweight API framework
- **Cloudflare Workers** - Serverless compute
- **Cloudflare D1** - SQLite-based database
- **Mocha Users Service** - Authentication provider
- **Zod** - Runtime type validation

### Development
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality
- **TypeScript** - Static type checking

## 📂 Project Structure

```
src/
├── react-app/
│   ├── components/
│   │   ├── ActivityForm.tsx         # Modal form for creating/editing activities
│   │   ├── ActivityList.tsx         # List view of activities with actions
│   │   ├── AnalyticsButton.tsx      # Action button with validation status
│   │   ├── AnalyticsDashboard.tsx   # Charts and analytics visualizations
│   │   ├── DatePicker.tsx           # Date navigation component
│   │   ├── Header.tsx               # App header with user menu
│   │   └── NoDataScreen.tsx         # Empty state with CTA
│   ├── hooks/
│   │   └── useActivities.ts         # Custom hook for activity CRUD operations
│   ├── pages/
│   │   ├── Landing.tsx              # Landing page for non-authenticated users
│   │   ├── AuthCallback.tsx         # OAuth callback handler
│   │   └── Dashboard.tsx            # Main dashboard for authenticated users
│   ├── App.tsx                      # Root component with routing
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Global styles
├── shared/
│   └── types.ts                     # Shared types and Zod schemas
└── worker/
    └── index.ts                     # Hono API routes
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timeflow
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment secrets (automatically configured in Mocha):
- `MOCHA_USERS_SERVICE_API_KEY` - Authentication service API key
- `MOCHA_USERS_SERVICE_API_URL` - Authentication service URL

### Development

Run the development server:
```bash
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`

### Database Migrations

Migrations are automatically applied during development. The database schema includes:
- `activities` table with user_id, date, name, category, and minutes columns
- Indexes for efficient querying by user and date

### Building for Production

```bash
npm run build
# or
bun run build
```

## 🎨 Design Philosophy

TimeFlow follows modern design principles:

- **Gradient-rich**: Beautiful gradient backgrounds and buttons
- **Card-based layouts**: Clean, organized content sections
- **Smooth animations**: Subtle transitions for better UX
- **Responsive design**: Mobile-first approach
- **Color theory**: Carefully selected color palette (indigo, purple, pink)
- **Typography**: Clear hierarchy with Inter font family
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🤖 AI-Assisted Development

This project was built with AI assistance in the following areas:

1. **Architecture Design**: AI helped structure the component hierarchy and data flow patterns
2. **UI Components**: Generated reusable React components following best practices
3. **Color Palette**: Suggested harmonious gradient combinations (indigo/purple/pink theme)
4. **Database Schema**: Designed efficient SQLite schema with proper indexing
5. **Type Safety**: Created comprehensive Zod schemas for runtime validation
6. **Error Handling**: Implemented user-friendly error messages and loading states
7. **Code Organization**: Structured files following clean architecture principles
8. **Documentation**: Generated comprehensive inline comments and this README

The AI focused on creating a production-ready application with:
- Clean, maintainable code
- Proper separation of concerns
- Reusable component patterns
- Type safety throughout
- Beautiful, modern UI/UX

## 📸 Screenshots

*Screenshots will be added after deployment*

## 🔮 Future Improvements

- [ ] **Weekly/Monthly Views**: Aggregate analytics across time periods
- [ ] **Goal Setting**: Set daily time targets for categories
- [ ] **Export Data**: Download activity data as CSV/PDF
- [ ] **Activity Templates**: Quick-add frequently logged activities
- [ ] **Notifications**: Reminders to log activities
- [ ] **Dark Mode**: Theme toggle for better nighttime viewing
- [ ] **Activity Notes**: Add descriptions to activities
- [ ] **Search & Filter**: Find activities by name or category
- [ ] **Multi-day Analytics**: Compare activity patterns across dates
- [ ] **Social Features**: Share insights with friends (optional)

## 📄 License

Built with [Mocha](https://getmocha.com) - A platform for building and deploying full-stack web applications.

## 🙏 Acknowledgments

- Mocha for the development platform
- Cloudflare for infrastructure (Workers, D1)
- Recharts for beautiful charts
- Lucide for icon library
- The open-source community

---

**Note**: This application uses Mocha's authentication system instead of Firebase to leverage the Cloudflare ecosystem and ensure optimal performance and security in the serverless environment.
