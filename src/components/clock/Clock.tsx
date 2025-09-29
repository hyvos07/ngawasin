import { useState, useEffect } from 'react';

const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
};

export default function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [clockOffset, setClockOffset] = useState(0);

    useEffect(() => {
        async function syncTime() {
            try {
                const clientSendTime = Date.now();
                const response = await fetch('/api/time');
                const data = await response.json();

                const clientReceiveTime = Date.now();
                const serverTime = new Date(data.serverTime).getTime();

                const latency = (clientReceiveTime - clientSendTime) / 2;
                const estimatedServerTimeAtSend = serverTime - latency;
                const offset = estimatedServerTimeAtSend - clientSendTime;

                setClockOffset(offset);

            } catch (error) {
                console.error("Failed to sync time:", error);
            }
        }

        syncTime();
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            const correctedTime = new Date(Date.now() + clockOffset);
            setCurrentTime(correctedTime);
        }, 1000);

        return () => clearInterval(timerId);
    }, [clockOffset]);

    return (
        <div className='text-7xl font-mono'>
            {formatTime(currentTime)}
        </div>
    );
}