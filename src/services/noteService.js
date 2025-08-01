// Spaced repetition intervals in days
const INTERVALS = [1, 3, 7, 14, 30];

// Add test tags for development/testing
const addTestTags = () => {
  const testTags = ['JavaScript', 'React', 'CSS', 'HTML', 'Programming', 'Study', 'Notes', 'Learning'];
  const existingTags = getSavedTags();
  const allTags = [...new Set([...existingTags, ...testTags])];
  saveTags(allTags);
  console.log('Test tags added:', allTags);
  return allTags;
};

export const noteService = {
  // Create a new note
  createNote(noteData) {
    const note = {
      id: Date.now().toString(),
      title: noteData.title,
      description: noteData.description,
      tags: noteData.tags || [],
      createdAt: new Date().toISOString(),
      lastReviewed: null,
      nextReview: this.calculateNextReview(new Date(), 0),
      intervalIndex: 0,
      reviewCount: 0,
      successCount: 0
    };
    
    // Auto-save tags for future use
    this.autoSaveTags(note.tags);
    
    this.saveNote(note);
    return note;
  },

  // Update an existing note
  updateNote(id, noteData) {
    const notes = this.getAllNotes();
    const noteIndex = notes.findIndex(n => n.id === id);
    
    if (noteIndex === -1) return null;
    
    const updatedNote = {
      ...notes[noteIndex],
      title: noteData.title,
      description: noteData.description,
      tags: noteData.tags || []
    };
    
    // Auto-save tags for future use
    this.autoSaveTags(updatedNote.tags);
    
    notes[noteIndex] = updatedNote;
    localStorage.setItem('activeRecaller_notes', JSON.stringify(notes));
    
    return updatedNote;
  },

  // Delete a note
  deleteNote(id) {
    const notes = this.getAllNotes();
    const filteredNotes = notes.filter(n => n.id !== id);
    localStorage.setItem('activeRecaller_notes', JSON.stringify(filteredNotes));
  },

  // Get a single note by ID
  getNote(id) {
    const notes = this.getAllNotes();
    return notes.find(n => n.id === id) || null;
  },

  // Get all notes
  getAllNotes() {
    const notes = localStorage.getItem('activeRecaller_notes');
    return notes ? JSON.parse(notes) : [];
  },

  // Save a note to localStorage
  saveNote(note) {
    const notes = this.getAllNotes();
    notes.push(note);
    localStorage.setItem('activeRecaller_notes', JSON.stringify(notes));
  },

  // Get notes that are due for review
  getDueNotes() {
    const notes = this.getAllNotes();
    const now = new Date();
    
    return notes.filter(note => {
      const nextReview = new Date(note.nextReview);
      return nextReview <= now;
    });
  },

  // Update study progress after a review session
  updateStudyProgress(noteId, success) {
    const notes = this.getAllNotes();
    const noteIndex = notes.findIndex(n => n.id === noteId);
    
    if (noteIndex === -1) return;
    
    const note = notes[noteIndex];
    const now = new Date();
    
    note.lastReviewed = now.toISOString();
    note.reviewCount += 1;
    
    if (success) {
      note.successCount += 1;
      // Move to next interval or stay at maximum
      note.intervalIndex = Math.min(note.intervalIndex + 1, INTERVALS.length - 1);
    } else {
      // Reset to first interval on failure
      note.intervalIndex = 0;
    }
    
    note.nextReview = this.calculateNextReview(now, note.intervalIndex);
    
    notes[noteIndex] = note;
    localStorage.setItem('activeRecaller_notes', JSON.stringify(notes));
  },

  // Calculate the next review date based on current date and interval index
  calculateNextReview(currentDate, intervalIndex) {
    const interval = INTERVALS[intervalIndex];
    const nextReview = new Date(currentDate);
    nextReview.setDate(nextReview.getDate() + interval);
    return nextReview.toISOString();
  },

  // Get statistics about notes
  getStats() {
    const notes = this.getAllNotes();
    const now = new Date();
    
    const stats = {
      total: notes.length,
      due: 0,
      overdue: 0,
      reviewed: 0,
      averageSuccessRate: 0
    };
    
    let totalReviews = 0;
    let totalSuccesses = 0;
    
    notes.forEach(note => {
      const nextReview = new Date(note.nextReview);
      const daysDiff = Math.floor((now - nextReview) / (1000 * 60 * 60 * 24));
      
      if (daysDiff >= 0) {
        if (daysDiff === 0) {
          stats.due += 1;
        } else {
          stats.overdue += 1;
        }
      }
      
      if (note.reviewCount > 0) {
        stats.reviewed += 1;
        totalReviews += note.reviewCount;
        totalSuccesses += note.successCount;
      }
    });
    
    if (totalReviews > 0) {
      stats.averageSuccessRate = Math.round((totalSuccesses / totalReviews) * 100);
    }
    
    return stats;
  },

  // Search notes by title, description, or tags
  searchNotes(query) {
    const notes = this.getAllNotes();
    const searchTerm = query.toLowerCase();
    
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm) ||
      note.description.toLowerCase().includes(searchTerm) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  // Filter notes by tags
  filterByTags(tags) {
    const notes = this.getAllNotes();
    
    return notes.filter(note =>
      tags.every(tag => note.tags.includes(tag))
    );
  },

  // Get all unique tags
  getAllTags() {
    const notes = this.getAllNotes();
    const allTags = notes.flatMap(note => note.tags);
    return [...new Set(allTags)].sort();
  },

  // Save tags to localStorage for persistence
  saveTags(tags) {
    const existingTags = this.getSavedTags();
    const uniqueTags = [...new Set([...existingTags, ...tags])].sort();
    localStorage.setItem('activeRecaller_tags', JSON.stringify(uniqueTags));
    return uniqueTags;
  },

  // Get saved tags from localStorage
  getSavedTags() {
    try {
      const saved = localStorage.getItem('activeRecaller_tags');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved tags:', error);
      return [];
    }
  },

  // Add a single tag and save automatically
  addTag(tag) {
    if (!tag || typeof tag !== 'string') return this.getSavedTags();
    
    const trimmedTag = tag.trim();
    if (!trimmedTag) return this.getSavedTags();
    
    const existingTags = this.getSavedTags();
    if (!existingTags.includes(trimmedTag)) {
      return this.saveTags([trimmedTag]);
    }
    return existingTags;
  },

  // Remove a tag from saved tags
  removeTag(tagToRemove) {
    const existingTags = this.getSavedTags();
    const filteredTags = existingTags.filter(tag => tag !== tagToRemove);
    localStorage.setItem('activeRecaller_tags', JSON.stringify(filteredTags));
    return filteredTags;
  },

  // Get all tags (combination of saved tags and tags from notes)
  getAllAvailableTags() {
    const savedTags = this.getSavedTags();
    const noteTags = this.getAllTags();
    return [...new Set([...savedTags, ...noteTags])].sort();
  },

  // Auto-save tags when creating/updating notes
  autoSaveTags(tags) {
    if (Array.isArray(tags) && tags.length > 0) {
      this.saveTags(tags);
    }
  },

  // Add test tags for development/testing
  addTestTags,

  // Format relative time for display
  formatRelativeTime(date) {
    const now = new Date();
    const target = new Date(date);
    const diffMs = target - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      const overdueDays = Math.abs(diffDays);
      return `${overdueDays} day${overdueDays === 1 ? '' : 's'} overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  }
};
