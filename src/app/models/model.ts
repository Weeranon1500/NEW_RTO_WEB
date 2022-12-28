export class RootDevices {
    devices!: Device[]
    summarize!: Summarize
  }
  
  export class Device {
    IDS: number[] = []
    DEVICE_TYPE!: string
    normal!: number
    offline!: number
    total!: number
  }
  
  export class Summarize {
    total!: number
    problem!: number
  
  }

  export class Chart {
    COUNT!: string
    DEVICE_TYPE_ID!: number
    DEVICE_TYPE_NAME!: string
    NUMWEEKYEAR!: number
    NUMMONTH!: number
    NUMWEEK!: number
    STATUS!: string
    PERCENT!: number
  }

  export class Heatmap {
    ID!: number
    STAMP_DATETIME!: string
    RAW_EVENT_ID: any
    PRE_EVENT_ID: any
    SITE_ID!: number
    SITE_NAME: any
    LOCATION_ID!: number
    LOCATION_NAME!: string
    DEVICE_ID!: number
    DEVICE_NAME!: string
    DEVICE_TYPE_ID!: number
    DEVICE_TYPE_NAME!: string
    EVENT_ID!: number
    EVENT_NAME!: string
    EVENT_TYPE_ID!: number
    EVENT_TYPE_NAME!: string
    EVENT_DESC!: string
    STATUS!: string
    UPDATE_COUNTER!: number
    LAST_UPDATE!: string
    LAST_RAW_EVENT_ID: any
    LAST_PRE_EVENT_ID: any
    CREATE_AT!: string
    UPDATE_AT!: string
    DELETE_AT: any
    LATITUDE!: string
    LONGTITUDE!: string
    TYPE: any
  }

  export class TSKDeviceRoot {
    devices!: TSKDevice[]
    summarize!: TSKSummarize
  }
  
  export class TSKDevice {
    DEVICE_TYPE!: string
    online!: number
    offline!: number
    total!: number
  }
  
  export class TSKSummarize {
    online!: number
    offline!: number
    total!: number
  }

  export class LogRootObject {
  data!: LogDatum[];
  }

  export class LogDatum {
    NAME!: string;
    log!: LogDetail[];
  }

  export class LogDetail {
    startDate!: string;
    stopDate!: string;
    online!: number;
    offline!: number;
    total!: number;
  }

  export class LogMonthRootObject {
  data!: LogMonthDatum[];
}

  export class LogMonthDatum {
    NAME!: string;
    log!: LogMonthDetail[];
  }

  export class LogMonthDetail {
    startDate!: string;
    stopDate!: string;
    online!: number;
    offline!: number;
    total!: number;
  }

  export class LogHoursObject {
    data!: DataLogHours;
  }

  export class DataLogHours {
    eventByHours!: EventByHour[];
    dailySupportStatus!: DailySupportStatus;
  }

  export class EventByHour {
    event!: Event;
    sum!: number;
    date_time!: string;
  }

  export class Event {
  }
      

  export class DailySupportStatus {
    open!: number;
    close!: number;
    inprocess!: number;
  }

  export class LogWeeklyObject {
  data!: DataLogWeekly[];
}

export class DataLogWeekly {
  type!: string;
  data!: LogWeekly[];
}

export class LogWeekly {
  startDate!: string;
  stopDate!: string;
  count!: number;
}

export class LogMonthlyObject {
  data!: DataLogMonthly[];
}

export class DataLogMonthly {
  type!: string;
  data!: LogMonthly[];
}

export class LogMonthly {
  startDate!: string;
  stopDate!: string;
  count!: number;
}

export class EventHistoryObject {
  data!: DataHistory[];
}

export class DataHistory {
  STAMP_DATETIME!: string;
  SITE_ID!: number;
  SITE_NAME!: string;
  EVENT_ID!: number;
  EVENT_NAME!: string;
  STATUS!: string;
  url!: any[];
}
/************************************************************************* FR API ********************************************************************/

export class FRObject {
  data!: DataFR[];
  pagination!: PaginationFR;
}

export class PaginationFR {
  page!: number;
  limit!: number;
  allPage!: number;
}

