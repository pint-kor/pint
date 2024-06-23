import ContentLoader, { IContentLoaderProps, Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

export function SkeletonLoader({ children, ...prop }: IContentLoaderProps) {
  return (
    <ContentLoader backgroundColor="#777" foregroundColor="#aaa" {...prop}>
      {children}
    </ContentLoader>
  );
}