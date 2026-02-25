import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selected, setSelected] = useState('');
  const [intensity, setIntensity] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState({});

  const onDayPress = (day) => {
    setSelected(day.dateString);
    if (entries[day.dateString]) {
      const entry = entries[day.dateString];
      setIntensity(entry.intensity);
      setSymptoms(entry.symptoms);
      setNotes(entry.notes);
    } else {
      setIntensity('');
      setSymptoms('');
      setNotes('');
    }
  };

  const saveEntry = () => {
    setEntries({...entries, [selected]: { intensity, symptoms, notes }});
    setIntensity('');
    setSymptoms('');
    setNotes('');
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={Object.keys(entries).reduce((acc, date) => {
          acc[date] = { marked: true };
          return acc;
        }, {})}
      />
      <TextInput
        placeholder="Pain Intensity"
        value={intensity}
        onChangeText={setIntensity}
        style={styles.input}
      />
      <TextInput
        placeholder="Symptoms"
        value={symptoms}
        onChangeText={setSymptoms}
        style={styles.input}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
      />
      <Button title="Save Entry" onPress={saveEntry} disabled={!selected} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default CalendarScreen;