import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import uuid from 'react-native-uuid';
import ToDoCards from './components/ToDoCards';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const renderToDoCards = ({item}) => (
    <ToDoCards onPress={fixingHead} onLongPress={_onLongPress} card={item} />
  );

  const _onPress = () => {
    if (text == '') {
      alert('Bu alan bos birakilamaz!!!');
    } else {
      setTasks([...tasks, {task: text, id: uuid.v4()}]);
      setText('');
      setCounter(counter + 1);
    }
  };
  const _onLongPress = id => {
    setTasks([...tasks].filter(item => item.id !== id));
    setCounter(counter - 1);
    alert(JSON.stringify(tasks));
  };

  const fixingHead = id => {
    const fixedItem = [...tasks].find(item => item.id == id);
    const firstArray = [...tasks].filter(item => item.id !== id);
    const newArray=[fixedItem].concat(firstArray);
    setTasks(newArray);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counter_container}>
        <Text style={styles.counter_text}>Yapilacaklar: </Text>
        <Text style={styles.counter_text}> {counter}</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderToDoCards}
        keyExtractor={index => index + Date.now() + Math.random()}
      />
      <View style={styles.bottom_container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder="Ara..."
            onChangeText={setText}
            value={text}
          />
        </View>
        <TouchableOpacity onPress={_onPress} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#102027',
    flex: 1,
  },
  counter_container: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counter_text: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FFA800',
  },
  bottom_container: {
    backgroundColor: '#37474F',
    borderRadius: 20,
    margin: 10,
    padding: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#808080',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#708792',
  },
  input_container: {
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
});
