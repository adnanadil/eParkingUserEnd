// We are defining an animation component which is wrapped across components which we want to animate 
// instead of create the animation for each component that we need to animate we have this component which 
// once wrapped across a component will help in animating it.  

import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ duration = 1500, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};
