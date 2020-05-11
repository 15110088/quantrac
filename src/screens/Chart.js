import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper'; 
import * as theme from '../constants/theme';

class Chart extends React.Component {

  constructor(props) {
    super(props);     
    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: Array.from(this.props.xChartPH),
            
          label: 'PH',
          config: {
            drawValues: false,
            colors: [processColor('#8C54FF')],
          }
        }, {
          values: Array.from(this.props.xChartDO),
          label: 'DO',
          config: {
            drawValues: false, 
            colors: [processColor('#2E5BFF')],
            
          } 
        }
        ],
        config: {
          barWidth: 0.2,
          group: {
            fromX: 0,
            groupSpace: 0.4,
            barSpace: 0.1,
          
          },
        }
      },
      xAxis: {
        valueFormatter: Array.from(this.props.yChartPH),
        granularityEnabled: true,
        granularity: 1,
      
        centerAxisLabels: true
      },

      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('#000'),
        markerFontSize: 14,
        
      },

      

    };
  }

    componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({...this.state, highlights: [{x: 1, y:40}, {x: 2, y:50}]})
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
    return (
      
          <BarChart
           
            
     

            style={styles.chart}
            xAxis={this.state.xAxis}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={false}
            visibleRange={{x: { min: 3, max: 4 }}}// dùng để sroll
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


export default Chart;
