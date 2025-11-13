import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MOOD_EMOJIS = {
  5: '😊',
  4: '🙂',
  3: '😐',
  2: '😔',
  1: '😢',
};

const MOOD_LABELS = {
  5: 'Muito Feliz',
  4: 'Feliz',
  3: 'Neutro',
  2: 'Triste',
  1: 'Muito Triste',
};

const STRESS_LABELS = {
  1: 'Muito Baixo',
  2: 'Baixo',
  3: 'Médio',
  4: 'Alto',
  5: 'Muito Alto',
};

const STRESS_COLORS = {
  1: '#10b981',
  2: '#34d399',
  3: '#fbbf24',
  4: '#f97316',
  5: '#ef4444',
};

const WORK_MODE_LABELS = {
  remote: '🏠 Remoto',
  hybrid: '🔄 Híbrido',
  office: '🏢 Presencial',
};

export default function HistoryScreen() {
  const [entries, setEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadEntries = async () => {
    try {
      const data = await AsyncStorage.getItem('wellnessEntries');
      if (data) {
        const parsedEntries = JSON.parse(data);
        // Ordenar por data (mais recente primeiro)
        parsedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(parsedEntries);
      } else {
        setEntries([]);
      }
    } catch (error) {
      console.error('Error loading entries:', error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEntries();
    setRefreshing(false);
  };

  const deleteEntry = async (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedEntries = entries.filter((entry) => entry.id !== id);
              await AsyncStorage.setItem(
                'wellnessEntries',
                JSON.stringify(updatedEntries)
              );
              setEntries(updatedEntries);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o registro.');
              console.error('Error deleting entry:', error);
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem, ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const renderEntry = ({ item }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <View style={styles.entryDateContainer}>
          <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteEntry(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.entryContent}>
        <View style={styles.entryRow}>
          <Text style={styles.entryLabel}>Humor:</Text>
          <View style={styles.entryValueContainer}>
            <Text style={styles.moodEmoji}>{MOOD_EMOJIS[item.mood]}</Text>
            <Text style={styles.entryValue}>{MOOD_LABELS[item.mood]}</Text>
          </View>
        </View>

        <View style={styles.entryRow}>
          <Text style={styles.entryLabel}>Estresse:</Text>
          <View
            style={[
              styles.stressBadge,
              { backgroundColor: STRESS_COLORS[item.stress] },
            ]}
          >
            <Text style={styles.stressBadgeText}>
              {STRESS_LABELS[item.stress]}
            </Text>
          </View>
        </View>

        <View style={styles.entryRow}>
          <Text style={styles.entryLabel}>Modo de trabalho:</Text>
          <Text style={styles.entryValue}>
            {WORK_MODE_LABELS[item.workMode]}
          </Text>
        </View>

        {item.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Observações:</Text>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📝</Text>
      <Text style={styles.emptyText}>Nenhum registro ainda</Text>
      <Text style={styles.emptySubtext}>
        Comece registrando seu bem-estar na aba "Registrar"
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          entries.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  list: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyList: {
    flex: 1,
  },
  entryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  entryDateContainer: {
    flex: 1,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  entryContent: {
    gap: 12,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  entryLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  entryValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moodEmoji: {
    fontSize: 20,
  },
  entryValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  stressBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  stressBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  notesContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  notesLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 6,
  },
  notesText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

