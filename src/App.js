
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
class Cloud extends React.Component {
    constructor () {
        super();
        this.ref = React.createRef();
    }
    componentDidMount() {
        this.width = this.ref.current.naturalWidth;
    }
    render() {
        return (
            <img className="cloud" ref={this.ref} src={this.props.img} alt=""/>
        )
    }
}

class Circle extends React.Component { // parent component
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
        },
        clouds: []
    }
    constructor() {
        super();
        this.cloudsCount = 28; // clouds image count
        this.cloudsArr = [];
        for (let n = 1; n <= this.cloudsCount; n++) { // clouds components array create
            let fileID = n < 10 ? '0' + n : n;
            this.cloudsArr.push(<Cloud img={`/img/clouds/c${fileID}.png`}/>);
        }
        this.ref = React.createRef();
        for (let val of this.smallNumberDeg)
        this.degArr.push(<NumberSmall deg={val} key={val} />)
    }
    componentDidMount() {
        this.width = this.ref.current.clientWidth; // component width
        this.interval = setInterval(() => {// set arrows position (1 time per second)
            let time = new Date();
            this.setState(
                {
                    secondAngle: {
                        transform: `rotate(${time.getSeconds() * 6}deg)`
                    }
                })
            this.setState(
                {
                    minuteAngle: {
                        transform: `rotate(${time.getMinutes() * 6}deg)`
                    }
                }
            )
            this.setState(
                {
                    hourAngle: {
                        transform: `rotate(${time.getHours() * 30 + time.getMinutes() / 2}deg)`
                    }
                }
            )
        }, 1000);
        for (let n = 1; n <= this.cloudsCount; n++) {
            this.state.clouds.push({
                active: false,
                style: {
                    visibility: 'hidden',
                    zIndex: 0,
                    left: 0
                }
            });
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="circle" ref={this.ref}>
                <img className="matterhorn" src="/img/matterhorn.png" alt="Matterhorn"></img>
                <NumberLarge number="XII" deg="0" />
                <NumberLarge number="III" deg="90" />
                <NumberLarge number="VI" deg="180" />
                <NumberLarge number="IX" deg="270" />
                {this.degArr}
                <ArrowSecond style={this.state.secondAngle} />
                <ArrowMinute style={this.state.minuteAngle} />
                <ArrowHour style={this.state.hourAngle} />
                {this.cloudsArr}
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
