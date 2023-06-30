import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(new Date());
    const [timeRunning, setTimeRunning] = useState(true);
    const timeInterval = useRef(null);
    const timeHue = time.getSeconds() * (360 / 60);

    useEffect(() => {
        console.log("effect running");

        if (timeRunning) {
            timeInterval.current = setInterval(() => {
                setTime(new Date());
            }, 1000);
        }

        return () => {
            clearInterval(timeInterval.current);
        };
    }, [timeRunning]);

    return (
        <>
            <h2 style={{ color: `hsl(${timeHue}, 50%, 50%)` }}>
                Time: {time.toLocaleTimeString()}
            </h2>
            <button
                style={{ marginTop: "10px" }}
                onClick={() => {
                    console.log("stop time");
                    console.log(timeInterval.current);
                    setTimeRunning(false);
                }}
            >
                Stop Time
            </button>
            <button
                style={{ marginLeft: "15px" }}
                onClick={() => {
                    setTimeRunning(true);
                }}
            >
                Resume Time
            </button>
        </>
    );
}

export default App;
