import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { Avatar, Button, Badge } from "react-native-elements";
import MultiSelect from "react-native-multiple-select";
import { withFormik } from "formik";

const allTeams = ["1101", "1102", "1103", "1104", "1105"];

const getInitials = name => {
  if (!name.length) return "AP";

  const arr = name.split(" ");
  if (arr.length > 1) return `${arr[0][0].toUpperCase()}${arr[1][0].toUpperCase()}`;
  return arr[0].toUpperCase();
};

class UserForm extends Component {
  state = {
    teams: this.props.teams,
  }

  onSelectedItemsChange = teams => this.setState({ teams });

  render() {
    const { email, displayName, setFieldValue, handleSubmit } = this.props;
    const { teams } = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Avatar
                activeOpacity={0.7}
                rounded
                xlarge
                title={getInitials(displayName || "")}
              />
            </View>
          </View>
          <View style={styles.displayContainer}>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              fontSize={25}
              onChangeText={text => setFieldValue("displayName", text)}
              placeholder="Name"
              style={{
                marginVertical: 10,
              }}
              value={displayName}
            />
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              fontSize={16}
              onChangeText={text => setFieldValue("email", text)}
              placeholder="youremail@gmail.com"
              style={{
                marginBottom: 10,
              }}
              value={email}
            />
            <View style={styles.selectContainer}>
              <MultiSelect
                hideTags
                ref={(component) => { this.multiSelect = component; }}
                items={allTeams.map(team => ({ id: team, name: team }))}
                uniqueKey="id"
                selectedItems={teams}
                selectText="Add Team"
                searchInputPlaceholderText="Search Team #"
                onChangeInput={text => console.log(text)}
                onSelectedItemsChange={this.onSelectedItemsChange}
                displayKey="name"
                submitButtonText="Update Selection"
              />
            </View>
            {this.state.teams.map(team => (
              <Badge key={team} containerStyle={styles.tag}>
                <Text style={{ color: "white" }}>{team}</Text>
              </Badge>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSubmit}
              rounded
              style={styles.button}
              title="Update"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 10,
  },
  avatarContainer: {
    padding: 30,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  displayContainer: {
    flexDirection: "column",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: 175,
  },
  selectContainer: {
    width: 180,
  },
  tag: {
    backgroundColor: "#d3d3d3",
    width: 100,
    marginBottom: 10,
  },
});

export default withFormik({
  enableReinitialize: true,
  handleSubmit: () =>
    Alert.alert("Success", "You're profile was successfully updated."),
})(UserForm);
