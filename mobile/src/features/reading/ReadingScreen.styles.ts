import { StyleSheet } from "react-native";

export const ReadingStyle = StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    flex: 1,
    marginLeft: 12,
  },
  profileCircleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#003366",
    alignItems: "center",
    justifyContent: "center",
  },

  /* 3. KHU VỰC NỘI DUNG CUỘN */
  content: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 12,
    flexGrow: 1,
  },

  /* 4. STYLE CHO THẺ HIỂN THỊ NỘI DUNG TÀI LIỆU */
  documentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  highlightBlock: {
    backgroundColor: "#FCE7D8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4A1504",
    lineHeight: 24,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  pauseHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pauseHintText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  pageNumber: {
    fontSize: 13,
    fontWeight: "800",
    color: "#003366",
  },

  /* 5. CỤM NÚT ĐIỀU KHIỂN Ở ĐÁY MÀN HÌNH */
  bottomBar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  primaryPauseButton: {
    backgroundColor: "#2563EB",
    minHeight: 52,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryPauseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  replayButton: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    minHeight: 48,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  replayText: {
    color: "#1D4ED8",
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 0,
    includeFontPadding: false,
  },
  rescanButton: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    minHeight: 48,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  rescanText: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 0,
    includeFontPadding: false,
  },
});
