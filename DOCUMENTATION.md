# Active Recaller Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [User Guide](#user-guide)
4. [Technical Documentation](#technical-documentation)
5. [API Reference](#api-reference)
6. [Development Guide](#development-guide)
7. [Troubleshooting](#troubleshooting)

## Introduction

Active Recaller is a modern web application designed to help users learn and retain information through the scientifically-proven technique of spaced repetition. The app provides an intuitive interface for creating study notes and automatically schedules reviews at optimal intervals to maximize memory retention.

### Key Benefits
- **Scientifically Optimized**: Based on cognitive science research about memory and forgetting curves
- **Automatic Scheduling**: No manual planning required - the app handles optimal review timing
- **Progress Tracking**: Detailed analytics help you understand your learning patterns
- **Offline Capable**: All data stored locally - no internet required after initial load
- **Cross-Platform**: Works on desktop and mobile browsers

### Target Users
- Students preparing for exams
- Professionals learning new skills
- Language learners building vocabulary
- Anyone wanting to memorize information efficiently

## Getting Started

### System Requirements
- Modern web browser (Chrome 88+, Firefox 85+, Safari 14+)
- JavaScript enabled
- Local storage support (enabled by default in all modern browsers)

### Installation Options

#### Option 1: Development Setup
```bash
# Clone or download the project
cd active-recaller

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

#### Option 2: Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy the 'dist' folder to any web server
```

#### Option 3: Direct Use
- Download the built files and open `index.html` in a web browser
- No server required for production use

### First Launch
1. Open the application in your browser
2. You'll see the Dashboard with empty statistics
3. Click "Add Note" to create your first study note
4. Start building your knowledge base!

## User Guide

### Creating Your First Note

1. **Click "Add Note"** in the header or dashboard
2. **Enter a Title**: This should be a question or concept you want to remember
   - Example: "What is the capital of France?"
3. **Add Description**: Provide the detailed answer or explanation
   - Example: "Paris is the capital and largest city of France..."
4. **Add Tags** (optional): Organize your notes with relevant keywords
   - Example: "geography", "europe", "capitals"
5. **Save**: Your note is automatically scheduled for review

### Study Sessions

#### Starting a Study Session
- Visit the Dashboard
- Click "Study Now" when notes are due
- The app will show you all notes that need review

#### During Study
1. **Read the Question**: The note title (question/concept) appears first
2. **Think of the Answer**: Try to recall the information from memory
3. **Flip the Card**: Click to reveal the answer
4. **Rate Your Performance**:
   - ✅ **Easy**: You knew the answer well (extends interval significantly)
   - ❌ **Difficult**: You struggled or got it wrong (resets to shortest interval)
   - ⏭️ **Skip**: Don't want to review right now (no effect on scheduling)

#### Study Session Tips
- Be honest with your self-assessment
- If you hesitated or weren't confident, mark it as "Difficult"
- The "Easy" rating should only be used when you instantly knew the answer
- Take breaks during long study sessions

### Managing Your Notes

#### Library View
Access all your notes through the Library section:

- **Search**: Type keywords to find specific notes
- **Filter by Tags**: Click tags to show only notes with those tags
- **Sort Options**:
  - Created: Newest notes first
  - Title: Alphabetical order
  - Due Date: Most overdue first
  - Reviews: Most reviewed first

#### Editing Notes
1. Find the note in Library view
2. Click the edit icon (✏️)
3. Modify title, description, or tags
4. Save changes

#### Deleting Notes
1. Find the note in Library view
2. Click the delete icon (🗑️)
3. Confirm deletion
⚠️ **Warning**: Deletion cannot be undone

### Understanding the Statistics

#### Dashboard Overview
- **Due Today**: Notes scheduled for review today
- **Overdue**: Notes that should have been reviewed earlier
- **Total Notes**: Your complete collection
- **Success Rate**: Percentage of reviews marked as "Easy"

#### Detailed Statistics
Access the Stats page for comprehensive analytics:

##### Overview Section
- Complete summary of your study statistics
- Success rate calculations
- Review completion metrics

##### Spaced Repetition Progress
- Visual breakdown of notes by interval stage
- Shows how many notes are at each difficulty level
- Helps you understand your retention patterns

##### Top Tags
- Most frequently used tags
- Helps identify your study focus areas
- Useful for balancing different subjects

##### Recent Activity
- Timeline of your recent reviews
- Performance history for individual notes
- Motivation through visible progress

### Note Status Indicators

#### Visual Cues
- **No Border**: Note not due yet
- **Orange Left Border**: Due today
- **Red Left Border**: Overdue

#### Text Indicators
- "Due today"
- "Due tomorrow"
- "Due in X days"
- "X days overdue"

## Technical Documentation

### Architecture Overview

Active Recaller is built as a Single Page Application (SPA) using modern web technologies:

```
├── Frontend: React 18 with Hooks
├── Styling: Vanilla CSS with CSS Variables
├── Build Tool: Vite
├── Storage: Browser localStorage
└── Deployment: Static files (no server required)
```

### Data Flow

1. **User Actions** → React Components
2. **Component Logic** → Note Service
3. **Note Service** → localStorage
4. **localStorage** → Persistent Storage

### Component Hierarchy

```
App.jsx (Root)
├── Header.jsx (Navigation)
├── Dashboard.jsx (Main view)
├── StudySession.jsx (Study mode)
├── Library.jsx (Note management)
├── Stats.jsx (Analytics)
├── NoteModal.jsx (Create/Edit)
└── CSS Modules (Styling)
```

### Data Structure

#### Note Object
```javascript
{
  id: "unique_timestamp_string",
  title: "Question or concept",
  description: "Detailed answer or explanation",
  tags: ["tag1", "tag2"],
  createdAt: "2025-08-01T10:30:00.000Z",
  lastReviewed: "2025-08-01T15:30:00.000Z",
  nextReview: "2025-08-02T10:30:00.000Z",
  intervalIndex: 0, // 0-4 (maps to interval array)
  reviewCount: 3,
  successCount: 2
}
```

#### Spaced Repetition Intervals
```javascript
const INTERVALS = [1, 3, 7, 14, 30]; // days
// Index 0: 1 day
// Index 1: 3 days  
// Index 2: 1 week
// Index 3: 2 weeks
// Index 4: 1 month (maximum)
```

### Storage Implementation

#### localStorage Keys
- `activeRecaller_notes`: Array of all note objects
- Automatic serialization/deserialization
- No external database required

#### Data Persistence
- Automatic save on every note modification
- No manual sync required
- Offline-first architecture

### Performance Considerations

#### Optimization Techniques
- React.useMemo for expensive calculations
- Component-level state management
- Efficient re-rendering with proper key props
- CSS transitions instead of JavaScript animations

#### Scalability
- Tested with 1000+ notes
- Linear search performance (adequate for typical use)
- Lazy loading can be added for larger datasets

## API Reference

### noteService Methods

#### Core CRUD Operations

##### `createNote(noteData)`
Creates a new note with spaced repetition scheduling.

**Parameters:**
- `noteData` (Object): Note content
  - `title` (string): Question or concept
  - `description` (string): Answer or explanation  
  - `tags` (Array): Optional tags array

**Returns:** Complete note object with generated metadata

**Example:**
```javascript
const note = noteService.createNote({
  title: "What is React?",
  description: "A JavaScript library for building user interfaces",
  tags: ["programming", "react", "javascript"]
});
```

##### `updateNote(id, noteData)`
Updates an existing note's content (preserves scheduling data).

**Parameters:**
- `id` (string): Note identifier
- `noteData` (Object): Updated content

**Returns:** Updated note object or null if not found

##### `deleteNote(id)`
Permanently removes a note.

**Parameters:**
- `id` (string): Note identifier

**Returns:** void

##### `getNote(id)`
Retrieves a single note by ID.

**Parameters:**
- `id` (string): Note identifier

**Returns:** Note object or null

##### `getAllNotes()`
Retrieves all notes.

**Returns:** Array of note objects

#### Study Operations

##### `getDueNotes()`
Gets notes scheduled for review (due date <= now).

**Returns:** Array of due note objects

##### `updateStudyProgress(noteId, success)`
Records a study session result and updates scheduling.

**Parameters:**
- `noteId` (string): Note identifier
- `success` (boolean): True if marked "Easy", false if "Difficult"

**Side Effects:** Updates `lastReviewed`, `nextReview`, `intervalIndex`, `reviewCount`, `successCount`

#### Utility Functions

##### `getStats()`
Calculates comprehensive statistics.

**Returns:**
```javascript
{
  total: 25,           // Total notes
  due: 3,              // Due today
  overdue: 1,          // Overdue
  reviewed: 20,        // Ever reviewed
  averageSuccessRate: 75 // Percentage
}
```

##### `searchNotes(query)`
Searches notes by title, description, or tags.

**Parameters:**
- `query` (string): Search term

**Returns:** Array of matching notes

##### `filterByTags(tags)`
Filters notes that contain all specified tags.

**Parameters:**
- `tags` (Array): Required tags

**Returns:** Array of matching notes

##### `getAllTags()`
Gets all unique tags across all notes.

**Returns:** Sorted array of tag strings

##### `formatRelativeTime(date)`
Formats a date as relative time for display.

**Parameters:**
- `date` (string): ISO date string

**Returns:** Human-readable string ("Due today", "2 days overdue", etc.)

### Component Props

#### Header Component
```javascript
<Header 
  currentView="dashboard" 
  onNavigate={handleNavigate}
  onAddNote={handleAddNote}
/>
```

#### Dashboard Component
```javascript
<Dashboard 
  notes={notesArray}
  onStartStudy={handleStartStudy}
  onAddNote={handleAddNote}
/>
```

#### StudySession Component
```javascript
<StudySession 
  notes={dueNotesArray}
  onStudyComplete={handleStudyComplete}
  onFinish={handleFinish}
/>
```

#### Library Component
```javascript
<Library 
  notes={notesArray}
  onEditNote={handleEditNote}
  onDeleteNote={handleDeleteNote}
/>
```

#### NoteModal Component
```javascript
<NoteModal 
  note={noteObject || null}
  onSave={handleSaveNote}
  onClose={handleCloseModal}
/>
```

#### Stats Component
```javascript
<Stats notes={notesArray} />
```

## Development Guide

### Setting Up Development Environment

#### Prerequisites
- Node.js 16+ and npm
- Git (for version control)
- VS Code (recommended editor)

#### Installation
```bash
# Clone repository
git clone <repository-url>
cd active-recaller

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Development Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linting (if configured)
```

### Project Structure

```
active-recaller/
├── public/                 # Static assets
│   └── vite.svg           # Favicon
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx
│   │   ├── Dashboard.jsx
│   │   ├── StudySession.jsx
│   │   ├── Library.jsx
│   │   ├── Stats.jsx
│   │   └── NoteModal.jsx
│   ├── services/          # Business logic
│   │   └── noteService.js
│   ├── App.jsx           # Main component
│   ├── App.css           # Component styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── .github/
│   └── copilot-instructions.md
├── package.json
├── vite.config.js
├── README.md
└── DOCUMENTATION.md       # This file
```

### Coding Standards

#### React Best Practices
- Use functional components with hooks
- Implement proper key props for lists
- Handle loading and error states
- Use meaningful component and prop names

#### CSS Guidelines
- Use CSS variables for theming
- Follow BEM-like naming conventions
- Ensure responsive design
- Optimize for accessibility

#### JavaScript Conventions
- Use ES6+ features
- Implement proper error handling
- Write self-documenting code
- Follow consistent naming patterns

### Adding New Features

#### Creating a New Component
1. Create component file in `/src/components/`
2. Follow existing component patterns
3. Add appropriate CSS classes
4. Import and use in parent component
5. Update documentation

#### Extending the Note Service
1. Add new methods to `noteService.js`
2. Maintain localStorage compatibility
3. Update data structures if needed
4. Add error handling
5. Update API documentation

#### Styling Guidelines
- Use existing CSS variables
- Follow the established design system
- Ensure mobile responsiveness
- Test accessibility

### Testing Strategies

#### Manual Testing Checklist
- [ ] Create, edit, delete notes
- [ ] Complete study sessions
- [ ] Test search and filtering
- [ ] Verify statistics accuracy
- [ ] Check responsive design
- [ ] Test localStorage persistence

#### Browser Testing
- Chrome (primary target)
- Firefox
- Safari
- Edge
- Mobile browsers

#### Performance Testing
- Large note collections (100+ notes)
- Study sessions with many notes
- Search performance
- Memory usage

### Building for Production

#### Optimization Steps
```bash
# Build optimized version
npm run build

# Verify build
npm run preview

# Deploy dist/ folder
```

#### Deployment Options
- Static hosting (Netlify, Vercel, GitHub Pages)
- CDN deployment
- Self-hosted web server
- Local file system (file:// protocol)

### Version Control

#### Git Workflow
1. Create feature branches from main
2. Make focused commits with clear messages
3. Test thoroughly before merging
4. Use meaningful branch names

#### Commit Message Format
```
type(scope): description

Examples:
feat(study): add skip functionality
fix(library): resolve search bug
docs(readme): update installation steps
style(css): improve responsive design
```

## Troubleshooting

### Common Issues

#### Notes Not Saving
**Symptoms:** Changes don't persist after refresh

**Causes:**
- localStorage disabled in browser
- Private/incognito mode restrictions
- Storage quota exceeded

**Solutions:**
1. Check browser settings for localStorage
2. Use regular browser mode (not private)
3. Clear browser storage if quota exceeded
4. Try different browser

#### Study Sessions Not Working
**Symptoms:** No notes appear in study mode

**Causes:**
- No notes created yet
- No notes are due for review
- Incorrect system date/time

**Solutions:**
1. Create some notes first
2. Wait for notes to become due
3. Check system date/time settings
4. Manually adjust note due dates in browser dev tools

#### Performance Issues
**Symptoms:** App feels slow or unresponsive

**Causes:**
- Very large number of notes (1000+)
- Browser memory limitations
- Conflicting browser extensions

**Solutions:**
1. Consider archiving old notes
2. Close other browser tabs
3. Disable conflicting extensions
4. Restart browser

#### Search Not Working
**Symptoms:** Search returns no results or wrong results

**Causes:**
- Case-sensitive search expectations
- Special characters in search
- Outdated note index

**Solutions:**
1. Try different search terms
2. Use partial matches
3. Check for typos
4. Refresh page to reload data

#### Mobile Display Issues
**Symptoms:** Layout broken on mobile devices

**Causes:**
- Viewport settings
- CSS compatibility
- Touch interaction problems

**Solutions:**
1. Use mobile-friendly browser
2. Enable desktop site mode temporarily
3. Rotate device orientation
4. Clear browser cache

### Advanced Troubleshooting

#### Accessing Browser Developer Tools
1. **Chrome/Edge**: F12 or Ctrl+Shift+I
2. **Firefox**: F12 or Ctrl+Shift+I
3. **Safari**: Cmd+Opt+I (after enabling in preferences)

#### Inspecting localStorage Data
1. Open developer tools
2. Go to Application/Storage tab
3. Find localStorage section
4. Look for `activeRecaller_notes` key
5. View or modify data as needed

#### Debugging JavaScript Errors
1. Open Console tab in developer tools
2. Look for red error messages
3. Check for network errors
4. Examine stack traces

#### Backup and Recovery

##### Manual Backup
1. Open browser developer tools
2. Navigate to Application/Storage > localStorage
3. Copy `activeRecaller_notes` value
4. Save to text file

##### Manual Restore
1. Open browser developer tools
2. Navigate to localStorage
3. Set `activeRecaller_notes` key with backup data
4. Refresh application

##### Export/Import Feature (Future Enhancement)
Consider implementing built-in backup/restore functionality for easier data management.

### Getting Help

#### Documentation Resources
- This documentation file
- README.md for quick start
- Inline code comments
- Component prop documentation

#### Community Support
- Create GitHub issues for bugs
- Submit feature requests
- Contribute improvements
- Share usage experiences

#### Professional Support
For organizations requiring dedicated support, consider:
- Custom development services
- Training and implementation assistance
- Enhanced features development
- Security audits and compliance

---

*This documentation is maintained alongside the Active Recaller codebase. Last updated: August 2025*
