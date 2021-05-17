
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

class Arrow extends React.Component { // clock arrow abstract class
    constructor(props) {
        super(props);
        this.state = {
            style: null
        };
    }

    refresh = 1000; // time to refresh (ms)

    move(time, force = false) { } // move clock arrow

    componentDidMount() {
        let time = new Date();
        this.move(time, true); // clock arrow start position
        let interval = setInterval(() => {
            let time = new Date();
            this.move(time); // move clock arrow
        }, this.refresh)
    }
}

class ArrowSecond extends Arrow {

    move(time) {
        let rotate = `rotate(${time.getSeconds() * 6}deg)`; // set arrow angle
        this.setState({
            style: {
                transform: rotate
            }
        });
    }

    render() {
        return (
            <div className="arrow arrow-s" style={this.state.style}></div>
        );
    }
}

class ArrowMinute extends Arrow {

    move(time, force = false) {
        let rotate = `rotate(${time.getMinutes() * 6}deg)`;
        if (time.getSeconds() === 0 || force)
            this.setState({
                style: {
                    transform: rotate
                }
            });
    }

    render() {
        return (
            <div className="arrow arrow-m" style={this.state.style}></div>
        );
    }
}

class ArrowHour extends Arrow {

    refresh = 60000; // time to refresh hour arrow position

    move(time, force) {
        let rotate = `rotate(${time.getHours() * 30 + time.getMinutes() / 2}deg)`;
        this.setState({
            style: {
                transform: rotate
            }
        });

        if (time.getMinutes() === 0 || force)
            this.setState({
                style: {
                    transform: rotate
                }
            });
    }
    
    render() {

        return (
            <div className="arrow arrow-h" style={this.state.style}></div>
        );
    }
}

function Circle() {
    let smallNumberDeg = [30, 60, 120, 150, 210, 240, 300, 330];
    let degArr = smallNumberDeg.map((val) => {
        return (<NumberSmall deg={val} key={val} />);
    })
    return (
        <div className="circle">
            <img className="matterhorn" src="/img/matterhorn.png" alt="Matterhorn"></img>
            <NumberLarge number="XII" deg="0" />
            <NumberLarge number="III" deg="90" />
            <NumberLarge number="VI" deg="180" />
            <NumberLarge number="IX" deg="270" />
            {degArr}
            <ArrowSecond />
            <ArrowMinute />
            <ArrowHour />
        </div>
    );
}

function App() {

    return (
        <Circle />
    );
}

export default App;
