import React, { Component } from "react";

import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import Button from "../../../components/Button";

import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import { Spinner } from "native-base";

export default class IndividualExercise extends Component {

  constructor(props) {
    super(props);
    this.onVideoLoad = this.onVideoLoad.bind(this);
  }

  state = {
    hasVideo: false,
    videoLoaded: false,
    exercise: null,
  }

  componentDidMount() {
    const { exercise } = this.props.navigation.state.params;
    console.log("exercise:", exercise);
    let hasVideo = false;
    if (exercise.exVideo) hasVideo = true;

    this.setState({ hasVideo, exercise });
  }

  onVideoLoad() {
    this.setState({ videoLoaded: true });
  }

  render() {
    const { exercise } = this.state;

    if (exercise === null) return (<Spinner show={true} />);

    //TODO we need to change to firebase storage but current plan doesnt have good limits
    return (
      <View style={{ width: "100%", height: "100%" }}>
        {/* header container */}
        <View style={{ height: 50 }}>
          <View style={styles.header}>
            <Button style={styles.backButton} onPress={() => this.props.navigation.navigate("ExercisesList")}>
              <Ionicons name="md-arrow-round-back" size={35} color="#9599a2" />
            </Button>
            <Text style={styles.headerText}>{exercise.exName}</Text>
            <View style={{ width: 35 }} />
          </View>
        </View>

        {/* body container */}
        <View style={{ paddingTop: 20, flex: 1 }}>
          <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: "center" }}>
            {this.state.hasVideo ? <View style={styles.videoContainer}>
              <Video style={styles.video}
                source={{ uri: "https://drive.google.com/uc?export=download&id=" + exercise.exVideo }}
                repeat={true}
                muted={true}
                onLoad={this.onVideoLoad}
                resizeMode="contain"
              />
            </View> : null}
            <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
              <Text style={styles.labelText}>Type:</Text>
              <Text style={styles.typeText}>{exercise.exType}</Text>
            </View>
            <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
              <Text style={styles.labelText}>Start:</Text>
              <Text style={styles.typeText}>{exercise.exStart}</Text>
            </View>
            <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
              <Text style={styles.labelText}>Action:</Text>
              <Text style={styles.typeText}>{exercise.exAct}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const VIEW_WIDTH = Dimensions.get("window").width - 40;
const VIDEO_HEIGHT = Dimensions.get("window").width - 200;
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#324151",
    height: 50
  },
  backButton: {
    paddingLeft: 10,
    width: 35,
    height: 35
  },
  headerText: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
  videoContainer: {
    width: VIEW_WIDTH,
    borderWidth: 1,
    borderColor: "grey",
    height: VIDEO_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  video: {
    width: VIEW_WIDTH,
    height: VIDEO_HEIGHT,
  },
  labelText: {
    fontSize: 24,
    fontWeight: "800",
    marginRight: 20,
    width: 85
  },
  typeText: {
    fontSize: 24,
    width: VIEW_WIDTH - 105
  },
  videoCover: {
    flex: 1,
    width: VIEW_WIDTH,
    height: VIDEO_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255, .9)",
  },
});