import { useState } from "react";
import "styles/Alarm.scss";

export default function Alarms({ alarms, setAlarms }) {
    const [newAlarm, setNewAlarm] = useState("12:00");

    const alarmsList = alarms.map((date) => {
        return (
            <li key={date.toLocaleTimeString()}>
                {date.toLocaleTimeString([], { timeStyle: "short" })}
            </li>
        );
    });

    console.log("newalarm", newAlarm);

    return (
        <div className="alarms__cont">
            <form
                className="alarms__set"
                onSubmit={(e) => {
                    e.preventDefault();
                    const newAlarmDate = new Date();
                    const [hours, minutes] = newAlarm.split(":");

                    newAlarmDate.setHours(hours);
                    newAlarmDate.setMinutes(minutes);
                    newAlarmDate.setSeconds(0);

                    setAlarms([...alarms, newAlarmDate]);
                }}
            >
                <h2>Set Alarm</h2>
                <input
                    type="time"
                    value={newAlarm}
                    onInput={(e) => {
                        setNewAlarm(e.target.value);
                    }}
                    required
                />
                <button>Add</button>
            </form>
            <div className="alarms__list-cont">
                <h2>Alarms</h2>
                <ul className="alarms__list">{alarmsList}</ul>
            </div>
        </div>
    );
}
