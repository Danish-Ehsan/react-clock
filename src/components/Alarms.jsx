import { useState, useRef } from "react";
import AlarmRow from "components/AlarmRow";
import "styles/Alarm.scss";

export default function Alarms({ alarms, setAlarms }) {
    const [newAlarmTime, setNewAlarmTime] = useState("12:00");
    const [newAlarmName, setNewAlarmName] = useState("");
    const alarmNameRef = useRef(null);

    function removeAlarm(alarmName) {
        const nextAlarms = alarms.filter((alarm) => {
            if (alarm.name !== alarmName) {
                return alarm;
            }
        });

        setAlarms(nextAlarms);
        alarmNameRef.current.setCustomValidity("");

        localStorage.alarms = JSON.stringify(nextAlarms);
    }

    function checkAlarmExists(alarmName) {
        let nameCheck = false;

        alarms.forEach((alarm) => {
            if (alarm.name.toLowerCase() === alarmName.toLowerCase()) {
                nameCheck = true;
            }
        });

        return nameCheck;
    }

    function updateAlarm(alarmName, newAlarm) {
        const nextAlarms = alarms.map((alarm) => {
            if (alarm.name !== alarmName) {
                return alarm;
            } else {
                return newAlarm;
            }
        });

        setAlarms(nextAlarms);

        localStorage.alarms = JSON.stringify(nextAlarms);
    }

    const alarmsList = alarms.map((alarm) => {
        return (
            <AlarmRow
                key={alarm.name}
                alarm={alarm}
                removeAlarm={removeAlarm}
                updateAlarm={updateAlarm}
                checkAlarmExists={checkAlarmExists}
            />
        );
    });

    const alarmsListElement = (
        <div className="alarms__list-cont">
            <h2 className="heading--sm">Alarms</h2>
            <table className="alarms__table">
                <tbody>{alarmsList}</tbody>
            </table>
        </div>
    );

    return (
        <div className="alarms__cont">
            <form
                className="alarms__set"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (checkAlarmExists(newAlarmName)) {
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

                    const nextAlarms = [
                        ...alarms,
                        { name: newAlarmName, date: newAlarmDate }
                    ];

                    setAlarms(nextAlarms);

                    localStorage.alarms = JSON.stringify(nextAlarms);

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
