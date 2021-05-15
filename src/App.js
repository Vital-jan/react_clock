// import logo from './logo.svg';
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

function Circle() {
    let smallNumberDeg = [30, 60, 120, 150, 210, 240, 300, 330];
    let degArr = smallNumberDeg.map((val)=>{
        return (<NumberSmall deg={val}/>);
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
        </div>
    );
}

function App() {
  return (
      <Circle/>
  );
}

export default App;
