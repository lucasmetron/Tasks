import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o idioma português para o moment

import TodayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";
import Task from "../components/Task";

const TaskList = () => {
  const today = moment().locale("pt-br").format("DD, [de] MMMM");

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgorund} source={TodayImage}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <Task
          desc="Comprar livro"
          estimateAt={new Date()}
          doneAt={new Date()}
        />
        <Task desc="Ler livro" estimateAt={new Date()} doneAt={null} />
      </View>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgorund: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  text: {
    fontFamily: commonStyles.fonts.text,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: commonStyles.fonts.title,
    fontSize: 50,
    color: commonStyles.colors.secundary,
    marginLeft: 20,
    marginBottom: 20,
  },

  subTitle: {
    fontFamily: commonStyles.fonts.text,
    fontSize: 20,
    color: commonStyles.colors.secundary,
    marginLeft: 20,
    marginBottom: 30,
  },
});
