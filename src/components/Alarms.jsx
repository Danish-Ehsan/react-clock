import { useState, useRef } from "react";
import "styles/Alarm.scss";

export default function Alarms({ alarms, setAlarms }) {
    const [newAlarmTime, setNewAlarmTime] = useState("12:00");
    const [newAlarmName, setNewAlarmName] = useState("");
    const alarmNameRef = useRef(null);

    const alarmsList = alarms.map((alarm) => {
        return (
            <tr key={alarm.name}>
                <td>
                    {alarm.date.toLocaleTimeString([], { timeStyle: "short" })}
                </td>
                <td>{alarm.name}</td>
                <td>
                    <button
                        className="button--sm button--delete"
                        onClick={() => {
                            removeAlarm(alarm.name);
                        }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    const alarmsListElement = (
        <div className="alarms__list-cont">
            <h2 className="heading--sm">Alarms</h2>
            <table className="alarms__table">{alarmsList}</table>
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

    function alarmNameExists(alarms, alarmName) {
        console.log("alarmNameExists firing");
        let nameCheck = false;

        alarms.forEach((alarm) => {
            if (alarm.name === alarmName) {
                nameCheck = true;
            }
        });

        return nameCheck;
    }

    //console.log("newalarm", newAlarm);

    return (
        <div className="alarms__cont">
            <form
                className="alarms__set"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (alarmNameExists(alarms, newAlarmName)) {
                        alarmNameRef.current.setCustomValidity(
                            "This name already exists"
                        );

                        alarmNameRef.current.reportValidity();

                        return;
                    }

                    const newAlarmDate = new Date();
                    const [hours, minutes] = newAlarmTime.split(":");

                    newAlarmDate.setHours(hours);
                    newAlarmDate.setMinutes(minutes);
                    newAlarmDate.setSeconds(0);

                    console.log("setting Alarms");

                    setAlarms([
                        ...alarms,
                        { name: newAlarmName, date: newAlarmDate }
                    ]);

                    setNewAlarmName("");
                }}
            >
                <h2 className="heading--sm">Set Alarm</h2>
                <div className="alarms__fields-cont">
                    <label>
                        <span className="alarms__label-text">Name:</span>
                        <input
                            id="name"
                            type="text"
                            value={newAlarmName}
                            ref={alarmNameRef}
                            onInput={(e) => {
                                setNewAlarmName(e.target.value);
                                e.target.setCustomValidity("");
                            }}
                            required
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
