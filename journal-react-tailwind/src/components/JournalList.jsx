import React from 'react';
import JournalItem from './JournalItem';

export default function JournalList({ entries, onDelete, onEdit }) {
  if (!entries || entries.length === 0) {
    return <p className="text-center text-gray-500 py-10">No journal entries yet. Add one above!</p>;
  }

  return (
    <div className="space-y-5">
      {entries.map((entry) => (
        <JournalItem key={entry.id} entry={entry} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
} 