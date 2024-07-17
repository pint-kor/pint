import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AuthButton from "@/components/auth/KakaoAuthButton";
import KakaoLoginPage from "@/components/auth/KakaoLoginModal";
import ProfileCircle from "@/components/user/ProfileCircle";
import ProfileMyPostsContainer from "@/components/user/ProfileMyPostsContainer";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { signOut } from "@/lib/features/auth";
import { RootState } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(signOut())
    }

    const routeToSettings = () => {
        // route to settings
        router.push("/settings")
    }

    return (
      <ThemedView style={{ flex: 1, paddingTop: insets.top, padding: 20, gap: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingTop: 10,}}>
            <Ionicons name="settings-outline" size={28} color={Colors[colorScheme ?? "light"].text} onPress={routeToSettings}/>
        </View>
        <View style={{flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', flexBasis: 'auto', gap: 20}}>
          <ProfileCircle onPress={() => console.log('hi')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            {user.user ? (
                <ThemedText style={{fontSize: 16, fontWeight: '500'}}>{user.user?.username}</ThemedText>
                ) : (
                <ThemedText type="defaultSemiBold">로그인이 필요합니다</ThemedText>
            )}
          </View>
          {/* <Button title="Logout" onPress={logout} /> */}
        </View>
        <ProfileMyPostsContainer />
        {/* <View style={{flex: 3, justifyContent: 'flex-start'}}/>

        <View style={{flex: 1, }}/>

        <View style={{flex: 1, justifyContent: 'flex-end'}}/> */}
      </ThemedView>
    );
}