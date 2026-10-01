export type Orientation = "portrait" | "landscape";

export interface BrainrotVideo {
    id: string;
    category: string;
    // What the video actually is, so the list stays maintainable without opening each link.
    note: string;
    duration: string;
    orientation: Orientation;
}

// All entries were checked to be 30+ minutes long and embeddable at the time of adding.
// Landscape videos get center-cropped to fill the portrait player.
export const BRAINROT_VIDEOS: BrainrotVideo[] = [
    // Minecraft parkour
    {
        id: "-lVgihPljuI",
        category: "Minecraft Parkour",
        note: "Orbital - No Copyright Gameplay: Minecraft parkour, vertical, no commentary",
        duration: "1:04:47",
        orientation: "portrait",
    },
    {
        id: "vL7xADaAWlo",
        category: "Minecraft Parkour",
        note: "Orbital - No Copyright Gameplay: Minecraft parkour, vertical, no commentary",
        duration: "1:33:28",
        orientation: "portrait",
    },
    {
        id: "fw_eWpb7uCE",
        category: "Minecraft Parkour",
        note: "Orbital - No Copyright Gameplay: Minecraft parkour 4 hours, vertical, no commentary",
        duration: "4:53:37",
        orientation: "portrait",
    },

    // Subway Surfers
    {
        id: "hJcv2nZ8x84",
        category: "Subway Surfers",
        note: "OrbitalNCG+: Subway Surfers run, vertical, no commentary",
        duration: "1:16:10",
        orientation: "portrait",
    },
    {
        id: "zZ7AimPACzc",
        category: "Subway Surfers",
        note: "ImNotRU: Subway Surfers 1 hour run, no commentary, free to use",
        duration: "59:39",
        orientation: "portrait",
    },
    {
        id: "wOPAA823UWI",
        category: "Subway Surfers",
        note: "OrbitalNCG+: Subway Surfers run, vertical, no commentary",
        duration: "1:03:40",
        orientation: "portrait",
    },

    // GTA V custom maps (mega ramp / car stunts)
    {
        id: "8AbzpjCM21E",
        category: "GTA V Mega Ramp",
        note: "OrbitalNCG+: GTA 5 mega ramp car stunts, vertical, no commentary",
        duration: "1:16:57",
        orientation: "portrait",
    },
    {
        id: "TnRGGKuayD4",
        category: "GTA V Mega Ramp",
        note: "OrbitalNCG+: GTA 5 mega ramp car stunts, vertical, no commentary",
        duration: "1:00:00",
        orientation: "portrait",
    },

    // Roblox obby
    {
        id: "wQ7WgNBpufo",
        category: "Roblox Obby",
        note: "OrbitalNCG+: Roblox parkour obby, vertical, no commentary",
        duration: "1:06:21",
        orientation: "portrait",
    },
    {
        id: "nh4FTPiDwpM",
        category: "Roblox Obby",
        note: "Bloxu: Roblox 'The Dropper' obby, vertical, no commentary, free to use",
        duration: "41:00",
        orientation: "portrait",
    },
    {
        id: "P1IBlfcUSas",
        category: "Roblox Obby",
        note: "OrbitalNCG+: Roblox parkour obby, vertical, no commentary",
        duration: "1:29:07",
        orientation: "portrait",
    },

    // Chinese short drama (vertical, hardcoded English subs so it works while muted)
    {
        id: "EkZOINQ1Tpg",
        category: "Chinese Drama",
        note: "Drama Shop: [ENG SUB] CEO treated Cinderella coldly for 3 years, regrets it after divorce, full movie",
        duration: "2:36:43",
        orientation: "portrait",
    },
    {
        id: "Ga90fEAecXk",
        category: "Chinese Drama",
        note: "Drama Bloom: [ENG SUB] capable secretary and cold CEO workplace romance, full movie",
        duration: "3:12:58",
        orientation: "portrait",
    },
    {
        id: "epOuI-JoArw",
        category: "Chinese Drama",
        note: "Twilight Drama Dreams: [ENG SUB] mischievous kid Lele softens the icy CEO and his family, full movie",
        duration: "2:02:35",
        orientation: "portrait",
    },

    // Satisfying ASMR
    {
        id: "etp46Aca_UM",
        category: "Satisfying ASMR",
        note: "Sand Cutting ASMR: 1 hour kinetic sand cutting compilation",
        duration: "1:10:13",
        orientation: "landscape",
    },
    {
        id: "XiyI9XxG7LE",
        category: "Satisfying ASMR",
        note: "ASMR SOAP VERTICAL: soap cutting and glitter foam, fullscreen 9:16, no talking",
        duration: "3:04:00",
        orientation: "portrait",
    },
];

export function videosInCategory(category: string): BrainrotVideo[] {
    return BRAINROT_VIDEOS.filter((video) => video.category === category);
}

// Picks from the whole list or one category, skipping `excludeId` unless it's the only option.
export function pickRandomVideo({ category, excludeId }: { category?: string; excludeId?: string } = {}): BrainrotVideo {
    const pool = category ? videosInCategory(category) : BRAINROT_VIDEOS;
    const others = pool.filter((video) => video.id !== excludeId);
    const candidates = others.length > 0 ? others : pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
}
