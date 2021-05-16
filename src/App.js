
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
        let time = new Date();
        this.state = {
            angle: time.getSeconds() * 6,
            style: {
                transform: `rotate(0deg)`
            }
        };
    }
    componentDidMount () {
        let interval = setInterval (()=>{
            this.setState({angle: this.state.angle + 6});
            if (this.state.angle > 360) this.setState({angle: 0});
            this.setState({style: {transform: `rotate(${this.state.angle}deg)`}});
            console.log(this.state.angle)
        }, 1000);
        }
    setAngle (angle) {
        this.setState({angle: angle});
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
        let time = new Date();
        this.state = {
            angle: time.getMinutes() * 6,
            style: {
                transform: `rotate(${time.getMinutes() * 6}deg)`
            }
        };
    }
    componentDidMount () {
        let interval = setInterval (()=>{
            this.setState({angle: this.state.angle + 6});
            if (this.state.angle > 360) this.setState({angle: 0});
            this.setState({style: {transform: `rotate(${this.state.angle}deg)`}})
            console.log(this.state.angle)
        }, 60000);
        }
    setAngle (angle) {
        this.setState({angle: angle});
    }
    render () {
        return (
            <div className="arrow arrow-m" style={this.state.style}></div>
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
        </div>
    );
}

function App() {

    return (
        <Circle/>
    );
}

export default App;
