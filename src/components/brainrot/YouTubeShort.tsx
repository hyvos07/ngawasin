import { useEffect, useRef, useState } from "react";

interface YouTubeShortProps {
    videoId: string;
    width: number;
    height: number;
}

interface YTPlayer {
    playVideo(): void;
    mute(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    loadVideoById(videoId: string): void;
    destroy(): void;
}

interface YTNamespace {
    Player: new (
        element: HTMLElement,
        options: {
            videoId: string;
            width: number;
            height: number;
            playerVars: Record<string, string | number>;
            events: {
                onReady: () => void;
                onStateChange: (event: { data: number }) => void;
                onError: () => void;
            };
        },
    ) => YTPlayer;
}

declare global {
    interface Window {
        YT?: YTNamespace;
        onYouTubeIframeAPIReady?: () => void;
    }
}

const STATE_ENDED = 0;
const STATE_PLAYING = 1;
const STATE_PAUSED = 2;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;
// YouTube draws its title bar, logo and end screen at the top/bottom edge of the iframe.
// Making the iframe taller than the visible box pushes them into letterbox bars that get clipped.
const CROP_PX = 90;

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (apiPromise) return apiPromise;

    apiPromise = new Promise((resolve) => {
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            previous?.();
            resolve(window.YT as YTNamespace);
        };
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
    });
    return apiPromise;
}

export default function YouTubeShort({ videoId, width, height }: YouTubeShortProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        let player: YTPlayer | null = null;
        let cancelled = false;
        let retries = 0;
        let retryTimer: ReturnType<typeof setTimeout> | undefined;

        // The API replaces the target element with an iframe, so give it a
        // throwaway child to avoid React losing track of its own node.
        const target = document.createElement("div");
        mountRef.current?.appendChild(target);

        loadYouTubeApi().then((YT) => {
            if (cancelled) return;
            player = new YT.Player(target, {
                videoId,
                width,
                height: height + CROP_PX * 2,
                playerVars: {
                    autoplay: 1,
                    mute: 1, // browsers only allow autoplay when muted
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    rel: 0,
                    loop: 1,
                    playlist: videoId, // required for loop to work on a single video
                    iv_load_policy: 3,
                    modestbranding: 1,
                    playsinline: 1,
                    origin: window.location.origin,
                },
                events: {
                    onReady: () => {
                        player?.mute();
                        player?.playVideo();
                    },
                    onStateChange: ({ data }) => {
                        if (data === STATE_PLAYING) {
                            setPlaying(true);
                        } else if (data === STATE_ENDED) {
                            player?.seekTo(0, true);
                            player?.playVideo();
                        } else if (data === STATE_PAUSED) {
                            player?.playVideo();
                        }
                    },
                    onError: () => {
                        if (retries >= MAX_RETRIES) return;
                        retries += 1;
                        retryTimer = setTimeout(() => player?.loadVideoById(videoId), RETRY_DELAY_MS);
                    },
                },
            });
        });

        return () => {
            cancelled = true;
            setPlaying(false);
            clearTimeout(retryTimer);
            player?.destroy();
            mountRef.current?.replaceChildren();
        };
    }, [videoId, width, height]);

    return (
        <div className="relative rounded-lg shadow-lg overflow-hidden bg-black" style={{ width, height }}>
            {/* Hidden until the first frame plays so YouTube's loading/play-button UI never shows. */}
            <div
                ref={mountRef}
                className="absolute left-0 transition-opacity duration-500"
                style={{ width, height: height + CROP_PX * 2, top: -CROP_PX, opacity: playing ? 1 : 0 }}
            />
            {/* Swallows all pointer input so the video can't be paused, skipped or navigated. */}
            <div
                className="absolute inset-0 z-10 cursor-default"
                onContextMenu={(e) => e.preventDefault()}
            />
        </div>
    );
}
