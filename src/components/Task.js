import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o idioma português para o moment

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

  return (
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
            textDecorationLine: props.doneAt != null ? "line-through" : "none",
          }}
        >
          {props.desc}
        </Text>
        <Text style={styles.date}>{formatedDate + ""}</Text>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#AAA",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
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
});
