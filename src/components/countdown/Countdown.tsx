import { useState, useEffect } from 'react';
import Notes from '../notes/Notes';

interface CountdownProps {
    targetDate: Date;
}

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
}

export default function Countdown({ targetDate }: CountdownProps) {
    const calculateTimeRemaining = (): TimeRemaining => {
        const now = new Date().getTime();
        const target = targetDate.getTime();
        const difference = target - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, isExpired: false };
    };

    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining());

    const isAtZero = (timeRemaining.days === 0 &&
        timeRemaining.hours === 0 &&
        timeRemaining.minutes === 0 &&
        timeRemaining.seconds === 0) || timeRemaining.isExpired;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        if (date.getSeconds() === 0) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        }

        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    return (
        <div className={`flex flex-col items-center gap-8 ${isAtZero ? 'fixed inset-0 bg-red-600 justify-center' : ''}`}>
            {!isAtZero &&
                <div className="text-center">
                    <h1 className={`text-3xl font-bold ${isAtZero ? 'text-white' : ''}`} style={{ fontFamily: 'Kinetika' }}>
                        Countdown to {formatTime(targetDate)} on {formatDate(targetDate)}
                    </h1>
                </div>}

            <div className="flex items-center justify-center gap-16">
                {timeRemaining.days > 0 && (
                    <>
                        <div className="text-center">
                            <div className={`text-9xl font-bold tabular-nums ${isAtZero ? 'text-white' : ''}`} style={{ fontFamily: 'Kinetika', fontSize: '200px' }}>
                                {timeRemaining.days}
                            </div>
                            <div className={`text-3xl mt-4 ${isAtZero ? 'text-white' : 'text-gray-400'}`} style={{ fontFamily: 'Kinetika' }}>
                                days
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-9xl font-bold ${isAtZero ? 'text-white' : 'text-gray-600'}`} style={{ fontFamily: 'Kinetika', fontSize: '150px' }}>
                                :
                            </div>
                            <div className="text-3xl mt-4" style={{ visibility: 'hidden' }}>
                                .
                            </div>
                        </div>
                    </>
                )}

                {(timeRemaining.hours > 0 || timeRemaining.days > 0) && (
                    <>
                        <div className="text-center">
                            <div className={`text-9xl font-bold tabular-nums ${isAtZero ? 'text-white' : ''}`} style={{ fontFamily: 'Kinetika', fontSize: '200px' }}>
                                {timeRemaining.hours}
                            </div>
                            <div className={`text-3xl mt-4 ${isAtZero ? 'text-white' : 'text-gray-400'}`} style={{ fontFamily: 'Kinetika' }}>
                                hours
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-9xl font-bold ${isAtZero ? 'text-white' : 'text-gray-600'}`} style={{ fontFamily: 'Kinetika', fontSize: '150px' }}>
                                :
                            </div>
                            <div className="text-3xl mt-4" style={{ visibility: 'hidden' }}>
                                .
                            </div>
                        </div>
                    </>
                )}

                {(timeRemaining.minutes > 0 || timeRemaining.hours > 0 || timeRemaining.days > 0) && (
                    <>
                        <div className="text-center">
                            <div className={`text-9xl font-bold tabular-nums ${isAtZero ? 'text-white' : ''}`} style={{ fontFamily: 'Kinetika', fontSize: '200px' }}>
                                {String(timeRemaining.minutes).padStart(2, '0')}
                            </div>
                            <div className={`text-3xl mt-4 ${isAtZero ? 'text-white' : 'text-gray-400'}`} style={{ fontFamily: 'Kinetika' }}>
                                minutes
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-9xl font-bold ${isAtZero ? 'text-white' : 'text-gray-600'}`} style={{ fontFamily: 'Kinetika', fontSize: '150px' }}>
                                :
                            </div>
                            <div className="text-3xl mt-4" style={{ visibility: 'hidden' }}>
                                .
                            </div>
                        </div>
                    </>
                )}

                <div className="text-center">
                    <div className={`text-9xl font-bold tabular-nums ${isAtZero ? 'text-white' : ''}`} style={{ fontFamily: 'Kinetika', fontSize: '200px' }}>
                        {timeRemaining.seconds < 10 ? timeRemaining.seconds : String(timeRemaining.seconds).padStart(2, '0')}
                    </div>
                    <div className={`text-3xl mt-4 ${isAtZero ? 'text-white' : 'text-gray-400'}`} style={{ fontFamily: 'Kinetika' }}>
                        seconds
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {isAtZero ? (
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Kinetika' }}>
                            Countdown Finished!
                        </h2>
                    </div>
                ) : (
                    <Notes fontSize={32} />
                )}
            </div>

			<div className="hidden lg:block fixed bottom-8 left-8">
				<a 
					href="/countdown" 
					className="px-6 py-3 text-xl font-bold bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
					style={{ fontFamily: 'Kinetika' }}
				>
					← 
					<div className="ml-2 inline" style={{ fontFamily: 'Kinetika' }}>
						New Countdown
					</div>
				</a>
			</div>
        </div>
    );
}
