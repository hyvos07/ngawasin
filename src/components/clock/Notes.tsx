import { useState } from 'react';

export default function Notes(){
    const [notes, setNotes] = useState([
        "Password: 1",
        "Jangan lupa ubah password aren soalnya direset ktnya"
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(notes.join('\n'));

    const handleEdit = () => {
        setEditText(notes.join('\n'));
        setIsEditing(true);
    };

    const handleSave = () => {
        const newNotes = editText.split('\n').filter(line => line.trim() !== '');
        setNotes(newNotes);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditText(notes.join('\n'));
    };

    return (
        <div className='text-3xl text-gray-700 mt-4 text-center max-w-2xl' style={{ fontFamily: 'Kinetika' }}>
            <p className='font-extrabold mb-2'>Notes:</p>
            
            {isEditing ? (
                <div className='space-y-2'>
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded text-sm resize-none'
                        rows={4}
                        placeholder='Enter your notes...'
                    />
                    <div className='flex gap-3 justify-center'>
                        <button 
                            onClick={handleSave}
                            className='text-sm bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                        >
                            Save
                        </button>
                        <button 
                            onClick={handleCancel}
                            className='text-sm bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div onDoubleClick={handleEdit} className='cursor-pointer'>
                    {notes.map((note, index) => (
                        <p key={index} className='mb-1'>
                            {note}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}