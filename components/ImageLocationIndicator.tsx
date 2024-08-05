import { StyleProp, View, ViewStyle } from "react-native";

export default function ImageLocationIndicator({
  count,
  index,
  ...props
}: {
  count: number;
  index: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      {...props}
    >
      {new Array(count).fill(0).map((_, idx) => {
        return (
          <View
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: idx === index ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)",
            }}
          />
        );
      })}
    </View>
  );
}