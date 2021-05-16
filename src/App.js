
import React from 'react';
import './App.css';

function NumberLarge (props) {
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

function NumberSmall (props) {
    const deg = {
        transform: `rotate(${props.deg}deg)`
    }

    return (
        <div className="number sm" style={deg}></div>
    );
}

class ArrowSecond extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            style: {
                transform: `rotate(${this.getAngle()}deg)`
            }
        };
    }
    getAngle () {
        let time = new Date();
        return time.getSeconds() * 6;
    }
    componentDidMount () {
        let interval = setInterval (()=>{
            this.setState({
                style: {
                    transform: `rotate(${this.getAngle()}deg)`
                }
            });
        }, 1000);
        }
    render () {
        return (
            <div className="arrow arrow-s" style={this.state.style}></div>
        );
    }
}

class ArrowMinute extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            style: {
                transform: `rotate(${this.getAngle().angle}deg)`
            }
        }
    }
    getAngle () {
        let time = new Date();
        return {second: time.getSeconds(), angle: time.getMinutes() * 6};
    }
    componentDidMount () {
        let interval = setInterval (()=>{
            if (this.getAngle().second === 0) {
                this.setState({
                    style: {
                        transform: `rotate(${this.getAngle().angle}deg)`
                    }
                });
            }
        }, 1000);
        }
    render () {
        return (
            <div className="arrow arrow-m" style={this.state.style}></div>
        );
    }
}
class ArrowHour extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            style: {
                transform: `rotate(${this.getAngle().angle}deg)`
            }
        }
    }
    getAngle () {
        let time = new Date();
        let hour = time.getHours();
        hour = hour >= 12 ? hour - 12 : hour;
        return {minute: time.getMinutes(), angle: hour * 30 + time.getMinutes() / 2};
    }
    componentDidMount () {
        let interval = setInterval (()=>{
            if (this.getAngle().minute === 0) {
                this.setState({
                    style: {
                        transform: `rotate(${this.getAngle().angle}deg)`
                    }
                });
            }
        }, 60000);
        }
    render () {
        return (
            <div className="arrow arrow-h" style={this.state.style}></div>
        );
    }
}

function Circle() {
    let smallNumberDeg = [30, 60, 120, 150, 210, 240, 300, 330];
    let degArr = smallNumberDeg.map((val)=>{
        return (<NumberSmall deg={val} key={val}/>);
    })
console.log(degArr)
    return (
        <div className="circle">
            <img className="matterhorn" src="/img/matterhorn.png" alt="Matterhorn"></img>
            <NumberLarge number="XII" deg="0"/>
            <NumberLarge number="III" deg="90"/>
            <NumberLarge number="VI" deg="180"/>
            <NumberLarge number="IX" deg="270"/>
            {degArr}
            <ArrowSecond/>
            <ArrowMinute/>
            <ArrowHour/>
        </div>
    );
}

function App() {

    return (
        <Circle/>
    );
}

export default App;
