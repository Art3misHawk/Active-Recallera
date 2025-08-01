import React, { useState, useEffect } from 'react';

const StudySession = ({ notes, onStudyComplete, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedNotes, setStudiedNotes] = useState(new Set());

  const currentNote = notes[currentIndex];
  const progress = ((currentIndex + 1) / notes.length) * 100;

  useEffect(() => {
    // Reset state when notes change
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedNotes(new Set());
  }, [notes]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (success) => {
    if (!currentNote) return;

    // Mark as studied and record the result
    onStudyComplete(currentNote.id, success);
    setStudiedNotes(prev => new Set(prev).add(currentNote.id));

    // Move to next note or finish
    if (currentIndex < notes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    if (currentIndex < notes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      onFinish();
    }
  };

  if (!notes.length) {
    return (
      <div className="study-session">
        <div className="text-center">
          <h2>No notes to study!</h2>
          <p className="text-muted mb-lg">All caught up! Come back later or add more notes.</p>
          <button className="btn btn-primary" onClick={onFinish}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentNote) {
    return (
      <div className="study-session">
        <div className="text-center">
          <h2>Study Session Complete! 🎉</h2>
          <p className="text-muted mb-lg">
            Great job! You've reviewed {studiedNotes.size} note{studiedNotes.size !== 1 ? 's' : ''}.
          </p>
          <button className="btn btn-primary" onClick={onFinish}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="study-session animate-fade-in">
      <div className="study-header">
        <h2>Study Session</h2>
        <p className="text-muted">
          Note {currentIndex + 1} of {notes.length}
        </p>
      </div>

      <div className="study-progress">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div 
        className={`study-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="card-content">
          {!isFlipped ? (
            <>
              <h3 className="card-title">{currentNote.title}</h3>
              <div className="flip-indicator">Click to reveal answer</div>
            </>
          ) : (
            <>
              <h3 className="card-title">{currentNote.title}</h3>
              <div className="card-description">
                {currentNote.description}
              </div>
              {currentNote.tags.length > 0 && (
                <div className="card-tags">
                  {currentNote.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isFlipped && (
        <div className="study-actions animate-fade-in">
          <button 
            className="btn btn-danger"
            onClick={() => handleResponse(false)}
          >
            ❌ Difficult
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleSkip}
          >
            ⏭️ Skip
          </button>
          <button 
            className="btn btn-success"
            onClick={() => handleResponse(true)}
          >
            ✅ Easy
          </button>
        </div>
      )}

      {!isFlipped && (
        <div className="study-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleSkip}
          >
            ⏭️ Skip
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleFlip}
          >
            🔄 Reveal Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySession;
