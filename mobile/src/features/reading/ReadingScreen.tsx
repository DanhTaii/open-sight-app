import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ReadingStyle } from "@/features/reading/ReadingScreen.styles";

export default function ReadingScreen() {
  const router = useRouter();
  const [ocrText] = " DocumentDetailScreen: Màn hình hiển thị chi tiết tài liệu đã được quét và phát âm thanh";
  const [isReading, setIsReading] = useState(false);

  return (
    <SafeAreaView
      style={[ReadingStyle.safeArea, { backgroundColor: "#FFFFFF" }]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={ReadingStyle.header}>
        <TouchableOpacity
          style={ReadingStyle.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <Text style={ReadingStyle.headerTitle}>Chi Tiết Tài Liệu</Text>

        <TouchableOpacity
          style={ReadingStyle.profileCircleButton}
          activeOpacity={0.7}
        >
          <Ionicons name="person" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Nội dung kết quả */}
      <View style={ReadingStyle.content}>
        <ScrollView
          style={ReadingStyle.scrollContainer}
          contentContainerStyle={ReadingStyle.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={ReadingStyle.documentCard}>
            <Text style={ReadingStyle.documentTitle}>
              KẾT QUẢ NHẬN DIỆN VĂN BẢN
            </Text>

            <View style={ReadingStyle.highlightBlock}>
              <Text style={ReadingStyle.highlightText}>
                {ocrText || "Chưa có văn bản được nhận diện."}
              </Text>
            </View>

            <View style={ReadingStyle.cardFooter}>
              <View style={ReadingStyle.pauseHint}>
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color="#64748B"
                />
                <Text style={ReadingStyle.pauseHintText}>
                  Văn bản nhận diện từ ảnh chụp
                </Text>
              </View>

              <Text style={ReadingStyle.pageNumber}>OCR</Text>
            </View>
          </View>
        </ScrollView>

        {/* Cụm nút điều khiển cố định ở cuối màn hình */}
        <View style={ReadingStyle.bottomBar}>
          {/*------------------- Nút dừng đọc */}
          <TouchableOpacity
            style={ReadingStyle.primaryPauseButton}
            // onPress={handleStopReading}
            activeOpacity={0.8}
          >
            <Ionicons name="stop-circle" size={24} color="#FFFFFF" />
            <Text style={ReadingStyle.primaryPauseText}>Dừng đọc</Text>
          </TouchableOpacity>

          {/*-------------------- Nút đọc lại */}
          <TouchableOpacity
            style={ReadingStyle.replayButton}
            // onPress={handleReplayReading}
            activeOpacity={0.7}
          >
            <Ionicons name="reload-outline" size={20} color="#003366" />
            <Text style={ReadingStyle.replayText}>Đọc lại</Text>
          </TouchableOpacity>

          {/*-------------- Nút quét tài liệu khác */}
          <TouchableOpacity
            style={ReadingStyle.rescanButton}
            // onPress={handleRescan}
            activeOpacity={0.8}
          >
            <Ionicons name="scan-outline" size={20} color="#334155" />
            <Text style={ReadingStyle.rescanText}>Quét lại tài liệu khác</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
