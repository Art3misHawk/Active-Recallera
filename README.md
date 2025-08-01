# Active Recaller

A modern, minimal study tool that implements spaced repetition for revision notes. Built with React and designed with a calming, study-focused aesthetic inspired by Claude's interface.

## Features

### Core Functionality
- **Note Management**: Add, edit, and organize study notes with titles, descriptions, and custom tags
- **Spaced Repetition**: Automatic scheduling based on proven intervals (1 day, 3 days, 1 week, 2 weeks, 1 month)
- **Study Sessions**: Interactive card-flip interface for reviewing due notes
- **Progress Tracking**: Comprehensive statistics and performance analytics
- **Local Storage**: All data persists locally in your browser

### User Interface
- **Clean Design**: Minimal, distraction-free interface with Inter font
- **Soft Color Palette**: Calming colors with subtle shadows and smooth transitions
- **Card-Based Layout**: Notes displayed as interactive cards
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Thoughtful micro-interactions enhance the user experience

### Views and Navigation
- **Dashboard**: Overview of due notes, study statistics, and quick actions
- **Study Mode**: Focus mode with card-flip interface for active recall
- **Library**: Searchable and filterable grid of all notes
- **Statistics**: Detailed analytics on study progress and patterns

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation
1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production
Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How to Use

### Creating Notes
1. Click the "Add Note" button in the header
2. Enter a title (question/concept you want to remember)
3. Add a detailed description (answer/explanation)
4. Optionally add tags for better organization
5. Save the note

### Studying
1. Visit the Dashboard to see notes due for review
2. Click "Study Now" to start a study session
3. Read the question/concept on the front of each card
4. Click to flip and reveal the answer
5. Rate your performance (Easy/Difficult) to adjust future scheduling

### Managing Notes
- Use the Library view to browse all notes
- Search by title, description, or tags
- Filter by specific tags
- Sort by creation date, title, due date, or review count
- Edit or delete notes as needed

### Tracking Progress
- View the Stats page for detailed analytics
- Monitor your success rate and review patterns
- See how notes progress through spaced repetition intervals
- Track your most-used tags and recent activity

## Spaced Repetition Algorithm

The app uses a proven spaced repetition system:

- **Initial Review**: 1 day after creation
- **Successful Reviews**: Intervals increase (3 days → 1 week → 2 weeks → 1 month)
- **Difficult Reviews**: Reset to 1-day interval
- **Automatic Scheduling**: No manual intervention required

This system optimizes retention while minimizing study time by showing you information just before you're likely to forget it.

## Technical Details

### Built With
- **React 18**: Modern React with hooks for state management
- **Vite**: Fast build tool and development server
- **Vanilla CSS**: Custom CSS with CSS variables for theming
- **Local Storage**: Browser-based persistence (no server required)

### Browser Compatibility
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

### Data Storage
All data is stored locally in your browser using localStorage. Your notes remain private and accessible offline. To backup your data, you can export it from the browser's developer tools.

## Contributing

This is an open-source project. Feel free to:
- Report bugs or suggest features
- Submit pull requests
- Fork the project for your own modifications

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by Claude's clean, minimal interface
- Spaced repetition algorithm based on proven cognitive science research
- Inter font family for optimal readability
