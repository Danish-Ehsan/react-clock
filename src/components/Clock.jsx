import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "styles/Clock.scss";

export default function Clock({
    date,
    timeHue,
    activeAlarms,
    setActiveAlarms
}) {
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

    const alarmDisplay = (
        <div className="clock__alarm">
            <div className="clock__alarm__title">
                {activeAlarms.length > 1 ? "Alarms:" : "Alarm:"}
            </div>
            <ul className="clock__alarm__list">
                {activeAlarms.map((alarm) => {
                    return <li key={alarm.name}>{alarm.name}</li>;
                })}
            </ul>
        </div>
    );

    const dismissButton = (
        <button
            className="clock__snooze"
            onClick={() => {
                setActiveAlarms([]);
            }}
        >
            Dismiss
        </button>
    );

    return (
        <motion.div
            className={activeAlarms.length ? "clock alarm" : "clock"}
            //if duration is 1 second when seconds reach back to 0 the colors rapidly cycle back to the start
            animate={{
                "--bg-hue": timeHue,
                transition: { duration: date.getSeconds() === 0 ? 0 : 1 }
            }}
        >
            {activeAlarms.length > 0 && alarmDisplay}
            {activeAlarms.length > 0 && dismissButton}
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
        </motion.div>
    );
}
