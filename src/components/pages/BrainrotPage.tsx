import { useEffect, useState } from "react";
import VideoPicker from "../brainrot/VideoPicker";
import YouTubeShort from "../brainrot/YouTubeShort";
import { pickRandomVideo, videosInCategory, type BrainrotVideo } from "../brainrot/videos";
import Clock from "../clock/Clock";
import Notes from "../notes/Notes";

const PLAYER_WIDTH = 354;
const PLAYER_HEIGHT = 630;

export default function BrainrotPage() {
    const [video, setVideo] = useState<BrainrotVideo | null>(null);

    // Picked after mount so the server-rendered HTML and the hydrated client agree.
    useEffect(() => {
        setVideo(pickRandomVideo());
    }, []);

    // When a video finishes, move on to a different one from the same category.
    // Categories with a single video just replay it.
    const playNextInCategory =
        video && videosInCategory(video.category).length > 1
            ? () => setVideo(pickRandomVideo({ category: video.category, excludeId: video.id }))
            : undefined;

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

            <div className="hidden lg:flex h-screen p-4 justify-center items-center gap-12">
                <div className="flex flex-col items-center text-4xl m-8 gap-8">
                    <Clock fontSize={200} />
                    <Notes fontSize={36} />
                </div>

                <div className="flex flex-col items-center">
                    {video ? (
                        <div className="relative">
                            <YouTubeShort
                                videoId={video.id}
                                orientation={video.orientation}
                                width={PLAYER_WIDTH}
                                height={PLAYER_HEIGHT}
                                onEnded={playNextInCategory}
                            />
                            <VideoPicker current={video} onSelect={setVideo} />
                        </div>
                    ) : (
                        <div
                            className="rounded-lg shadow-lg bg-black"
                            style={{ width: PLAYER_WIDTH, height: PLAYER_HEIGHT }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
