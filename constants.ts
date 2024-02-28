export interface modalService {

    servicE_ID : number;
    icon? : string;
    servicE_DESC: string;
    // available : string;
    isActive? : boolean;
    avaiL_MOBILEAPP? : string


  }

export interface appUser {

  titlE_ID? : string | null,
  address? : string | null,
  autoid? : number | null,
  datafrom? : string | null,
  dob? : string | null,
  email? : string | null,
  fname? : string | null,
  gender? : string | null,
  isactive? : string | null,
  mob? : string | null | any,
  password? : string | null,
  pname? : string | null

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
    user? : userData

}


export interface AuthProps {
  
  authState? : {
    user: any; token :  string | null , authenticated : boolean | null
};
  onLogin? : (opaT_PNAME : string , weB_PASSWORD : string) => Promise<any> ;
  onRegister? : (mobileNo : string ,  password : string, title? : string , emailId? : string , fullName? : string , fatherName? : string  , gender? : string , dateofbirth? : string) => Promise<any>,
  onMrCreation? : (opaT_ID : number, opaT_PNAME: string, opaT_PHONE : string , email? : string | null, weB_PASSWORD? : string | null , rolE_ID? : string, opaT_STATUS? : string, opaT_CITY_ID?: string, opaT_RDATE? : string, opaT_RENT_EMP_ID? : string | null, opaT_SEX? : string, opaT_TITLE_ID? : string, opaT_VISIT_NO? : null) => Promise<any>,
  onLogout?: ()=> Promise<any>;


}

export interface timeSlots {

  label : string,
  value : string,

}


export interface selectedTest {

  ltesT_ID :	string,
  ltesT_DESC? :	string,
  tesT_DESCRIPTION?	:	string,
  amt?	:	string,
  opaT_ID?	:	string | null,
  tranS_ID?:	string | null,
  currentaddress?	:	string | null,
  samplE_COL_DATE?	:	string | null,
  samplE_COL_TIME?	:	string | null,

}

export type testData = {

  ltesT_ID? :	string,
  ltesT_DESC? :	string,
  tesT_DESCRIPTION?	:	string,
  amt?	:	string,
  opaT_ID?	:	string | null,
  tranS_ID? :	string | null,
  currentaddress?	:	string | null,
  samplE_COL_DATE?	:	string | null,
  samplE_COL_TIME?	:	string | null


}

export interface titleMrMs {

  label? : string,
  value? : string


}


export interface regForm {

  mobileno : string,
  fullname : string,
  fathername : string,
  pswd : string,
  gender : string,
  dob : string



}

export interface error {

  mobileno? : string,
    password? : string,
    name? : string,
    father_name? : string,
    gender? : string,
    dateOfBirth? : string


}

export interface errors {

  mobiletype? : boolean,
  passwordtype? : boolean,
  nametype? : boolean,
  father_nametype? : boolean,
  dateOfBirthtype? : boolean,
  gendertype? :  boolean

}

export interface userData {

  titlE_ID? : string | null,
  address? : string | null,
  autoid? : number | null,
  datafrom? : string | null,
  dob? : string | null,
  email? : string | null,
  fname? : string | null,
  gender? : string | null,
  isactive? : string | null,
  mob? : string | null | any,
  password? : string | null,
  pname? : string | null

}

export interface bottomSheetDataType { 
  email? : string | null ,
  opaT_CITY_ID? : string | null ,
  opaT_ID? : number,
  opaT_PNAME? : string,
  opaT_RDATE? : string ,
  opaT_RENT_EMP_ID? : string | null,
  opaT_SEX? : string,
  opaT_STATUS? : string,
  opaT_TITLE_ID? : string,
  opaT_VISIT_NO? : string | null,
  rolE_ID: string | null,
  weB_PASSWORD? : string | null}


  export interface searchProps {
    onChange : (text : string) =>  void;
  }

  export interface LabTestData {
    amt?: string,
    currentaddress?: null | string ,
    isChecked?: boolean, 
    ltesT_DESC?: string, 
    ltesT_ID?: any , 
    opaT_ID: string | null, 
    samplE_COL_DATE?: string | null, 
    samplE_COL_TIME?: string | null, 
    tesT_DESCRIPTION?: string,
    tranS_ID?: string | null
    // Add other properties as needed
  }

  export interface checkedData {

    email?: null, 
    opaT_CITY_ID?: string, 
    opaT_ID?: number, 
    opaT_PHONE?: string, 
    opaT_PNAME?: string, 
    opaT_RDATE?: string, 
    opaT_RENT_EMP_ID?: string, 
    opaT_SEX? : string, 
    opaT_STATUS?: string, 
    opaT_TITLE_ID? : string, 
    opaT_VISIT_NO?: string, 
    rolE_ID?: string, 
    weB_PASSWORD?: string

  }


  export interface postDatatype {


    amt?: string;
    currentaddress?: string;
    ltesT_DESC?: string;
    ltesT_ID?: string;
    opaT_ID?: string;
    samplE_COL_DATE?: string;
    samplE_COL_TIME?: string | null;
    tesT_DESCRIPTION?: string;
    // tranS_ID?: string;

    // amt?: string | undefined,
    // ltesT_DESC?: string | undefined,
    // ltesT_ID?: string,
    // tesT_DESCRIPTION?: string | undefined,
    // opaT_ID?: string,
    // currentaddress?: string,
    // samplE_COL_DATE?: string,
    // samplE_COL_TIME?: string |null



  }


  export interface opatValuesType {

    opaT_ID?: string,
    currentaddress?: string,
    samplE_COL_DATE?: string,
    samplE_COL_TIME?: string | null,
    

  }