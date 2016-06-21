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
        <Pulse color='orange' numPulses={3} diameter={400} top={150} />
      </View>
    );
  }  
}

```  