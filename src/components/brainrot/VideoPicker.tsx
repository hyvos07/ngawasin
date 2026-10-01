import { useState } from "react";
import { ListVideo, Shuffle, X } from "lucide-react";
import { BRAINROT_VIDEOS, pickRandomVideo, type BrainrotVideo } from "./videos";

interface VideoPickerProps {
    current: BrainrotVideo;
    onSelect: (video: BrainrotVideo) => void;
}

const categories = [...new Set(BRAINROT_VIDEOS.map((video) => video.category))];

export default function VideoPicker({ current, onSelect }: VideoPickerProps) {
    const [open, setOpen] = useState(false);

    const choose = (video: BrainrotVideo) => {
        onSelect(video);
        setOpen(false);
    };

    // Avoid "shuffling" back into the video that's already playing.
    const shuffle = () => choose(pickRandomVideo({ excludeId: current.id }));

    return (
        <div className="absolute inset-0 z-20 pointer-events-none">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                // Only visible while hovering the video (or while the list is open) so it doesn't cover it.
                className={`pointer-events-auto absolute top-2 right-2 grid place-items-center w-8 h-8 rounded-full bg-black/45 text-white/85 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus-visible:opacity-100 cursor-pointer ${open ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                aria-label={open ? "Close categories" : "Choose category"}
                title={open ? "Close categories" : "Choose category"}
            >
                {open ? <X size={16} strokeWidth={1.75} /> : <ListVideo size={16} strokeWidth={1.75} />}
            </button>

            {open && (
                <div className="pointer-events-auto absolute inset-x-2 top-12 max-h-[calc(100%-3.5rem)] overflow-y-auto overlay-scroll rounded-lg bg-black/75 text-white backdrop-blur-md p-2 text-sm">
                    <button
                        type="button"
                        onClick={shuffle}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/10 cursor-pointer"
                    >
                        <Shuffle size={14} strokeWidth={1.75} />
                        Random
                    </button>

                    <div className="my-1 h-px bg-white/10" />

                    {categories.map((category) => {
                        const active = category === current.category;
                        return (
                            <button
                                key={category}
                                type="button"
                                // Re-picking the current category swaps to another video in it.
                                onClick={() => choose(pickRandomVideo({ category, excludeId: current.id }))}
                                className={`w-full rounded-md px-2 py-1.5 text-left cursor-pointer ${active ? "bg-white/20" : "hover:bg-white/10"}`}
                                aria-current={active}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
