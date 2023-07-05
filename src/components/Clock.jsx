import "styles/Clock.scss";

export default function Clock({ date }) {
    const hoursDeg =
        date.getHours() * (360 / 12) + date.getMinutes() * (360 / (60 * 12));
    const minutesDeg = date.getMinutes() * (360 / 60);
    const secondsDeg = date.getSeconds() * (360 / 60);

    return (
        <div className="clock">
            <div className="clock__bkg"></div>
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
