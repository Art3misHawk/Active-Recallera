<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Active Recaller - Copilot Instructions

## Project Overview
This is a React-based spaced repetition study tool called "Active Recaller". The app helps users memorize information through scientifically-proven spaced repetition intervals.

## Key Architectural Principles
- **Component Structure**: Functional React components with hooks
- **State Management**: Local state with useState and useEffect hooks
- **Data Persistence**: localStorage for client-side data storage
- **Styling**: Vanilla CSS with CSS variables for theming
- **Design System**: Minimal, clean interface inspired by Claude

## Core Components
- `App.jsx`: Main application component with routing logic
- `Header.jsx`: Navigation and app branding
- `Dashboard.jsx`: Main landing page with stats and quick actions
- `NoteModal.jsx`: Modal for creating/editing notes
- `StudySession.jsx`: Card-flip interface for studying
- `Library.jsx`: Grid view of all notes with search/filter
- `Stats.jsx`: Analytics and progress tracking

## Services
- `noteService.js`: All CRUD operations and spaced repetition logic

## Spaced Repetition Logic
- Intervals: 1 day, 3 days, 1 week, 2 weeks, 1 month
- Success advances to next interval
- Failure resets to 1-day interval
- Due notes are calculated based on nextReview date

## Design Guidelines
- Use CSS variables defined in `index.css` for colors and spacing
- Follow the existing component structure and naming conventions
- Maintain the minimal, card-based design aesthetic
- Ensure responsive design for mobile devices
- Use smooth transitions and subtle animations

## Data Structure
Notes contain: id, title, description, tags[], createdAt, lastReviewed, nextReview, intervalIndex, reviewCount, successCount

## Development Guidelines
- Prefer functional components over class components
- Use meaningful variable and function names
- Keep components focused on single responsibilities
- Handle loading and error states appropriately
- Maintain accessibility standards
