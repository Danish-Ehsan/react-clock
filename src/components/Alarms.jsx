import { useState } from "react";
import "styles/Alarm.scss";

export default function Alarms({ alarms, setAlarms }) {
    const [newAlarmTime, setNewAlarmTime] = useState("12:00");
    const [newAlarmName, setNewAlarmName] = useState("");

    const alarmsList = alarms.map((alarm) => {
        return (
            <li key={alarm.name}>
                <span>
                    {alarm.date.toLocaleTimeString([], { timeStyle: "short" })}
                </span>
                <span>{alarm.name}</span>
                <button
                    className="button--sm button--delete"
                    onClick={() => {
                        removeAlarm(alarm.name);
                    }}
                >
                    Delete
                </button>
            </li>
        );
    });

    const alarmsListElement = (
        <div className="alarms__list-cont">
            <h2>Alarms</h2>
            <ul className="alarms__list">{alarmsList}</ul>
        </div>
    );

    function removeAlarm(alarmName) {
        const nextAlarms = alarms.filter((alarm) => {
            if (alarm.name !== alarmName) {
                return alarm;
            }
        });

        setAlarms(nextAlarms);
    }

    //console.log("newalarm", newAlarm);

    return (
        <div className="alarms__cont">
            <form
                className="alarms__set"
                onSubmit={(e) => {
                    e.preventDefault();
                    const newAlarmDate = new Date();
                    const [hours, minutes] = newAlarmTime.split(":");

                    newAlarmDate.setHours(hours);
                    newAlarmDate.setMinutes(minutes);
                    newAlarmDate.setSeconds(0);

                    setAlarms([
                        ...alarms,
                        { name: newAlarmName, date: newAlarmDate }
                    ]);
                }}
            >
                <h2>Set Alarm</h2>
                <div className="alarms__fields-cont">
                    <label>
                        <span className="alarms__label-text">Name:</span>
                        <input
                            id="name"
                            type="text"
                            value={newAlarmName}
                            onInput={(e) => {
                                setNewAlarmName(e.target.value);
                            }}
                        />
                    </label>
                    <label>
                        <span className="alarms__label-text">Time:</span>
                        <input
                            id="time"
                            type="time"
                            value={newAlarmTime}
                            onInput={(e) => {
                                setNewAlarmTime(e.target.value);
                            }}
                            required
                        />
                    </label>
                    <button className="button--sm">Add</button>
                </div>
            </form>
            {alarms.length > 0 && alarmsListElement}
        </div>
    );
}
