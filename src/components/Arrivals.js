import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { formatDistanceToNow, parseISO } from "date-fns";

import React from "react";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center"
  },
  text: {
    fontSize: 20
  },
  errorMessage: {
    fontSize: 20
  }
});

export class Arrivals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], refreshing: false, error: false };
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
    try {
      this.setState({ refreshing: true });
      const stationId = "910GCLDNNRB";
      const res = await axios.get(
        `https://api.tfl.gov.uk/StopPoint/${stationId}/arrivals`
      );
      const data = res.data;
      this.setState({ data: data, refreshing: false });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    const { data, refreshing } = this.state;
    const dataSorted = data.sort(
      (a, b) => parseISO(a.expectedArrival) - parseISO(b.expectedArrival)
    );

    return (
      <View style={styles.container}>
        {this.state.error ? (
          <Text style={styles.errorMessage}>Oops something went wrong!</Text>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <View>
              {dataSorted.map((el, i) => {
                const time = parseISO(el.expectedArrival);
                const timeFormatted = formatDistanceToNow(time);
                const destinationName =
                  el.destinationName.includes("Stratford") &&
                  el.destinationName;

                return (
                  el.destinationName === destinationName && (
                    <View key={i}>
                      <Text style={styles.text}>{timeFormatted}</Text>
                    </View>
                  )
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
