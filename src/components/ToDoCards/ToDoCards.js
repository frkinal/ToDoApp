import React, {useState} from 'react';
import styles from './ToDoCards.styles';
import {Text, TouchableOpacity, View, Modal, TextInput} from 'react-native';

const ToDoCards = ({card, onLongPress, onPress}) => {
  const [focus, setFocus] = useState(false);
  const [_focus, _setFocus] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState();
  const [done, setDone] = useState(true);

  const onPressItem = card => {
    setIsModalVisible(true);
    setInputText(card.task);
  };
  const handleEditItem = () => {
    if (inputText == null) {
      alert('Bu alan bos birakilamaz!!!');
    } else {
      card.task = inputText;
    }
  };
  const saveEdit = () => {
    handleEditItem(card.id);
    setIsModalVisible(false);
    setFocus(false);
  };
  const closeFocus = () => {
    setFocus(false);
    alert('hello');
  };
  const closeDoneView = () => {
    _setFocus(!_focus);
    alert('hello');
  };

  return focus ? (
    <View style={styles.container2}>
      <View style={styles.edit}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => onPressItem(card.id)}>
          <Text style={styles.Button}>Duzenle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => onLongPress(card.id)}>
          <Text style={styles.Button}>Sil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.closeFocusView}>
        <TouchableOpacity onPress={closeFocus} style={styles.Button}>
          <Text style={styles.Button}>Kapat</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <View style={styles.editView}>
              <Text style={styles.modalText}>Metni duzenle: </Text>
              <TextInput
                style={styles.modalTextInput}
                onChangeText={text => setInputText(text)}
                defaultValue={inputText}
                editable={true}
                multiline={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => saveEdit()}
              style={styles.saveEdit}>
              <Text style={styles.saveText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  ) : _focus ? (
    done ? (
      <View style={styles.container3}>
        <TouchableOpacity
          onPress={() => {
            setDone(!done);
          }}
          style={styles.doneButton}>
          <Text style={styles.Button}>Yapildi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onPress(card.id);
          }}
          style={styles.fixedButton}>
          <Text style={styles.Button}>Basa Sabitle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeDoneView} style={styles.closeDoneButton}>
          <Text style={styles.Button}>X</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => {
          _setFocus(!focus);
        }}
        onLongPress={() => {
          setFocus(!focus);
        }}
        style={styles.container4}>
        <Text style={styles.textDone}>{card.task}</Text>
      </TouchableOpacity>
    )
  ) : (
    <TouchableOpacity
      onPress={() => {
        _setFocus(!focus);
      }}
      onLongPress={() => {
        setFocus(!focus);
      }}
      style={styles.container}>
      <Text style={styles.text}>{card.task}</Text>
    </TouchableOpacity>
  );
};

export default ToDoCards;
