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
      nghia:{
        dataSets:[{
          value:[0,2,33,1,22,566,222,12]
        }
      ]
        
      },
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
          values:  Array.from(this.props.xChart), //[10, 24, 24, 17, 22],  // ["12:00AM", "01:00AM", "02:00AM", "03:00AM", "04:00AM"],
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
        valueFormatter:Array.from(this.props.yChart),
//[29, 24, 24, 17, 22, 33],
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

  componentWillMount() {
    console.log("==========Chart AIQ========")
    console.log(this.props.xChart)
    this.setState({...this.state, highlights: [{x: 2, y:40}]})
    this.setState({
        nghia:{
            ...this.state.nghia,
            ...this.state.nghia.dataSets,
            value:this.props.xChart
        }
    })
    console.log(this.state.nghia.dataSets)
  }
  componentDidMount(){
     console.log('==============================')
      console.log(this.state.nghia.dataSets)
    console.log(this.state.data.dataSets)
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
