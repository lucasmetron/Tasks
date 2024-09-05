import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import commonStyles from "../commonStyles";

// import { Container } from './styles';

const AddTask = ({ isVisiable, onCancel, addTask }) => {
  const [desc, setDesc] = useState("");

  return (
    <Modal
      transparent
      visible={isVisiable}
      onRequestClose={onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.header}>Nova tarefa</Text>

        <TextInput
          value={desc}
          placeholder="Informe a descricao"
          onChangeText={(value) => setDesc(value)}
          style={styles.input}
          keyboardAppearance="light"
          keyboardType="default"
        />

        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={onCancel}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => addTask(desc)}>
            <Text>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    backgroundColor: "white",
  },
  header: {
    fontFamily: commonStyles.fonts.title,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secundary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btn: {
    margin: 20,
    color: commonStyles.colors.today,
    padding: 5,
  },
  input: {
    fontFamily: commonStyles.fonts.text,
    height: 40,
    margin: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6,
  },
});
