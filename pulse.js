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
        style: PropTypes.object,
        image: PropTypes.object,
        color: PropTypes.string,
        numPulses: PropTypes.number,
        diameter: PropTypes.number,
        speed: PropTypes.number,
        duration: PropTypes.number
    };


    static defaultProps = {
        style: {
            top: 0,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
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
            style: this.props.style,
            image: this.props.image,
            color: this.props.color,
            numPulses: this.props.numPulses,
            maxDiameter: this.props.diameter,
            speed: this.props.speed,
            duration: this.props.duration,
            pulses: []
        };

    }

    mounted = true;
  
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
                diameter: 0,
                opacity: .5
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
        const {style, image, maxDiameter, color, started, pulses} = this.state;
        const wrapperStyle = [styles.container, style];
        const containerStyle = {width: maxDiameter, height: maxDiameter};

        return (
            <View style={wrapperStyle}>
                {started &&
                    <View style={containerStyle}>
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
                                    } 
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
