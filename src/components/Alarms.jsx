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
    }

    function checkAlarmExists(alarms, alarmName) {
        let nameCheck = false;

        alarms.forEach((alarm) => {
            if (alarm.name === alarmName) {
                nameCheck = true;
            }
        });

        return nameCheck;
    }

    const alarmsList = alarms.map((alarm) => {
        return <AlarmRow key={alarm.name} alarm={alarm} />;
    });

    const alarmsListElement = (
        <div className="alarms__list-cont">
            <h2 className="heading--sm">Alarms</h2>
            <table className="alarms__table">
                <tbody>{alarmsList}</tbody>
            </table>
        </div>
    );

    //console.log("newalarm", newAlarm);

    return (
        <div className="alarms__cont">
            <form
                className="alarms__set"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (checkAlarmExists(alarms, newAlarmName)) {
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
