# React Native Pulse Animation

![react native pulse](https://raw.githubusercontent.com/sahlhoff/react-native-pulse/master/pulse-gif.gif)
  
## Installation

```
  npm install react-native-pulse --save
```

## Usage

```js
const Pulse = require('react-native-pulse');
  
class helloWorld extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Pulse color='orange' numPulses={3} diameter={400} speed={20} duration={2000} />
      </View>
    );
  }  
}

```

## Props

Component accepts several self-descriptive properties:


- **`color`** _(String)_ - Backgroundcolor for pulse. React-native colors supported. Default color is blue.
- **`numPulses`** _(Number)_ - This is the number of pulses that will be rendered. Defaults to 3.
- **`diameter`** _(Number)_ - This is the maximum diameter that a pulse will be. Defaults to 400.
- **`style`** _(object)_ - Style properties for pulse container positioning eg.
- **`image`** _(object)_ - Image for center pulse thumbnail.
- **`speed`** _(Number)_ - Speed in milliseconds pulse will redraw. Defaults to 10.
- **`duration`** _(Number)_ - Duration in milliseconds this is the delay new pulses will be created. Defaults to 1000.
