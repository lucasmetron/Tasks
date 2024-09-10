import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o idioma português para o moment
import Entypo from "@expo/vector-icons/Entypo";

import TodayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";
import Task from "../components/Task";
import AddTask from "./AddTask";
import { getList, setList } from "../functions";

const listTest = [];

const TaskList = () => {
  const today = moment().locale("pt-br").format("DD, [de] MMMM");
  const [tasks, setTasks] = useState(listTest);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [allViseableTasks, setAllViseableTasks] = useState(true);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  function toggleFilter() {
    setShowDoneTasks((value) => !value);
    setAllViseableTasks((value) => !value);
  }

  async function toggleTask(value) {
    const newList = tasks.map((item) => {
      if (item.id === value.id) {
        item.doneAt = item.doneAt === null ? new Date() : null;
      }
      return item;
    });

    const res = await setList(newList);

    if (res.isErro) {
      Alert.alert("Erro!", "Ocorreu algum erro para salvar os dados");
      return;
    } else {
      setTasks(newList);
    }
  }

  function filterDataVisaeble() {
    if (allViseableTasks) {
      return tasks;
    } else {
      const newList = tasks.filter((item) => item.doneAt === null);
      return newList;
    }
  }

  async function addTask(desc, date) {
    if (desc !== "") {
      const newArray = tasks;
      const newTask = {
        id: Math.random() * 100,
        desc: desc,
        estimateAt: new Date(date),
        doneAt: null,
      };

      newArray.push(newTask);

      const res = await setList(newArray);

      if (res.isErro) {
        Alert.alert("Erro!", "Ocorreu algum erro para salvar os dados");
        return;
      } else {
        setTasks(newArray);
        setIsModalAddOpen(false);
      }
    } else {
      Alert.alert("Dados inválidos", "Descrição não informada");
    }
  }

  async function deleteTask(idTaskToDelete) {
    const newList = tasks.filter((item) => item.id !== idTaskToDelete);

    const res = await setList(newList);

    if (res.isErro) {
      Alert.alert("Erro!", "Ocorreu algum erro para salvar os dados");
      return;
    } else {
      setTasks(newList);
    }
  }

  useEffect(() => {
    filterDataVisaeble();
  }, [tasks]);

  useEffect(() => {
    (async () => {
      const res = await getList();

      if (res.isErro) {
        Alert.alert("Erro!", "Ocorreu algum erro para buscar os dados");
        setTasks([]);
      } else {
        setTasks(res.taslistTasksks);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isModalAddOpen && (
        <AddTask
          isVisiable={isModalAddOpen}
          onCancel={() => {
            setIsModalAddOpen(false);
          }}
          addTask={addTask}
        />
      )}

      <ImageBackground style={styles.backgorund} source={TodayImage}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Entypo
              name={showDoneTasks ? "eye-with-line" : "eye"}
              size={30}
              color={commonStyles.colors.secundary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>

      {tasks.length > 0 && (
        <View style={styles.taskList}>
          <FlatList
            data={filterDataVisaeble()}
            renderItem={({ item }) => (
              <Task deleteTask={deleteTask} toggleTask={toggleTask} {...item} />
            )}
            key={(i) => i.id}
          />
        </View>
      )}

      {tasks.length === 0 && (
        <View style={styles.noTasks}>
          <Text style={styles.noTasksText}>Não há tarefas</Text>
        </View>
      )}

      <View style={styles.addTask}>
        <TouchableOpacity
          style={styles.addTaskBtn}
          onPress={() => setIsModalAddOpen(true)}
        >
          <Entypo name="plus" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
  iconBar: {
    width: "100%",
    paddingTop: 20,
    alignItems: "flex-end",
    paddingRight: 20,
  },
  addTask: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 30,
  },

  addTaskBtn: {
    width: "auto",
    borderRadius: 50,
    padding: 5,
    marginBottom: Platform.OS === "android" ? 20 : 0,
    backgroundColor: commonStyles.colors.today,
  },

  noTasks: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  noTasksText: {
    fontFamily: commonStyles.fonts.title,
    fontSize: 20,
    color: "gray",
  },
});
