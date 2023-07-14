import { useState } from "react";

export default function AlarmRow({ alarm }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <tr>
            <td>{alarm.date.toLocaleTimeString([], { timeStyle: "short" })}</td>
            <td>{alarm.name}</td>
            <td>
                {/* <button>Edit</button> */}
                <button
                    className="button--sm button--delete"
                    onClick={() => {
                        removeAlarm(alarm.name);
                        alarmNameRef.current.setCustomValidity("");
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
