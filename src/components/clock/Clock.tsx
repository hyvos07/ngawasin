import { useState } from 'react';

export default function Clock({ fontSize }: { fontSize: number }) {
    let time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const [ctime, setTime] = useState(time);

    const UpdateTime = () => {
        time = new Date().toLocaleTimeString('en-US', { hour12: false });
        setTime(time);
    };
    setInterval(UpdateTime, 500);

    return (
        <div className="font-bold tabular-nums" style={{ fontFamily: 'Kinetika', fontSize: `${fontSize}px`, fontVariantNumeric: 'tabular-nums' }}>
            {ctime}
        </div>
    );
}