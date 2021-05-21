
import React from 'react';
import './App.css';

function NumberLarge(props) { // clock numbers 1,3,6,9
    const deg = {
        transform: `rotate(${props.deg}deg)`
    }
    const degReverse = {
        transform: `rotate(-${props.deg}deg)`
    }
    return (
        <div className="number lg" style={deg}>
            <span style={degReverse}>{props.number}</span>
        </div>
    );
}

function NumberSmall(props) { // other clock numbers
    const deg = {
        transform: `rotate(${props.deg}deg)`
    }

    return (
        <div className="number sm" style={deg}></div>
    );
}

function ArrowSecond(props) {
    return (
        <div className="arrow arrow-s" style={props.style}></div>
    );
}
function ArrowMinute(props) {
    return (
        <div className="arrow arrow-m" style={props.style}></div>
    );
}
function ArrowHour(props) {
    return (
        <div className="arrow arrow-h" style={props.style}></div>
    );
}

class Circle extends React.Component { // parent component
    iterval;
    smallNumberDeg = [30, 60, 120, 150, 210, 240, 300, 330];
    degArr = [];
    state = {
        secondAngle: {
            transform: ''
        },
        minuteAngle: {
            style: {
                transform: ''
            }
        },
        HourAngle: {
            style: {
                transform: ''
            }
        }
    }
    constructor() {
        super();
        for (let val of this.smallNumberDeg)
            this.degArr.push(<NumberSmall deg={val} key={val} />)
    }
    setMinuteArrow(time) { // set minutes arrow position
        this.setState(
            {
                minuteAngle: {
                    transform: `rotate(${time.getMinutes() * 6}deg)`
                }
            }
        )
    }
    setHourArrow(time) { // set hours arrow position
        this.setState(
            {
                hourAngle: {
                    transform: `rotate(${time.getHours() * 30 + time.getMinutes() / 2}deg)`
                }
            }
        )
    }
    componentDidMount() {
        let time = new Date(); // start setup arrows position
        this.setMinuteArrow(time);
        this.setHourArrow(time);
        this.interval = setInterval(() => {
            let time = new Date();
            this.setState( // set second arrow position (1 time per second)
                {
                    secondAngle: {
                        transform: `rotate(${time.getSeconds() * 6}deg)`
                    }
                })
            if (time.getSeconds() === 0) { // set minute arrow position (1 time per minute)
                this.setMinuteArrow(time);
            }
            if (time.getMinutes() % 5 === 0) { // set hour arrow position (1 time per 5 minutes)
                this.setHourArrow(time);
            }
        }, 1000);
    }
    componentDidUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        return (
            <div className="circle">
                <img className="matterhorn" src="/img/matterhorn.png" alt="Matterhorn"></img>
                <NumberLarge number="XII" deg="0" />
                <NumberLarge number="III" deg="90" />
                <NumberLarge number="VI" deg="180" />
                <NumberLarge number="IX" deg="270" />
                {this.degArr}
                <ArrowSecond style={this.state.secondAngle} />
                <ArrowMinute style={this.state.minuteAngle} />
                <ArrowHour style={this.state.hourAngle} />
            </div>
        );
    }
}

function App() {

    return (
        <Circle />
    );
}

export default App;
