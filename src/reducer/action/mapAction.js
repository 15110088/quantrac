const addPH = (index,num) => {
    return {
      type: "addPH",
      indexAt: index,
      num:num
    }
  }
  
  export const subPH = (index) => {
    return {
      type: "subPH",
      indexAt: index
    }
  }
  export const getDataKhiTuDong = (index,value) => {
    
    return {
      type: "getDataKhiTuDong",
      
      data: value
    }
  }
  export const xacdinhmau = (index,value) => {


    var PH_rattot=100;
    var PH_rattot_tot=90;
    var PH_tot_trungbinh=75;
    var PH_trunbinh_kem=50;
    var PH_kem_onhiem=25;
    var PH_onhiem_onhiemnang=0;

    var DO_rattot=100;
    var DO_rattot_tot=90;
    var DO_tot_trungbinh=75;
    var DO_trunbinh_kem=50;
    var DO_kem_onhiem=25;
    var DO_onhiem_onhiemnang=0;

    var type=""
    //0-25
    if((value.PH>PH_onhiem_onhiemnang && value.PH<PH_kem_onhiem)||
      (value.DO>DO_onhiem_onhiemnang && value.DO<DO_kem_onhiem))
    {
      type="Onhiemnang"
    }
    //25-50
    if((value.PH>PH_kem_onhiem && value.PH<PH_trunbinh_kem)||
    (value.DO>DO_kem_onhiem && value.DO<DO_trunbinh_kem))
    {
      type="Onhiem"
    }
    //50-75
    if((value.PH>PH_trunbinh_kem && value.PH<PH_tot_trungbinh)||
    (value.DO>DO_trunbinh_kem && value.DO<DO_tot_trungbinh))
    {
      type="Trungbinh"
    }
    //75-90
    if((value.PH>PH_tot_trungbinh && value.PH<PH_rattot_tot)||
    (value.DO>DO_tot_trungbinh && value.DO<DO_rattot_tot))
    {
      type="Tot"
    }
    //90-100
    if((value.PH>PH_rattot_tot && value.PH<PH_rattot)||
    (value.DO>DO_rattot_tot && value.DO<DO_rattot))
    {
      type="Rattot"
    }
    return {
      type:type,
      indexAt: index,
      value:value
    }
  }
  
  export default addPH;