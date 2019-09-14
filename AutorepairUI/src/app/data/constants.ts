export class Constants {

    public static MAX_JOBS_PER_SHEET = 10;
    public static MAX_HOURS_PER_SHEET = 20;
    public static MAX_PRICE_PER_SHEET = 200;

    public static JobCodes = {
        TYRES_ID : 1,
        BRAKESDISCS_ID : 2,
        BRAKESPADS_ID : 3,
        OIL_ID : 4,
        EXHAUST_ID : 5,
        MAX : 5
    };

    public static TyrePosition = {
        FRONT_LEFT : 1,
        FRONT_RIGHT : 2,
        BACK_LEFT : 3,
        BACK_RIGHT : 4,
        MAX : 4
    };

    public static AnswerCodes = {
        APPROVED : 1,
        REFERRED : 0,
        DECLINED : -1
    };
 }
