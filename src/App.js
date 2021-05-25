
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

const cloudsCount = 28;
const cloudsVisibleCount = 5;
let cloudsArray = [];
let cloudsState = [];
for (let n = 1; n <= cloudsCount; n++) cloudsState.push({left: 0});

class Cloud extends React.Component {
    constructor() {
        super();
        this.ref = React.createRef();
    }
    componentDidMount() {
        cloudsArray.push({
            active: false,
            originalWidth: this.ref.current.naturalWidth,
            width: 0,
            ref: this.ref.current,
            x: 0,
            dx: 0,
            y: 0,
            opacity: 0,
            deltaOpacity: 0,
            scale: 1,
            zIndex: 0
        });
    }
    render() {
        return (
            <img className="cloud" ref={this.ref} src={this.props.img} style={this.props.style} alt=""/>
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
                transform: ''
        },
        HourAngle: {
                transform: ''
        }
    }
    constructor() {
        super();
        this.ref = React.createRef();
        for (let val of this.smallNumberDeg) // create small numbers components
            this.degArr.push(<NumberSmall deg={val} key={val} />)
        this.state.clouds = cloudsState;
        // this.cloudsComponents = this.createCloudsComponents();
    }

    // createCloudsComponents() { // clouds components array returns
    //     let cloudsComponentsArr = [];
    //     for (let n = 0; n < cloudsCount; n++) {
    //         let fileID = n < 9 ? '0' + (n + 1) : n + 1;
    //         cloudsComponentsArr.push(<Cloud img={`/img/clouds/c${fileID}.png`} key={n} style={this.state.clouds[n]} />);
    //     }
    //     return cloudsComponentsArr;
    // }
    componentDidMount() {
        this.width = this.ref.current.clientWidth;
        this.height = this.ref.current.clientHeight;
        this.arrowsTimer = setInterval(() => {// set arrows position (1 time per second)
            let time = new Date();
            this.setState(
                {
                    secondAngle: {
                        transform: `rotate(${time.getSeconds() * 6}deg)`
                    }
                });
            this.setState(
                {
                    minuteAngle: {
                        transform: `rotate(${time.getMinutes() * 6}deg)`
                    }
                }
            );
            this.setState(
                {
                    hourAngle: {
                        transform: `rotate(${time.getHours() * 30 + time.getMinutes() / 2}deg)`
                    }
                }
            );
            this.cloudStart();
        }, 1000);

        this.cloudsTimer = setInterval(() => {
            this.cloudMove();
        }, 40);
    }

    cloudStart() {
        let activeCount = 0; // visible clouds limit:
        cloudsArray.forEach((i)=>{
            if (i.active) activeCount++;
        });
        if (activeCount >= cloudsVisibleCount) return; // visible clouds count limit
        if (Math.random() < 0.5) return; // start new cloud or not every second
        let num = Math.round(Math.random () * (cloudsCount - 1));
        num = num < 0 ? 0 : num;
        num = num > cloudsCount - 1 ? cloudsCount - 1: num;
        while (cloudsArray[num].active) {
            num += 4;
            if (num > cloudsCount - 1) num = 0;
        }
        cloudsArray[num].active = true;
        let size = Math.random() * cloudsArray[num].originalWidth * 0.8;
        size = size < 150 ? 150 : size;
        cloudsArray[num].width = size;
        cloudsArray[num].x = -size;
        cloudsArray[num].y = Math.random() * (this.height - size / 2) + size/2;

        cloudsArray[num].visibility = 'visible';
        let layer = Math.random() < 0.5 ? -1 : 1;
        cloudsArray[num].zIndex = layer;
        cloudsArray[num].opacity = layer < 0 ? 0.4 : 0.6;
        cloudsArray[num].deltaOpacity = layer < 0 ? 0.0003 : 0.0005;
        cloudsArray[num].dx = layer > 0 ? 1 : 0.5;
        cloudsArray[num].scale = 1;
    }
    
    cloudStop(n) { // disactivate cloud
        cloudsArray[n].active = false;
        cloudsArray[n].visibility = 'hidden';
}
    
