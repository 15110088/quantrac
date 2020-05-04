import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper'; 
import * as theme from '../../constants/theme';

class ChartAQI extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: "Circle",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: this.props.xChart,
          label: 'AQI',
          config: {
            drawValues: false,
            colors: [processColor('#08be51')],
          }
        }
        
        ],
        config: {
          barWidth: 0.3,
         
        }
      },
      xAxis: {
        valueFormatter: this.props.yChart,
        granularityEnabled: true,
        granularity: 1,            
      },

      marker: {
        enabled: true,
        markerColor: processColor('#fff'),
        textColor: processColor('#08be51'),
        markerFontSize: 14,
        
      },

    };
  }

    componentDidMount() {
    console.log("==========Chart AIQ========")
    console.log(this.props)
    this.setState({...this.state, highlights: [{x: 2, y:40}]})
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    console.log('====Chart====')
    console.log(this.props.xChart)
    return (
      
          <BarChart
            style={styles.chart}
            xAxis={this.state.xAxis}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={false}
           visibleRange={{x: { min: 3, max: 4 }}}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            highlights={this.state.highlights}
            marker={this.state.marker}
          />
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
      flex:1
  }
});


export default ChartAQI;
