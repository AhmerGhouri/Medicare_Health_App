export interface modalService {

    servicE_ID : number;
    icon? : string;
    servicE_DESC: string;
    // available : string;
    isActive? : boolean;
    avaiL_MOBILEAPP? : string


  }


export interface servicesData {
    servicE_ID: number;
    servicE_DESC: string;
    icon: string;
    avaiL_MOBILEAPP: string;
    avaiL_WEBAPP : string;
    isactive : boolean;
    loC_LAT : string;
    loC_LONG : string;
  }


export interface AuthProps {

    token? : string | null ,
    opaT_PNAME? : string | null , 
    weB_PASSWORD? : string | null ,
    authenticate? : string | null ,

}


export interface AuthProps {

  authState? : { token :  string | null , authenticated : boolean | null};
  onLogin? : (opaT_PNAME : string , weB_PASSWORD : string) => Promise<any> ;
  onRegister? : (mobileNo : string ,  password : string, emailId? : string ) => Promise<any>,
  onLogout?: ()=> Promise<any>;


}

export interface timeSlots {

  label : string,
  value : string,

}


export interface selectedTest {

  unique_id? : string,
  test_short_name?: string,
  isChecked ?: boolean,
  test_amount? : number
  test_name? : string

}

export type testData = {

  unique_id?: string;
  test_code? : string,
  test_name?: string;
  test_short_name?: string;
  test_description? : string


}