    cloudMove() {
        cloudsArray.forEach((i, n)=>{
            if (!i.active) return;
            if (cloudsArray[n].x > this.width) this.cloudStop(n); // disactivate cloud
            cloudsArray[n].x += cloudsArray[n].dx;
            cloudsArray[n].opacity -= cloudsArray[n].deltaOpacity;
            cloudsArray[n].scale += 0.0015;
      
            cloudsState[n]= {
                visibility: cloudsArray[n].visibility,
                zIndex: cloudsArray[n].zIndex,
                left: cloudsArray[n].x + 'px',
                width: cloudsArray[n].width + 'px',
                top: cloudsArray[n].y + 'px',
                opacity: cloudsArray[n].opacity,
                transform: `scaleX(${cloudsArray[n].scale})`
            };
            this.setState({clouds: cloudsState});
        });
    }

    componentWillUnmount() {
        clearInterval(this.arrowsTimer);
        clearInterval(this.cloudsTimer);
    }

    render() {
        return (
            <div className="circle" ref={this.ref} >
                <img className="matterhorn" src="./img/matterhorn.png" alt="Matterhorn"></img>
                <NumberLarge number="XII" deg="0" />
                <NumberLarge number="III" deg="90" />
                <NumberLarge number="VI" deg="180" />
                <NumberLarge number="IX" deg="270" />
                {this.degArr}
                <ArrowSecond style={this.state.secondAngle} />
                <ArrowMinute style={this.state.minuteAngle} />
                <ArrowHour style={this.state.hourAngle} />
                <Cloud img={`./img/clouds/c01.png`} key={1} style={this.state.clouds[0]} />
                <Cloud img={`./img/clouds/c02.png`} key={2} style={this.state.clouds[1]} />
                <Cloud img={`./img/clouds/c03.png`} key={3} style={this.state.clouds[2]} />
                <Cloud img={`./img/clouds/c04.png`} key={4} style={this.state.clouds[3]} />
                <Cloud img={`./img/clouds/c05.png`} key={5} style={this.state.clouds[4]} />
                <Cloud img={`./img/clouds/c06.png`} key={6} style={this.state.clouds[5]} />
                <Cloud img={`./img/clouds/c07.png`} key={7} style={this.state.clouds[6]} />
                <Cloud img={`./img/clouds/c08.png`} key={8} style={this.state.clouds[7]} />
                <Cloud img={`./img/clouds/c09.png`} key={9} style={this.state.clouds[8]} />
                <Cloud img={`./img/clouds/c10.png`} key={10} style={this.state.clouds[9]} />
                <Cloud img={`./img/clouds/c11.png`} key={11} style={this.state.clouds[10]} />
                <Cloud img={`./img/clouds/c12.png`} key={12} style={this.state.clouds[11]} />
                <Cloud img={`./img/clouds/c13.png`} key={13} style={this.state.clouds[12]} />
                <Cloud img={`./img/clouds/c14.png`} key={14} style={this.state.clouds[13]} />
                <Cloud img={`./img/clouds/c15.png`} key={15} style={this.state.clouds[14]} />
                <Cloud img={`./img/clouds/c16.png`} key={16} style={this.state.clouds[15]} />
                <Cloud img={`./img/clouds/c17.png`} key={17} style={this.state.clouds[16]} />
                <Cloud img={`./img/clouds/c18.png`} key={18} style={this.state.clouds[17]} />
                <Cloud img={`./img/clouds/c19.png`} key={19} style={this.state.clouds[18]} />
                <Cloud img={`./img/clouds/c20.png`} key={20} style={this.state.clouds[19]} />
                <Cloud img={`./img/clouds/c21.png`} key={21} style={this.state.clouds[20]} />
                <Cloud img={`./img/clouds/c22.png`} key={22} style={this.state.clouds[21]} />
                <Cloud img={`./img/clouds/c23.png`} key={23} style={this.state.clouds[22]} />
                <Cloud img={`./img/clouds/c24.png`} key={24} style={this.state.clouds[23]} />
                <Cloud img={`./img/clouds/c25.png`} key={25} style={this.state.clouds[24]} />
                <Cloud img={`./img/clouds/c26.png`} key={26} style={this.state.clouds[25]} />
                <Cloud img={`./img/clouds/c27.png`} key={27} style={this.state.clouds[26]} />
                <Cloud img={`./img/clouds/c28.png`} key={28} style={this.state.clouds[27]} />
                {/* {this.cloudsComponents} */}
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
