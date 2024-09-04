import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o idioma português para o moment

import TodayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";
import Task from "../components/Task";

const listTest = [
  {
    id: Math.random() * 100,
    desc: "Comprar curso",
    estimateAt: new Date(),
    doneAt: new Date(),
  },
  {
    id: Math.random() * 100,
    desc: "Assistir o curso",
    estimateAt: new Date(),
    doneAt: null,
  },
];

const TaskList = () => {
  const today = moment().locale("pt-br").format("DD, [de] MMMM");
  const [tasks, setTasks] = useState(listTest);

  function toggleTask(value) {
    const newList = tasks.map((item) => {
      if (item.id === value.id) {
        item.doneAt = item.doneAt === null ? new Date() : null;
      }
      return item;
    });
    setTasks(newList);
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgorund} source={TodayImage}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={({ item }) => <Task toggleTask={toggleTask} {...item} />}
          key={(i) => i.id}
        />
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
  teste: {
    padding: 10,
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

  list: {},
});
