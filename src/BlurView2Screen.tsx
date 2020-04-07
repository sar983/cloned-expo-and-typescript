import { BlurView } from "expo-blur";
import React, { Component } from "react";
import { Animated, Image, View } from "react-native";

const expoLogoUrl =
  "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png";
// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface State {
  intensity: Animated.Value;
}

export class BlurView2Screen extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      intensity: new Animated.Value(0),
    };
  }

  public static navigationOptions = {
    title: "BlurView 2",
  };

  public componentDidMount() {
    this.animate();
  }

  private animate = () => {
    Animated.timing(this.state.intensity, {
      duration: 2500,
      toValue: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.intensity, {
        duration: 2500,
        toValue: 0,
        useNativeDriver: true,
      }).start(this.animate);
    });
  };

  public render() {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <BlurView intensity={this.state.intensity} />
        <Image
          source={{ uri: expoLogoUrl }}
          style={{
            height: 180,
            width: 180,
          }}
        />
        {/* Removed for now because there is an issue with the `intensity` property not being accepted by TypeScript.  */}
        {/* <AnimatedBlurView
          intensity={this.state.intensity}
          style={StyleSheet.absoluteFill}
          tint="default"
        /> */}
      </View>
    );
  }
}
