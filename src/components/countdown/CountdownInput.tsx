import { useState } from 'react';

export default function CountdownInput() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!date || !time) {
            setError('Please fill in both date and time');
            return;
        }

        const selectedDateTime = new Date(`${date}T${time}`);
        const now = new Date();

        if (isNaN(selectedDateTime.getTime())) {
            setError('Invalid date or time format');
            return;
        }

        if (selectedDateTime <= now) {
            setError('Please select a future date and time');
            return;
        }

        // Format: YYYYMMDD_HH:MM:SS
        const year = selectedDateTime.getFullYear();
        const month = String(selectedDateTime.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDateTime.getDate()).padStart(2, '0');
        const hours = String(selectedDateTime.getHours()).padStart(2, '0');
        const minutes = String(selectedDateTime.getMinutes()).padStart(2, '0');
        const seconds = String(selectedDateTime.getSeconds()).padStart(2, '0');

        const formattedDateTime = `${year}${month}${day}_${hours}:${minutes}:${seconds}`;
        
        window.location.href = `/countdown?time=${formattedDateTime}`;
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-6xl font-bold mb-6" style={{ fontFamily: 'Kinetika' }}>
                Set Countdown Timer
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="date" 
                        className="text-2xl font-bold" 
                        style={{ fontFamily: 'Kinetika' }}
                    >
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={getTodayDate()}
                        className="p-4 text-2xl rounded-lg border-2 border-gray-300 focus:border-gray-500 focus:outline-none"
                        style={{ fontFamily: 'Kinetika' }}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="time" 
                        className="text-2xl font-bold" 
                        style={{ fontFamily: 'Kinetika' }}
                    >
                        Time:
                    </label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        step="1"
                        className="p-4 text-2xl rounded-lg border-2 border-gray-300 focus:border-gray-500 focus:outline-none"
                        style={{ fontFamily: 'Kinetika' }}
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-xl text-center" style={{ fontFamily: 'Kinetika' }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 p-4 text-2xl font-bold bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    style={{ fontFamily: 'Kinetika' }}
                >
                    Start Countdown
                </button>
            </form>

            <div className="mt-8 text-center text-gray-500 text-lg" style={{ fontFamily: 'Kinetika' }}>
                <p>Select a future date and time to start your countdown.</p>
            </div>
        </div>
    );
}
