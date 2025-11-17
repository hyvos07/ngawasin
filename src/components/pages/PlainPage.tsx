import Clock from "../clock/Clock";

export default function DefaultPage() {
    return (
        <>
            <div className="md:hidden flex h-screen items-center justify-center p-8 bg-gray-900">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Kinetika' }}>
                        Screen Too Small
                    </h1>
                    <p className="text-lg text-gray-300 mt-2" style={{ fontFamily: 'Kinetika' }}>
                        Please rotate or change your device <br/>if this message still appears.
                    </p>
                </div>
            </div>
            <div className="hidden md:flex h-screen justify-center items-center">
                <div className="flex flex-col items-center">
                    <Clock fontSize={180} />
                </div>
            </div>
        </>
    );
}
