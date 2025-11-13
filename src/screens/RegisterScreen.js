import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MOODS = [
  { id: 1, emoji: '😊', label: 'Muito Feliz', value: 5 },
  { id: 2, emoji: '🙂', label: 'Feliz', value: 4 },
  { id: 3, emoji: '😐', label: 'Neutro', value: 3 },
  { id: 4, emoji: '😔', label: 'Triste', value: 2 },
  { id: 5, emoji: '😢', label: 'Muito Triste', value: 1 },
];

const STRESS_LEVELS = [
  { id: 1, label: 'Muito Baixo', value: 1, color: '#10b981' },
  { id: 2, label: 'Baixo', value: 2, color: '#34d399' },
  { id: 3, label: 'Médio', value: 3, color: '#fbbf24' },
  { id: 4, label: 'Alto', value: 4, color: '#f97316' },
  { id: 5, label: 'Muito Alto', value: 5, color: '#ef4444' },
];

const WORK_MODES = [
  { id: 'remote', label: 'Remoto', icon: '🏠' },
  { id: 'hybrid', label: 'Híbrido', icon: '🔄' },
  { id: 'office', label: 'Presencial', icon: '🏢' },
];

export default function RegisterScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedStress, setSelectedStress] = useState(null);
  const [selectedWorkMode, setSelectedWorkMode] = useState(null);
  const [notes, setNotes] = useState('');

  const saveEntry = async () => {
    if (!selectedMood || !selectedStress || !selectedWorkMode) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, selecione seu humor, nível de estresse e modo de trabalho.'
      );
      return;
    }

    try {
      const entry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mood: selectedMood,
        stress: selectedStress,
        workMode: selectedWorkMode,
        notes: notes.trim(),
      };

      const existingEntries = await AsyncStorage.getItem('wellnessEntries');
      const entries = existingEntries ? JSON.parse(existingEntries) : [];
      entries.push(entry);

      await AsyncStorage.setItem('wellnessEntries', JSON.stringify(entries));

      Alert.alert('Sucesso!', 'Seu registro foi salvo com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setSelectedMood(null);
            setSelectedStress(null);
            setSelectedWorkMode(null);
            setNotes('');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o registro. Tente novamente.');
      console.error('Error saving entry:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como está seu humor hoje?</Text>
        <View style={styles.moodContainer}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodButton,
                selectedMood === mood.value && styles.moodButtonSelected,
              ]}
              onPress={() => setSelectedMood(mood.value)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.moodLabel,
                  selectedMood === mood.value && styles.moodLabelSelected,
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nível de estresse</Text>
        <View style={styles.stressContainer}>
          {STRESS_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.stressButton,
                selectedStress === level.value && {
                  backgroundColor: level.color,
                  borderColor: level.color,
                },
              ]}
              onPress={() => setSelectedStress(level.value)}
            >
              <Text
                style={[
                  styles.stressLabel,
                  selectedStress === level.value && styles.stressLabelSelected,
                ]}
              >
                {level.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Modo de trabalho</Text>
        <View style={styles.workModeContainer}>
          {WORK_MODES.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.workModeButton,
                selectedWorkMode === mode.id && styles.workModeButtonSelected,
              ]}
              onPress={() => setSelectedWorkMode(mode.id)}
            >
              <Text style={styles.workModeIcon}>{mode.icon}</Text>
              <Text
                style={[
                  styles.workModeLabel,
                  selectedWorkMode === mode.id && styles.workModeLabelSelected,
                ]}
              >
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observações (opcional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Como foi seu dia? O que te ajudou ou atrapalhou?"
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
        <Text style={styles.saveButtonText}>Salvar Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10,
  },
  moodButtonSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  moodLabelSelected: {
    color: '#6366f1',
    fontWeight: '600',
  },
  stressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stressButton: {
    width: '30%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  stressLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  stressLabelSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  workModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workModeButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  workModeButtonSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  workModeIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  workModeLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  workModeLabelSelected: {
    color: '#6366f1',
    fontWeight: '600',
  },
  notesInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    padding: 15,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 100,
    ...Platform.select({
      ios: {
        paddingTop: 15,
      },
    }),
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

