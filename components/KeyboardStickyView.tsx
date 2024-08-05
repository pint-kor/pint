import { useEffect, useState } from "react";
import { Animated, Easing, Keyboard, StyleProp, useAnimatedValue, ViewStyle } from "react-native";

export default function KeyboardStickyView({ children, style }: {
    children: React.ReactNode,
    style?: StyleProp<ViewStyle>
}) {
    const animatedValue = useAnimatedValue(0);
    const [keyboardHeight, setKeyboardHeight] = useState(226);

    const handleKeyboardAnimation = (toValue: number) => {
        Animated.timing(
            animatedValue,
            {
                toValue,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.ease,
            }
        ).start();
    }

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
            setKeyboardHeight(event.endCoordinates.height);
        });

        const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardHeight(0);
        });

    }, [])

    return (
        <Animated.View style={{ transform: animatedValue }}>
            {children}
        </Animated.View>
    )
}