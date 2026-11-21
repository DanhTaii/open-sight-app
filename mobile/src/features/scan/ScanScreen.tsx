import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { ScanStyle } from "./ScanScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
// import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export default function ScanMainScreen() {
  const router = useRouter();

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const OCR_API_KEY = process.env.EXPO_PUBLIC_OCR_API_KEY;

  const handleCaptureAndRead = () => {
    router.push("/reading");
  };

  if (!permission) {
    return (
      <SafeAreaView style={ScanStyle.permissionSafeArea}>
        <ActivityIndicator size="large" />
        <Text style={ScanStyle.permissionCheckingText}>
          Đang kiểm tra quyền sử dụng camera...
        </Text>
      </SafeAreaView>
    );
  }

  // if (!permission.granted) {
  //   return (
  //     <SafeAreaView style={ScanStyle.permissionSafeArea}>
  //       <StatusBar barStyle="dark-content" />

  //       <View style={ScanStyle.permissionContent}>
  //         <Ionicons
  //           name="camera-outline"
  //           size={56}
  //           color="#003366"
  //           style={ScanStyle.permissionIcon}
  //         />

  //         <Text style={ScanStyle.permissionTitle}>
  //           OpenSight cần quyền sử dụng camera
  //         </Text>

  //         <TouchableOpacity
  //           onPress={requestPermission}
  //           style={ScanStyle.permissionButton}
  //         >
  //           <Text style={ScanStyle.permissionButtonText}>Cấp quyền camera</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={ScanStyle.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={ScanStyle.header}>
        <View style={ScanStyle.headerLeft}>
          <View style={ScanStyle.logoBadge}>
            <Ionicons name="eye" size={20} color="#FFFFFF" />
          </View>
          <Text style={ScanStyle.logoText}>OpenSight</Text>
        </View>
      </View>

      {/* Phần nội dung quét */}
      <View style={ScanStyle.content}>
        <Text style={ScanStyle.title}>Quét tài liệu</Text>

        <Text style={ScanStyle.description}>
          Đặt tài liệu trước camera, giữ điện thoại ổn định rồi nhấn Chụp và
          đọc.
        </Text>

        <View style={ScanStyle.cameraWrapper}>
          <CameraView
            ref={cameraRef}
            style={ScanStyle.camera}
            facing="back"
            onCameraReady={() => setIsCameraReady(true)}
          />

          {/* Lớp phủ làm tối bên ngoài khung quét */}
          <View pointerEvents="none" style={ScanStyle.overlayContainer}>
            <View style={ScanStyle.overlayTop} />
            <View style={ScanStyle.overlayMiddle}>
              <View style={ScanStyle.overlaySide} />
              <View style={ScanStyle.overlayClearCenter} />
              <View style={ScanStyle.overlaySide} />
            </View>
            <View style={ScanStyle.overlayBottom} />
          </View>

          {/* Viền khung gợi ý căn chỉnh tài liệu */}
          <View pointerEvents="none" style={ScanStyle.scanFrame} />
        </View>

        {errorMessage ? (
          <Text accessibilityRole="alert" style={ScanStyle.errorText}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Chụp ảnh tài liệu và nhận diện văn bản"
          disabled={!isCameraReady || isProcessing}
          onPress={handleCaptureAndRead}
          activeOpacity={0.8}
          style={[
            ScanStyle.captureButton,
            (!isCameraReady || isProcessing) && ScanStyle.captureButtonDisabled,
          ]}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Ionicons name="scan-outline" size={22} color="#FFFFFF" />
          )}

          <Text style={ScanStyle.captureButtonText}>
            {isProcessing ? "Đang nhận diện văn bản..." : "Chụp và đọc"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
