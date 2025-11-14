import { useState, useEffect } from 'react';

export default function Clock({ fontSize }: { fontSize: number }) {
    const [ctime, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

    useEffect(() => {
        const UpdateTime = () => {
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            setTime(time);
        };
        
        const interval = setInterval(UpdateTime, 500);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-bold tabular-nums" style={{ fontFamily: 'Kinetika', fontSize: `${fontSize}px`, fontVariantNumeric: 'tabular-nums' }}>
            {ctime}
        </div>
    );
}