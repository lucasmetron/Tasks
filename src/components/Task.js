import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o idioma português para o moment
import Swipeable from "react-native-gesture-handler/Swipeable";

import commonStyles from "../commonStyles";

const Task = (props) => {
  const formatedDate = moment(props.doneAt ? props.doneAt : props.estimateAt)
    .locale("pt-br")
    .format("DD, [de] MMMM");

  function getCheckView(doneAt) {
    if (doneAt !== null) {
      return (
        <View style={styles.done}>
          <MaterialIcons name="done" size={20} color={"white"} />
        </View>
      );
    } else {
      return <View style={styles.pending}></View>;
    }
  }

  function getRightContent() {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => props.deleteTask(props.id)}
      >
        <MaterialIcons name="delete" size={30} color="white" />
      </TouchableOpacity>
    );
  }

  function getLeftContent() {
    return (
      <View style={styles.left} onPress={() => props.deleteTask(props.id)}>
        <MaterialIcons name="delete" size={20} color="white" />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  }

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableOpen={(direction) =>
        direction === "left" && props.deleteTask(props.id)
      }
    >
      <View style={styles.container}>
        <View style={styles.checkContainer}>
          <TouchableOpacity
            onPress={() => {
              props.toggleTask(props);
            }}
          >
            {getCheckView(props.doneAt)}
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              ...styles.desc,
              textDecorationLine:
                props.doneAt != null ? "line-through" : "none",
            }}
          >
            {props.desc}
          </Text>
          <Text style={styles.date}>{formatedDate + ""}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#AAA",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "white",
  },

  checkContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  pending: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#555",
  },

  done: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#4D7031",
    backgroundColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    fontFamily: commonStyles.fonts.title,
    color: commonStyles.colors.mainText,
    fontSize: 12,
  },

  date: {
    fontFamily: commonStyles.fonts.text,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },

  right: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },

  left: {
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  excludeText: {
    fontFamily: commonStyles.fonts.text,
    fontSize: 20,
    color: "white",
    margin: 10,
  },
});
