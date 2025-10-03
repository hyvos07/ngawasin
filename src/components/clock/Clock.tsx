import { useState } from 'react';

export default function Clock() {
    let time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const [ctime, setTime] = useState(time);
    
    const UpdateTime = () => {
        time = new Date().toLocaleTimeString('en-US', { hour12: false });
        setTime(time);
    };
    setInterval(UpdateTime, 500);

    return (
        <div className='text-[180px] font-bold' style={{ fontFamily: 'Kinetika' }}>
            {ctime}
        </div>
    );
}