//let appState = null;

// loaddata = async () => {
//   try {
//     let response = await fetch(
//       'http://25.36.7.253/DuLieuQuanTracServices.svc/GetRandomNuocTuDong?record=4',
//     );
//     let json = await response.json();
//     console.log('========open======');
//     appState.data[0].dataPoint = json;

//     appState.data[0].dataPoint.map((v, i) => {
//       appState.data[0].dataPoint[i] = {
//         ...appState.data[0].dataPoint[i],
//         colorHerder: '#fff',
//       };

//       console.log(appState.data[0].dataPoint[i]);
//     });
//     appState.
//     console.log('========close======');
//     return JSON.stringify(json);
//   } catch (error) {
//     console.error(error);
//   }
// };
// console.log('========on======');

// appState = {
//   data: null
// };

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
      newData[action.indexAt].keyColor = '#3333FF';
      return {...state, data: newData};
    case 'Trungbinh':
      newData[action.indexAt].keyColor = '#FFCC00';
      return {...state, data: newData};
    case 'Rattot':
      newData[action.indexAt].keyColor = '#33FF33';
      return {...state, data: newData};

    case 'Onhiemnang':
      newData[action.indexAt].keyColor = '#660000';
      return {...state, data: newData};
    case 'Onhiem':
      newData[action.indexAt].keyColor = '#EE0000';
      return {...state, data: newData};
    case 'getDataKhiTuDong':
      console.log('getDataKhiTuDong')//set du lieu data moi
       return {...state,data:action.data};
  }
  return state;
};

export default MapReducer;
