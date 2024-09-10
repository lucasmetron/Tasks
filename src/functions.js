import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getList() {
  let isErro = false;
  let listTasks = [];
  try {
    const tasks = await AsyncStorage.getItem("list-tasks");
    if (tasks !== null) {
      listTasks = JSON.parse(tasks);
    }
  } catch {
    erro = true;
  }

  return { isErro: isErro, taslistTasksks: listTasks };
}

export async function setList(list) {
  let isErro = false;

  try {
    await AsyncStorage.setItem("list-tasks", JSON.stringify(list));
  } catch {
    erro = true;
  }

  return { isErro: isErro };
}
