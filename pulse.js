import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

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

export default class Pulse extends Component {
    static propTypes = {
        color: PropTypes.string,
        diameter: PropTypes.number,
        duration: PropTypes.number,
        image: PropTypes.object,
        initialDiameter: PropTypes.number,
        numPulses: PropTypes.number,
        pulseStyle: PropTypes.object,
        speed: PropTypes.number,
        style: PropTypes.object
    };

    static defaultProps = {
        color: 'blue',
        diameter: 400,
        duration: 1000,
        image: null,
        initialDiameter: 0,
        numPulses: 3,
        pulseStyle: {},
        speed: 10,
        style: {
            top: 0,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    constructor(props){
        super(props);

        this.state = {
            color: this.props.color,
            duration: this.props.duration,
            image: this.props.image,
            maxDiameter: this.props.diameter,
            numPulses: this.props.numPulses,
            pulses: [],
            pulseStyle: this.props.pulseStyle,
            speed: this.props.speed,
            started: false,
            style: this.props.style
        };
    }

    mounted = true;

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.color != prevState.color){
            return { color: nextProps.color}
        };
        if(nextProps.duration != prevState.duration) {
            return { duration: nextProps.duration };
        };
        if(nextProps.maxDiameter != prevState.maxDiameter) {
            return { maxDiameter: nextProps.maxDiameter };
        };
        if(nextProps.numPulses != prevState.numPulses) {
            return { numPulses: nextProps.numPulses };
        };
        if(nextProps.speed != prevState.speed) {
            return { speed:nextProps.speed };
        };
    }

//   componentWillReceiveProps(props) {
//         if(props.color != this.state.color){
//             this.setState({
//                 color: props.color
//             });
//         };
//         if(props.duration != this.state.duration) {
//             this.setState({
//                 duration: props.duration
//             });
//         };
//         if(props.maxDiameter != this.state.maxDiameter) {
//             this.setState({
//                 maxDiameter: props.maxDiameter
//             });
//         };
//         if(props.numPulses != this.state.numPulses) {
//             this.setState({
//                 numPulses: props.numPulses
//             });
//         };
//         if(props.speed != this.state.speed) {
//             this.setState({
//                 speed:props.speed
//             });
//         };
    
//     }

    componentDidMount(){
        const {numPulses, duration, speed} = this.state;

        this.setState({started: true});

        let a = 0;
        while(a < numPulses){
            this.createPulseTimer = setTimeout(()=>{
                this.createPulse(a);
            }, a * duration);

            a++;
        }

        this.timer = setInterval(() => {
            this.updatePulse();
        }, speed);
    }

    componentWillUnmount(){
        this.mounted = false;
        clearTimeout(this.createPulseTimer);
        clearInterval(this.timer);
    }

    createPulse = (pKey) => {
        if (this.mounted) {
            let pulses = this.state.pulses;

            let pulse = {
                pulseKey: pulses.length + 1,
                diameter: this.props.initialDiameter,
                opacity: .5,
                centerOffset: ( this.state.maxDiameter - this.props.initialDiameter ) / 2
            };

            pulses.push(pulse);

            this.setState({pulses});
        }
    }

    updatePulse = () => {
        if (this.mounted) {
            const pulses = this.state.pulses.map((p, i) => {
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

            this.setState({pulses});
        }
    }

    render(){
        const {color, image, maxDiameter, pulses, pulseStyle, started, style} = this.state;
        const containerStyle = [styles.container, style];
        const pulseWrapperStyle = {width: maxDiameter, height: maxDiameter};

        return (
            <View style={containerStyle}>
                {started &&
                    <View style={pulseWrapperStyle}>
                        {pulses.map((pulse) =>
                            <View
                                key={pulse.pulseKey}
                                style={[
                                    styles.pulse,
                                    {
                                        backgroundColor: color,
                                        width: pulse.diameter,
                                        height: pulse.diameter,
                                        opacity: pulse.opacity,
                                        borderRadius: pulse.diameter / 2,
                                        top: pulse.centerOffset,
                                        left: pulse.centerOffset
                                    },
                                    pulseStyle
                                ]}
                            />
                        )}
                        {image &&
                            <Image
                                style={image.style}
                                source={image.source}
                            />
                        }
                    </View>
                }
            </View>
        )
    }
}
