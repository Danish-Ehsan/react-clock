import { useState, useEffect, useRef } from "react";
import "styles/Clock.scss";

export default function Clock({
    date,
    timeHue,
    alarmRinging,
    setAlarmRinging
}) {
    const clockRef = useRef(null);
    const secondsRotations = useRef(0);
    const minutesRotations = useRef(0);
    const hoursRotations = useRef(0);

    const secondsDeg =
        secondsRotations.current * 360 + date.getSeconds() * (360 / 60);
    const minutesDeg =
        minutesRotations.current * 360 + date.getMinutes() * (360 / 60);
    const hoursDeg =
        hoursRotations.current * 720 +
        date.getHours() * (360 / 12) +
        date.getMinutes() * (360 / (60 * 12));

    useEffect(() => {
        const clockColor = clockRef.current.style.setProperty(
            "--bg-hue",
            timeHue
        );

        //When clock needles are completing a full circle, the css rotation degrees need to advance instead of resetting to 0 so the needle doesn't go backwards a full rotation
        //This needs to happen after the render so it doesn't prematurely set the rotation ahead.
        if (date.getSeconds() === 59) {
            secondsRotations.current++;
        }

        if (date.getMinutes() === 59 && date.getSeconds() === 59) {
            minutesRotations.current++;
        }

        if (
            date.getHours() === 23 &&
            date.getMinutes() === 59 &&
            date.getSeconds() === 59
        ) {
            hoursRotations.current++;
        }
    });

    return (
        <div className={alarmRinging ? "clock alarm" : "clock"} ref={clockRef}>
            {alarmRinging && (
                <button
                    className="clock__snooze"
                    onClick={() => {
                        console.log("snoozing");
                        setAlarmRinging(false);
                    }}
                >
                    Dismiss
                </button>
            )}
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
