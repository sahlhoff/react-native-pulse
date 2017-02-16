import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class Pulse extends Component {

  static propTypes = {
    top: PropTypes.number,
    color: PropTypes.string,
    numPulses: PropTypes.number,
    diameter: PropTypes.number,
    speed: PropTypes.number,
    duration: PropTypes.number
  };


  static defaultProps = {
    top: 150,
    color: 'blue',
    numPulses: 3,
    diameter: 400,
    speed: 10,
    duration: 1000
  }


  constructor(props){
    super(props);

    this.state = {
      started: false,
      top: this.props.top,
      color: this.props.color,
      numPulses: this.props.numPulses,
      maxDiameter: this.props.diameter,
      speed: this.props.speed,
      duration: this.props.duration,
      pulses: []
    };

  }
  
  componentDidMount(){
    this.setState({
      started: true
    });

    let a = 0;
    while(a < this.state.numPulses){
      this.createPulseTimer = setTimeout(()=>{
        this._createPulse(a);
      }, a * this.state.duration);
      a++;
    }

    this.timer = setInterval(() => {
      this._updatePulse();
    }, this.state.speed);
  }

  componentWillUnmount(){
    clearTimeout(this.createPulseTimer);
    clearInterval(this.timer);
  }
  
  render(){
    if(this.state.started){
      return (
        <View style={[styles.container, {top: this.state.top}]}>
          <View style={[styles.pulseContainer, {width: this.state.maxDiameter, height: this.state.maxDiameter}]}>
            {this.state.pulses.map((pulse) => {
              return <View key={pulse.pulseKey} style={[styles.pulse, {backgroundColor: this.state.color, width: pulse.diameter, height: pulse.diameter, opacity: pulse.opacity, borderRadius: pulse.diameter / 2, left: pulse.left, top: pulse.centerOffset, left: pulse.centerOffset} ]}></View>;
            })}
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
        </View>
      );
    }
  }

  _createPulse(pKey){

    let pulses = this.state.pulses;
    
    let pulse = {
      pulseKey: pulses.length + 1,
      diameter: 0,
      opacity: .5
    };

    pulses.push(pulse);

    this.setState({
      pulses: pulses
    });

  }

  _updatePulse(){

    let pulses = this.state.pulses.map((p, i) => {
      let maxDiameter = this.state.maxDiameter;
      let newDiameter = (p.diameter > maxDiameter ? 0 : p.diameter + 2);
      let centerOffset = ( maxDiameter - newDiameter ) / 2;
      let opacity = Math.abs( ( newDiameter / this.state.maxDiameter ) - 1 );
      
      let pulse = {
        pulseKey: i + 1,
        diameter: newDiameter,
        opacity: (opacity > .5 ? .5 : opacity),
        centerOffset: centerOffset
      };

      return pulse;
      
    });

    this.setState({
      pulses: pulses
    });
    
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  pulse: {
    position: 'absolute',
    flex: 1
  }
});

module.exports = Pulse;
