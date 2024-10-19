import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Task = (props) => {
  return (
    <View style={styles.task}>
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Task