export class DataFR {
  ID!: number;
  STAMP_DATETIME!: string;
  FR_PATH_IMAGE_OVERVIEW!: string;
  FR_PATH_IMAGE_BASE!: string;
  FR_PATH_IMAGE_SNAPSHOT!: string;
  FIRST_NAME!: string;
  LAST_NAME!: string;
  REF_ID!: string;
  DEVICE_NAME?: any;
  LOCATION_NAME?: any;
  LATITUDE!: string;
  LONGITUDE!: string;
}

export class FRRoute {
  data!: DataFRRoute[];
  pagination!: PaginationFRRoute;
}

export class PaginationFRRoute {
  page!: number;
  amount!:number;
  limit!: number;
  allPage!: number;
  lastID!: number;
}

export class DataFRRoute {
  ID!: number;
  STAMP_DATETIME!: string;
  FR_PATH_IMAGE_OVERVIEW!: string;
  FR_PATH_IMAGE_BASE!: string;
  FR_PATH_IMAGE_SNAPSHOT!: string;
  FIRST_NAME!: string;
  LAST_NAME!: string;
  REF_ID!: string;
  DEVICE_NAME?: any;
  LOCATION_NAME?: any;
  LATITUDE!: string;
  LONGITUDE!: string;
}

/************************************************************************* LPR API ********************************************************************/

export class LPRObject {
  data!: DataLPR[];
  pagination!: PaginationLPR;
}

export class PaginationLPR {
  page!: number;
  limit!: number;
  allPage!: number;
}

export class DataLPR {
  ID!: number;
  CREATE_AT!: string;
  LPR_PATH_IMAGE_PLATE!: string;
  LPR_PATH_IMAGE_CAR!: string;
  LPR_LICENSE!: string;
  LPR_PROVINCE!: string;
  LPR_TYPE_CAR!: string;
  LPR_BRAND_CAR!: string;
  LPR_MODEL_CAR!: string;
  LPR_COLOR_CAR!: string;
  LATITUDE!: string;
  LONGITUDE!: string;
  LOCATION_ID!: number;
}

export class LPRRoute {
  data!: DataLRPRoute[];
  pagination!: PaginationLPRRoute;
}

export class PaginationLPRRoute {
  page!: number;
  amount!:number;
  limit!: number;
  allPage!: number;
  lastID!: number;
}

export class DataLRPRoute {
  ID!: number;
  CREATE_AT!: string;
  LPR_PATH_IMAGE_PLATE!: string;
  LPR_PATH_IMAGE_CAR!: string;
  LPR_LICENSE!: string;
  LPR_PROVINCE!: string;
  LPR_TYPE_CAR!: string;
  LPR_BRAND_CAR!: string;
  LPR_MODEL_CAR!: string;
  LPR_COLOR_CAR!: string;
  LATITUDE!: string;
  LONGITUDE!: string;
  LOCATION_ID!: number;
}

/**********************************************************USER PROFILE GSOC ***************************************************/

export class UserProfile {
  status!: number;
  message!: string;
  data!: DataUserProfile[];
}

export class DataUserProfile {
  ID!: number;
  LOGIN_USERNAME!: string;
  USER_EXPIRE?: any;
  PASSWORD_EXPIRE?: any;
  REGISTERATION_ID?: any;
  TITLE_NAME!: string;
  FIRST_NAME!: string;
  MIDDLE_NAME!: string;
  LAST_NAME!: string;
  NICK_NAME!: string;
  BIRTH_DATE?: any;
  PREFERRED_LANGUAGE?: any;
  GENDER?: any;
  STATUS!: number;
  MOBILE?: any;
  EMAIL?: any;
  WORK_PROFILE?: any;
  LAST_ACCESS?: any;
  COUNT_LOGIN?: any;
  LOCK_USER_FLAG!: number;
  ROLE_ID!: number;
  JOIN_USER_MAP_GROUP!: JOINUSERMAPGROUP[];
  SITE!: number[];
  DEVICE!: number[];
  LOCATION!: number[];
  MENU!: MENU[];
}

export class MENU {
  ID!: number;
  MENU_NAME!: string;
  DESCRIPTION?: any;
  APP_NAME!: string;
}

export class JOINUSERMAPGROUP {
  ID!: number;
  USERS_ID!: number;
  USERS_GROUP_ID!: number;
}

/*********************************************************Site Report************************************************************ */
export class SiteReport {
  logs_SITE_ID!: number;
  logs_SITE_NAME!: string;
}