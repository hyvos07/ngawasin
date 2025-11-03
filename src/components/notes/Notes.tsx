import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ngawasin-notes';

const getDefaultNotes = () => {
    return [
        "Klik dua kali untuk mengedit catatan.",
    ];
};

export default function Notes({ fontSize }: { fontSize: number }) {
    // Load notes
    const [notes, setNotes] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const savedNotes = localStorage.getItem(STORAGE_KEY);
            if (savedNotes) {
                try {
                    return JSON.parse(savedNotes);
                } catch (error) {
                    console.error('Failed to parse saved notes:', error);
                    return getDefaultNotes();
                }
            }
        }
        return getDefaultNotes();
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(notes.join('\n'));

    // Save to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        }
    }, [notes]);

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
        <div className={`mt-4 text-gray-800 text-center max-w-2xl`} style={{ fontFamily: 'Kinetika', fontSize: `${fontSize}px` }}>
            <p className='font-bold mb-4'>Notes:</p>

            {isEditing ? (
                <div className='space-y-2'>
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className='w-full p-4 border border-gray-300 rounded-lg text-lg resize-y min-h-[12rem] shadow-sm'
                        rows={6}
                        placeholder='Enter your notes'
                    />
                    <div className='flex gap-4 justify-center mt-2'>
                        <button
                            onClick={handleSave}
                            className='text-base bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow-md'
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className='text-base bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 shadow-md'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div onDoubleClick={handleEdit} className='cursor-pointer'>
                    {notes.length > 0 ? (
                        notes.map((note, index) => (
                            <p key={index} className='mb-1'>
                                {note}
                            </p>
                        ))
                    ) : (
                        <p className='text-gray-400 text-2xl italic'>
                            Klik dua kali untuk menambah catatan
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}