import { StyleSheet } from "react-native";

export const ScanStyle = StyleSheet.create({
  /* 1. KHUNG CHỨA TOÀN MÀN HÌNH (SAFE AREA) */
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* 2. STYLE CHO THANH HEADER TRÊN CÙNG */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#003366",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#003366",
    letterSpacing: -0.5,
  },

  /* 3. STYLE CHO MÀN HÌNH YÊU CẦU QUYỀN CAMERA */
  permissionSafeArea: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionCheckingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#334155",
  },
  permissionContent: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    width: "100%",
  },
  permissionIcon: {
    alignSelf: "center",
  },
  permissionTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginVertical: 16,
  },
  permissionButton: {
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  /* 4. STYLE KHU VỰC NỘI DUNG CHÍNH */
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E5E7EB",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },

  /* 5. KHUNG CAMERA VÀ VÙNG QUÉT */
  cameraWrapper: {
    flex: 1,
    minHeight: 300,
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#0F172A",
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayTop: {
    height: "15%",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  overlayMiddle: {
    flex: 1,
    flexDirection: "row",
  },
  overlaySide: {
    width: "8%",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  overlayClearCenter: {
    flex: 1,
  },
  overlayBottom: {
    height: "15%",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  scanFrame: {
    position: "absolute",
    top: "15%",
    bottom: "15%",
    left: "8%",
    right: "8%",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  /* 6. THÔNG BÁO LỖI VÀ NÚT CHỤP */
  errorText: {
    color: "#B91C1C",
    marginTop: 12,
    fontSize: 14,
  },
  captureButton: {
    marginTop: 16,
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  captureButtonDisabled: {
    backgroundColor: "#94A3B8",
  },
  captureButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
