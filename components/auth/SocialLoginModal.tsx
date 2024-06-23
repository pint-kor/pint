import { Modal, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";

export default function SocialLoginModal({ visible=false, setVisible }: { visible: boolean, setVisible: (visible: boolean) => void}) {
    return (
        <ThemedView style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => setVisible(false)}
            >
                
            </Modal>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
})