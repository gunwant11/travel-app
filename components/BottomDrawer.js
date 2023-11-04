import { View } from "@gluestack-ui/themed";
import React, {useRef} from "react";
import { Animated, Dimensions, PanResponder, StyleSheet } from "react-native";
const { height } = Dimensions.get('window');
const DrawerState = {
        Open : height - 130,
        Peek : 130,
        Closed : 0,
      }

const BottomDrawer = ({
    children,
    onDrawerStateChange,
  }) => {
    
      
    const y = React.useRef(new Animated.Value(DrawerState.Closed)).current;
    const state = React.useRef(new Animated.Value(DrawerState.Closed)).current;
    const margin = 0.05 * height;
    const movementValue = (moveY) => height - moveY;
  
    const onPanResponderMove = (
      _,
      { moveY },
    ) => {
      const val = movementValue(moveY);
      animateMove(y, val);
    };
  
    const onPanResponderRelease = (
      _,
      { moveY },
    ) => {
      const valueToMove = movementValue(moveY);
      const nextState = getNextState(state._value, valueToMove, margin);
      state.setValue(nextState);
      animateMove(y, nextState, onDrawerStateChange(nextState));
    };
    const onMoveShouldSetPanResponder = (
      _,
      { dy },
    ) => Math.abs(dy) >= 10;
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder,
        onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
        onPanResponderMove,
        onPanResponderRelease,
      }),
    ).current;
  
    return (
      <Animated.View
        style={[
          {
            width: '100%',
            height: height,
            backgroundColor: '#fff',
            borderRadius: 25,
            position: 'absolute',
            bottom: -height + 30,
            transform: [{ translateY: y }],
          },
        ]}
        {...panResponder.panHandlers}>
        {/* <View style={{
            height: '5px',
            width: '100%',
            backgroundColor: '#000',}}></View> */}
            <View style={{height: 5, width: '100%', backgroundColor: '#a3a3a3', borderRadius: 25, position: 'relative', top: 8, marginHorizontal: 'auto'}}></View>
      </Animated.View>
    );
  };
  
  export default BottomDrawer;

  export const animateMove = (
    y,
    toValue,
    callback,
  ) => {
    Animated.spring(y, {
      toValue: -toValue,
      tension: 20,
      useNativeDriver: true,
    }).start((finished) => {
  /* Optional: But the purpose is to call this after the the animation has finished. Eg. Fire an event that will be listened to by the parent component */
      finished && callback && callback();
    });
  };
  
  export const getNextState = (
    currentState,
    val,
    margin,
  ) => {
    switch (currentState) {
      case DrawerState.Peek:
        return val >= currentState + margin
          ? DrawerState.Open
          : val <= DrawerState.Peek - margin
          ? DrawerState.Closed
          : DrawerState.Peek;
      case DrawerState.Open:
        return val >= currentState
          ? DrawerState.Open
          : val <= DrawerState.Peek
          ? DrawerState.Closed
          : DrawerState.Peek;
      case DrawerState.Closed:
        return val >= currentState + margin
          ? val <= DrawerState.Peek + margin
            ? DrawerState.Peek
            : DrawerState.Open
          : DrawerState.Closed;
      default:
        return currentState;
    }
  };



// const styles = StyleSheet.create({
//     line: {
//         margin: '25px 0px 15px 0px',
//         height: '1px',
//         width: '100%',
//         backgroundColor: '#D3D3D3',
//         },
//     });