import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text, Picker } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Avatar } from "react-native-elements";
import LoginService from "../../services/LoginService";
import { Teams, Users } from "../../entities";

import Spinner from "../../components/Spinner";
import Button from "../../components/Button";

class Profile extends Component {
  constructor(props) {
    super(props);
  }


  state = {
    first: "",
    last: "",
    email: "",
    team: null,
    teams: [],
    program: "None",
    editing: false,
    editingTeam: false,
    loading: true,
  }

  async componentDidMount() {
    await Teams.getList().then(async (teams) => {
      this.setState({ teams });
    });

    LoginService.getCurrentUser().then(async (user) => {
      const team = this.state.teams.find(({ id }) => id === user.team);
      const program = null;

      this.setState({
        first: user.first,
        last: user.last,
        email: user.id,
        team,
        program: (program && program.exists) ? `${program.data().sport} - Level ${program.data().level}` : "None",
        loading: false
      });
    });
  }

  updateProfileInfo() {
    const { email, first, last, team } = this.state;
    Users.setByID(email, { first, last, team: team && team.id });
    this.setState({ editing: false, editingTeam: false });
  }

  render() {
    if (this.state.loading)
      return (
        <View style={styles.spinnerContainer} >
          <Spinner show />
        </View >
      );

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Avatar
                activeOpacity={0.7}
                rounded
                xlarge
                title={this.state.first[0] + this.state.last[0]}
              />
            </View>
          </View>
          <Button style={styles.editButton}
            onPress={() => this.setState({ editing: !this.state.editing, editingTeam: false })}>
            <Text style={styles.editButtonText}>{this.state.editing ? "Stop Editing" : "Edit Profile Info"}</Text>
          </Button>
          <View style={styles.displayContainer}>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 75, marginTop: 4, fontSize: 16 }}>First: </Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                fontSize={25}
                onChangeText={first => this.setState({ first })}
                placeholder="John"
                style={this.state.editing ? styles.editingTextBox : styles.regularTextBox}
                value={this.state.first}
                editable={this.state.editing}
                selectTextOnFocus={this.state.editing}
              />
            </View>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 75, fontSize: 16, alignItems: "center" }}>Last: </Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                fontSize={25}
                onChangeText={last => this.setState({ last })}
                placeholder="Doe"
                style={this.state.editing ? styles.editingTextBox : styles.regularTextBox}
                value={this.state.last}
                editable={this.state.editing}
                selectTextOnFocus={this.state.editing}
              />
            </View>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 75, fontSize: 16 }}>Email: </Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                fontSize={16}
                onChangeText={email => this.setState({ email })}
                placeholder="email@email.com"
                style={this.state.editing ? styles.editingTextBox : styles.regularTextBox}
                value={this.state.email}
                editable={this.state.editing}
                selectTextOnFocus={this.state.editing}
              />
            </View>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 75, marginTop: 4, fontSize: 16 }}>Team: </Text>
              {this.state.editing && this.state.editingTeam ? (
                <Picker
                  selectedValue={this.state.team && this.state.team.id}
                  style={{ flex: 1, marginLeft: 4, marginTop: 4 }}
                  onValueChange={(value, index) => {
                    this.setState({ team: value && this.state.teams[index - 1] });
                  }}
                >
                  <Picker.Item label="None" value={null} />
                  {this.state.teams.map((team) => (
                    <Picker.Item key={team.id} label={`${team.school}: ${team.sport}`} value={team.id} />
                  ))}
                </Picker>
              ) : (
                <Text style={{ flex: 1, marginLeft: 4, marginTop: 4, fontSize: 16 }}>
                  {this.state.team ? this.state.team.school : "None"}
                </Text>)
              }
              {this.state.editing && !this.state.editingTeam ? (
                <Button onPress={() => this.setState({ editingTeam: true })} style={{ backgroundColor: "red", marginTop: 4, paddingHorizontal: 5 }}>
                  <Text style={{ color: "white", fontSize: 16 }}>Edit Team</Text>
                </Button>
              ) : null}
            </View>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 75, marginTop: 4, fontSize: 16 }}>Program: </Text>
              <Text style={{ flex: 1, marginLeft: 4, marginTop: 4, fontSize: 16 }}>{this.state.program}</Text>
              {this.state.editing ? (
                <Button onPress={() => console.log("leave program")} style={{ backgroundColor: "red", marginTop: 4, paddingHorizontal: 5 }}>
                  <Text style={{ color: "white", fontSize: 16 }}>Leave Program</Text>
                </Button>
              ) : null}
            </View>
          </View>
          {this.state.editing && (
            <Button style={styles.editButton}
              onPress={() => this.updateProfileInfo()}>
              <Text style={styles.editButtonText}>Save Changes</Text>
            </Button>
          )}
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    backgroundColor: "white",
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
  spinnerContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  editButton: {
    width: "100%",
    height: 20
  },
  editButtonText: {
    textAlign: "center",
    fontSize: 12,
    color: "#3080C0"
  },
  editingTextBox: {
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    marginBottom: 3,
    padding: 3,
    backgroundColor: "lightgrey"
  },
  regularTextBox: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0)",
    marginBottom: 3,
    padding: 3
  }
});

export default function ProfileScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Profile: { screen: Profile } },
    { navigationOptions: navigationOptionsFunc },
  );
}
