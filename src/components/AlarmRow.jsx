import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function AlarmRow({
    alarm,
    removeAlarm,
    updateAlarm,
    checkAlarmExists
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newAlarmName, setNewAlarmName] = useState(alarm.name);
    const [newAlarmTime, setNewAlarmTime] = useState(
        alarm.date.toLocaleTimeString([], { timeStyle: "short", hour12: false })
    );
    const newAlarmNameRef = useRef(null);

    return (
        <motion.tr
            initial={{ opacity: 0, x: 50 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: { type: "easeOut" }
            }}
            exit={{ opacity: 0, x: 50 }}
        >
            <td>
                {isEditing ? (
                    <input
                        type="time"
                        value={newAlarmTime}
                        onInput={(e) => {
                            setNewAlarmTime(e.target.value);
                        }}
                        required
                    />
                ) : (
                    alarm.date.toLocaleTimeString([], { timeStyle: "short" })
                )}
            </td>

            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={newAlarmName}
                        ref={newAlarmNameRef}
                        onInput={(e) => {
                            newAlarmNameRef.current.setCustomValidity("");
                            setNewAlarmName(e.target.value);
                        }}
                        required
                    />
                ) : (
                    alarm.name
                )}
            </td>
            <td>
                <button
                    className="button--sm button--edit"
                    onClick={() => {
                        if (isEditing) {
                            if (
                                alarm.name.toLowerCase() !==
                                    newAlarmName.toLowerCase() &&
                                checkAlarmExists(newAlarmName)
                            ) {
                                newAlarmNameRef.current.setCustomValidity(
                                    "This name already exists"
                                );
                                newAlarmNameRef.current.reportValidity();
                                return;
                            }

                            const newAlarmDate = new Date();
                            const [hours, minutes] = newAlarmTime.split(":");

                            newAlarmDate.setHours(hours);
                            newAlarmDate.setMinutes(minutes);
                            newAlarmDate.setSeconds(0);

                            updateAlarm(alarm.name, {
                                name: newAlarmName,
                                date: newAlarmDate
                            });
                        }

                        setIsEditing((editing) => !editing);
                    }}
                >
                    {isEditing ? "Done" : "Edit"}
                </button>
                <button
                    className="button--sm button--delete"
                    onClick={() => {
                        removeAlarm(alarm.name);
                    }}
                >
                    Delete
                </button>
            </td>
        </motion.tr>
    );
}
