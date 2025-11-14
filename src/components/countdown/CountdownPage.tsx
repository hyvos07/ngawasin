import { useState, useEffect } from 'react';
import Countdown from './Countdown';
import CountdownInput from './CountdownInput';

export default function CountdownPage() {
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [showInput, setShowInput] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const timeParam = urlParams.get('time');
        
        if (!timeParam) {
            setShowInput(true);
            return;
        }

        const parsedDate = parseDateTime(timeParam);
        
        if (!parsedDate) {
            setShowInput(true);
            return;
        }

        setTargetDate(parsedDate);
        setShowInput(false);
    }, []);

    function parseDateTime(dateTimeStr: string): Date | null {
        try {
            const [datePart, timePart] = dateTimeStr.split('_');
            
            if (!datePart || !timePart || datePart.length !== 8) {
                return null;
            }

            const year = parseInt(datePart.substring(0, 4));
            const month = parseInt(datePart.substring(4, 6)) - 1;
            const day = parseInt(datePart.substring(6, 8));

            const [hours, minutes, seconds] = timePart.split(':').map(num => parseInt(num));

            const date = new Date(year, month, day, hours, minutes, seconds);

            if (isNaN(date.getTime())) {
                return null;
            }

            return date;
        } catch (error) {
            return null;
        }
    }

    if (showInput) {
        return <CountdownInput />;
    }

    if (!targetDate) {
        return (
            <div className="text-center">
                <p className="text-2xl" style={{ fontFamily: 'Kinetika' }}>Loading...</p>
            </div>
        );
    }

    return <Countdown targetDate={targetDate} />;
}
