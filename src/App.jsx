import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NoteModal from './components/NoteModal';
import StudySession from './components/StudySession';
import Library from './components/Library';
import Stats from './components/Stats';
import { noteService } from './services/noteService';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [notes, setNotes] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [studyNotes, setStudyNotes] = useState([]);

  useEffect(() => {
    // Load notes from localStorage on app start
    const savedNotes = noteService.getAllNotes();
    setNotes(savedNotes);
  }, []);

  const handleAddNote = () => {
    setEditingNote(null);
    setShowNoteModal(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowNoteModal(true);
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      const updatedNote = noteService.updateNote(editingNote.id, noteData);
      setNotes(prev => prev.map(n => n.id === editingNote.id ? updatedNote : n));
    } else {
      const newNote = noteService.createNote(noteData);
      setNotes(prev => [...prev, newNote]);
    }
    setShowNoteModal(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId) => {
    noteService.deleteNote(noteId);
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const handleStartStudy = () => {
    const dueNotes = noteService.getDueNotes();
    setStudyNotes(dueNotes);
    setCurrentView('study');
  };

  const handleStudyComplete = (noteId, success) => {
    noteService.updateStudyProgress(noteId, success);
    setNotes(prev => prev.map(n => 
      n.id === noteId ? noteService.getNote(noteId) : n
    ));
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            notes={notes}
            onStartStudy={handleStartStudy}
            onAddNote={handleAddNote}
          />
        );
      case 'study':
        return (
          <StudySession 
            notes={studyNotes}
            onStudyComplete={handleStudyComplete}
            onFinish={() => setCurrentView('dashboard')}
          />
        );
      case 'library':
        return (
          <Library 
            notes={notes}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
          />
        );
      case 'stats':
        return <Stats notes={notes} />;
      default:
        return (
          <Dashboard 
            notes={notes}
            onStartStudy={handleStartStudy}
            onAddNote={handleAddNote}
          />
        );
    }
  };

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        onNavigate={handleNavigate}
        onAddNote={handleAddNote}
      />
      
      <main className="main-content">
        <div className="container">
          {renderCurrentView()}
        </div>
      </main>

      {showNoteModal && (
        <NoteModal
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => {
            setShowNoteModal(false);
            setEditingNote(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
