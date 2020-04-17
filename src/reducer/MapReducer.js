let appState = {
  data: [
    {
      id:1,
      colorHerder: '#ffffff',
      ColorValue: '#1e2oo1',
      PH: 100,
      DO: 9,
      Loai: 1,
      COORDINATES: [
        {
          latitude: 10.9597071,
          longitude: 106.8559846,
          // latitudeDelta: 0.09,
          // longitudeDelta: 0.09,
        },
      ],
    },


    {
      id:2,
      colorHerder: '#ffffff',
      ColorValue: '#1e2oo1',
      PH: 92,
      DO: 95,
      Loai: 1,
      COORDINATES: [
        {
          latitude: 10.962123,
          longitude: 106.8562447,
          // latitudeDelta: 0.09,
          // longitudeDelta: 0.09,
        },
      ],
    },
    {
      id:3,
      colorHerder: '#ffffff',
      ColorValue: '#1e2oo1',
      PH: 8,
      DO: 60,
      Loai: 1,
      COORDINATES: [
        {
          latitude: 10.9624706,
          longitude: 106.8562876,
          // latitudeDelta: 0.09,
          // longitudeDelta: 0.09,
        },
      ],
    },
    {
      id:4,
      colorHerder: '#ffffff',
      ColorValue: '#1e2oo1',
      PH: 20,
      DO: 55,
      Loai: 2,
      COORDINATES: [
        {
          latitude: 10.9608908,
          longitude: 106.8546888,
          // latitudeDelta: 0.09,
          // longitudeDelta: 0.09,
        },
      ],
    },

    {
      id:5,
      colorHerder: '#ffffff',
      ColorValue: '#1e2oo1',
      PH: 97,
      DO: 90,
      Loai: 2,
      COORDINATES: [
        {
          latitude: 10.9616176,
          longitude: 106.8551394,
          // latitudeDelta: 0.09,
          // longitudeDelta: 0.09,
        },
      ],
    },
    {
      id:6,
      colorHerder: '#ffffff',
      ColorValue: '#1e2oo1',
      PH: 50,
      DO: 45,
      Loai: 2,
      COORDINATES: [
        {
          latitude: 10.9595426,
          longitude: 106.854721,
          // latitudeDelta: 0.09,
          // longitudeDelta: 0.09,
        },
      ],
    },
    
  ],
};

const MapReducer = (state = appState, action) => {
  let newData = state.data;
  
  switch (action.type) {
    case 'Tot':
      //console.log("=tot")
      newData[action.indexAt].colorHerder='#3333FF'
      return {...state,data:newData};
    case 'Trungbinh':
     // console.log("=tb")
      newData[action.indexAt].colorHerder='#FFCC00'
      return {...state,data:newData};
    case 'Rattot':
     // console.log("=rattot")
      newData[action.indexAt].colorHerder='#33FF33'
      return {...state,data:newData};
      
    case 'Onhiemnang':
     // console.log("=Onhiemnang")
      newData[action.indexAt].colorHerder='#660000'
      return {...state,data:newData};
    case 'Onhiem':
     // console.log("=Onhiem")
      newData[action.indexAt].colorHerder='#EE0000' 
      return {...state,data:newData};
    case 'addPH':
      newData[action.indexAt].PH= newData[action.indexAt].PH+action.num
       return {...state,data:newData};
    case 'subPH':
      newData[action.indexAt].PH-=1
       return {...state,data:newData}


  }
  return state;
};

export default MapReducer;
