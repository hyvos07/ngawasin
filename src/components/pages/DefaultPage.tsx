import Clock from "../clock/Clock";

export default function DefaultPage() {
    return (
        <div className="flex h-screen p-4 justify-center items-center">
            <div className="flex-col text-4xl m-8">
                <Clock />
                tes
            </div>
            <div className="text-4xl m-8">
                <Clock />
                
            </div>
        </div>
    );
}
