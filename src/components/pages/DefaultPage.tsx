import Clock from "../clock/Clock";
import Notes from "../clock/Notes";

export default function DefaultPage() {
    return (
        <div className="flex h-screen p-4 justify-center items-center">
            <div className="flex flex-col items-center text-4xl m-8 gap-8">
                <Clock/>
                <Notes/>
            </div>
        </div>
    );
}
