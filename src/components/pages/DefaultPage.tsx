import Clock from "../clock/Clock";
import Notes from "../notes/Notes";

export default function DefaultPage() {
    return (
        <>
            <div className="lg:hidden flex h-screen items-center justify-center p-8 bg-gray-900">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Kinetika' }}>
                        Screen Too Small
                    </h1>
                    <p className="text-lg text-gray-300" style={{ fontFamily: 'Kinetika' }}>
                        This website only works well on desktop screens.
                    </p>
                    <p className="text-lg text-gray-300 mt-2" style={{ fontFamily: 'Kinetika' }}>
                        Please use it on a bigger screen.
                    </p>
                </div>
            </div>

            <div className="hidden lg:flex h-screen p-4 justify-center items-center gap-8">
                <div className="flex flex-col items-center text-4xl m-8 gap-8">
                    <Clock fontSize={180} />
                    <Notes fontSize={36}/>
                </div>
            </div>
        </>
    );
}
