import Clock from "../clock/Clock";
import Notes from "../notes/Notes";

export default function BrainrotPage() {
    return (
        <>
            {/* Small screen warning - shown on mobile/small tablets */}
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

            {/* Main content - shown on large screens (1024px+) */}
            <div className="hidden lg:flex h-screen p-4 justify-center items-center gap-12">
                <div className="flex flex-col items-center text-4xl m-8 gap-8">
                    <Clock fontSize={200} />
                    <Notes fontSize={36} />
                </div>

                <div className="flex flex-col items-center">
                    <iframe
                        width="354"
                        height="630"
                        src="https://www.youtube.com/embed/tCBOhczn6Ok?si=zWs7zSM_Tbqs1X2D&autoplay=1&loop=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&vq=hd1080"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                    ></iframe>
                </div>
            </div>
        </>
    );
}
