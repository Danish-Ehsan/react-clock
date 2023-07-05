import { useEffect, useRef } from "react";
import "styles/Clock.scss";

export default function Clock({ date, timeHue }) {
    const clockRef = useRef(null);
    const hoursDeg =
        date.getHours() * (360 / 12) + date.getMinutes() * (360 / (60 * 12));
    const minutesDeg = date.getMinutes() * (360 / 60);
    const secondsDeg = date.getSeconds() * (360 / 60);

    useEffect(() => {
        const clockColor = clockRef.current.style.setProperty(
            "--bg-color",
            `hsl(${timeHue}, 30%, 30%)`
        );
    });

    return (
        <div className="clock" ref={clockRef}>
            <div className="clock__bkg"></div>
            <div
                className="clock__hours"
                style={{ transform: `translateY(-40%) rotate(${hoursDeg}deg)` }}
            ></div>
            <div
                className="clock__minutes"
                style={{
                    transform: `translateY(-40%) rotate(${minutesDeg}deg)`
                }}
            ></div>
            <div
                className="clock__seconds"
                style={{
                    transform: `translateY(-40%) rotate(${secondsDeg}deg)`
                }}
            ></div>
        </div>
    );
}
