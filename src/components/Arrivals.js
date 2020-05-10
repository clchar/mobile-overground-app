import React from "react";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  // scrollView: {
  //   flex: 1,
  //   backgroundColor: "pink",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  text: {
    fontSize: 20
  }
});

export class Arrivals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], refreshing: false };
    this.onRefresh = this.onRefresh.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  onRefresh = () => {
    this.getData();
  };

  getData = async () => {
    this.setState({ refreshing: true });
    const stationId = "910GCLDNNRB";
    const res = await axios.get(
      `https://api.tfl.gov.uk/StopPoint/${stationId}/arrivals`
    );
    const data = res.data;
    console.log(data);

    this.setState({ data: data, refreshing: false });
  };

  render() {
    const { data, refreshing } = this.state;
    const dataSorted = data.sort(
      (a, b) => parseISO(a.expectedArrival) - parseISO(b.expectedArrival)
    );

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <View style={styles.container}>
          {dataSorted.map((el, i) => {
            const time = parseISO(el.expectedArrival);
            const timeFormatted = formatDistanceToNow(time);
            return (
              el.destinationName === "Stratford (London) Rail Station" && (
                <View key={i}>
                  <Text style={styles.text}>{timeFormatted}</Text>
                </View>
              )
            );
          })}
        </View>
      </ScrollView>
    );
  }
}