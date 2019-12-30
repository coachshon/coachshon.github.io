using BusinessLayer;
using BusinessLayer.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Services;
using System.Linq;
using System.ComponentModel;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.DirectoryServices;



/// <summary>
/// Using Default.aspx.cs as web service via [WebMethod] attribute to allow AJAX calls
/// [WebMethod] must be declared as static 
/// [WebMethod] requires <httpModules> in web.config for the response to contain the method's return value
/// Generic WebMethods can be sent generic object or string(s)
/// For extjs the payload is an empty object {} ; created in the proxy build method- see: Ext.ux.data.proxy.AjaxASP</param>
/// </summary>
public partial class _Default : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
       
        Server.Transfer("index.html");  // no http request; so, no change in url

        
    }


    /// <returns>User session authentication</returns>     
    [WebMethod]
    // public static List<object> ReadUser()
    public static List<UserSession> AuthenticateUser()
    {
        List<UserSession> list = new List<UserSession>();

        string loginUser = StringHelper.QueryString(HttpContext.Current.Request, "ntid", "");
        loginUser = loginUser.Substring(loginUser.IndexOf("\\") + 1).ToUpper();  // take off any domain entry... AMER\

        string loginPassword = StringHelper.QueryString(HttpContext.Current.Request, "password", "");
        //a success means the password was right
        bool success = false; 

                //LDAP password check
                //use the users credentials for the query
            DirectoryEntry root = new DirectoryEntry(
                "LDAP://kiramrdom01.amer.pfizer.com:389", 
                loginUser, 
                loginPassword
                );

            //query for the username provided
            DirectorySearcher searcher = new DirectorySearcher(
                root, 
                "(sAMAccountName=" + loginUser + ")"
                );   
            try {
                searcher.FindOne();
                success = true;
            }
            catch {
                success = false;
            }
            

            if (success)
            {
                
                // ONCO app permissions check    
                UserSession user = new UserSession();   // set this user's properties      
                if (user == null || user.NTID == "ANONYMOUS")
                {
                    //not allowed
                    //sending back null, caught in Action.js authenticate
                }
                else
                {
                    list.Add((UserSession)user);

                }

            }
            return list;
      

    }


    /// <summary>
    /// Called from store.permission.Permissions create method
    ///Creates permission table record
    /// </summary>
    /// <returns>List\Object of user permission rows</returns>      
    [WebMethod]
    public static PermissionRow CreatePermission(List<PermissionRow> data)
    {
        Permission bl = new Permission();
        PermissionRow d = data[0];

        PermissionRow newRecord= bl.Create(d);
        
        return newRecord;

    }

    public static List<Dictionary<string, object>> CreateDictionaryList(DataTable dataTable)
    {
        List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();

        if (dataTable != null)
        {
            foreach (DataRow row in dataTable.Rows)
            {
                Dictionary<string, object> dictRow = new Dictionary<string, object>();
                foreach (DataColumn col in dataTable.Columns)
                    dictRow[col.ColumnName] = row[col.ColumnName];
                list.Add(dictRow);
            }
        }

        return list;
    }


    /// <summary>
    /// Called from store.UAT.UATs create method
    ///Creates UAT table record
    /// </summary>
    /// <returns>List\Object of user UAT rows</returns>      
    [WebMethod]
    public static UATRow CreateUAT(List<UATRow> data)
    {
        UAT bl = new UAT();
        UATRow d = data[0];

        UATRow newRecord = bl.Create(d, StringHelper.QueryString(HttpContext.Current.Request, "ntid", ""));


        //send email notification
        string[] sendTo = new string[] { "Shauna.Hogan@pfizer.com" };
        string subject = "OncoBot Bug";
        string msg = d.ISSUE;
        EmailHelper.Send(sendTo, subject, msg);

        return newRecord;

    }



    /// <summary>
    /// Called from DashboardController init
    /// </summary>
    [WebMethod]
    public static string DataMonth()
    {
        string key = StringHelper.QueryString(HttpContext.Current.Request, "key", "");

        string msg = "";
        string sql = @"SELECT DATA_MONTH_TEXT FROM PDWREPORT.V_ONCO_APP_LAST_REFRESH_DTS WHERE SUBJECT_AREA='" + key + @"'";

       //ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        if (dataTable.Rows.Count > 0)
        {
            msg = dataTable.Rows[0][0].ToString();
        }
        return msg;
    }


    /// <summary>
    /// Called from store.permission.Permissions destroy method
    ///Creates permission table record
    /// </summary>
    /// <returns>List\Object of user permission rows</returns>      
    [WebMethod]
    public static string DestroyPermission(List<PermissionRow> data)
    {

        Permission bl = new Permission();
        foreach (PermissionRow d in data)
        {
            bl.Destroy(d);
        }
        return "DELETED";

    }

    /// <summary>
    /// Called from store.UAT.UATs destroy method
    ///Creates UAT table record
    /// </summary>
    /// <returns>List\Object of user UAT rows</returns>      
    [WebMethod]
    public static string DestroyUAT(List<UATRow> data)
    {

        UAT bl = new UAT();
        foreach (UATRow d in data)
        {
            bl.Destroy(d);
        }
        return "DELETED";

    }



    /// <summary>
    /// Called from store.hco.Accounts read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadAccount()
    {        
        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");
        string rule = StringHelper.QueryString(HttpContext.Current.Request, "rule", "");

        if (string.IsNullOrEmpty(level))
        {
            level = ntid;
        }

        string sql = @"SELECT HIER_LEVEL_CODE, ACCT_KEY, ACCT_NAME_DISPLAY AS NAME_DISPLAY, ACCT_MDM_ID as CCV_ID, ACCT_MAIN_PHONE as PHONE, ACCT_PRIM_ADDR_DISPLAY as ADDRESS, 
                     ACCT_PRIM_ADDR_CITY as CITY, ACCT_PRIM_ADDR_PROV as PROVINCE, ACCT_PRIM_ADDR_POSTCODE as POSTALCODE, AFFL_CUST_COUNT,
                    SUBSTR(
                                NVL2(ACCT_PRIM_ADDR_DISPLAY, ', ' || ACCT_PRIM_ADDR_DISPLAY, NULL)
                                    || NVL2(ACCT_PRIM_ADDR_CITY, ', ' || ACCT_PRIM_ADDR_CITY, NULL)
                                    || NVL2(ACCT_PRIM_ADDR_POSTCODE, ', ' || ACCT_PRIM_ADDR_POSTCODE, NULL)
                        ,2) AS ADDRESS_FULL
                    FROM PDWREPORT.RPT_ONCO_APP_MY_ACCOUNTS";

       



        if (!string.IsNullOrEmpty(rule))
        {  // this is call from filters
            string parent = StringHelper.QueryString(HttpContext.Current.Request, "parent", "");
            sql = @"select * from table(PDWREPORT.FT_ONCO_ACCOUNT_FILTERS(" + rule + ",'" + level + "','" + parent + "'))";
        }
        else
        {
            string key = StringHelper.QueryString(HttpContext.Current.Request, "key", "");
            if (string.IsNullOrEmpty(key))
            { 
                sql += " WHERE HIER_LEVEL_CODE='" + level + "'";

            }
            else
            {
                // this is loading an account affiliate from contact
                sql += " WHERE HIER_LEVEL_CODE='NATIONAL' AND ACCT_KEY= " + Convert.ToInt32(key);

            }

            sql += @" ORDER BY NAME_DISPLAY";
        }
            
            
          
        
       //ExceptionUtility.Log("ReadAccount");
        //ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        return CreateDictionaryList(dataTable);
    }

    /// <summary>
    /// Called from store.hco.Affiliates read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadAccountAffiliate()
    {


        int key = Convert.ToInt32(StringHelper.QueryString(HttpContext.Current.Request, "key", ""));

        string sql = @"SELECT CUST_KEY, CUST_NAME_DISPLAY AS NAME_DISPLAY, CUST_PRIM_ADDR_DISPLAY as ADDRESS, CUST_PRIM_SPEC_LONG_DESC as SPECIALTY 
                        FROM PDWREPORT.V_ONCO_APP_ACCT_CUST_AFFL
                        WHERE CUST_PRIM_ACCT_KEY=" + key + @" 
                        ORDER BY NAME_DISPLAY";



        //ExceptionUtility.Log("ReadAccountAffiliate");
        //ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        return CreateDictionaryList(dataTable);
    }

    /// <summary>
    /// Called from store.hco.Brands read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadAccountBrand()
    {

      int key = Convert.ToInt32(StringHelper.QueryString(HttpContext.Current.Request, "key", ""));
      string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
      string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");

      if (string.IsNullOrEmpty(level))
      {
          level = ntid;
      }

      string sql = @"SELECT HIER_LEVEL_CODE, ACCT_KEY, BRAND_CODE, 
                    '$' || LTRIM (TO_CHAR (SALES_YTD, '999,999,999,999')) as SALES_YTD,
                    '$' || LTRIM (TO_CHAR (SALES_MAT, '999,999,999,999')) as SALES_MAT,
                    '$' || LTRIM (TO_CHAR (QUOTA_YTD, '999,999,999,999')) as QUOTA_YTD,
                    CALLS_YTD, 
                    case when SALES_YTD_GROWTH is not null then to_Char(round(SALES_YTD_GROWTH))||'%' else to_char(SALES_YTD_GROWTH) end as SALES_YTD_GROWTH,
                    PLANNED_CALLS, 
                    case when PERCENT_PLAN is not null then to_Char(round(PERCENT_PLAN))||'%' else to_char(PERCENT_PLAN) end as PERCENT_PLAN, 
                    SALES_MAT_RANK, 
                    SALES_MAT_GROWTH_RANK, 
                    TO_CHAR(LAST_SEEN_DATE,'YYYY-MM-DD') as LAST_SEEN_DATE
                    FROM PDWREPORT.RPT_ONCO_APP_MY_ACCOUNTS
                    WHERE (SALES_MAT<>0 or PLANNED_CALLS>0 or CALLS_YTD>0 )
                    AND HIER_LEVEL_CODE='" + level + @"' AND ACCT_KEY=" + key +
                   @" ORDER BY BRAND_CODE"; ;

      // ExceptionUtility.Log("ReadAccountBrand");
      // ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        return CreateDictionaryList(dataTable);
    }

    /// <summary>
    /// Called from store.hco.Filters read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<FilterRow> ReadAccountFilters()
    {
        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");

        if (string.IsNullOrEmpty(level))
        {
            level = ntid;
        }
        return new Filter().ReadRoot("ACCOUNT", level);

    }


    /// <summary>
    /// Called from store.hco.Sales read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadAccountSales()
    {        
            
        int key = Convert.ToInt32(StringHelper.QueryString(HttpContext.Current.Request, "key", ""));
        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");

        if (string.IsNullOrEmpty(level))
        {
            level = ntid;
        }

        // get this level, account brands
        string sql = @"SELECT BRAND_CODE
                    FROM PDWREPORT.RPT_ONCO_APP_MY_ACCOUNTS
                    WHERE SALES_MAT IS NOT NULL AND SALES_MAT<>0 AND BRAND_CODE!= 'NA' AND HIER_LEVEL_CODE='" + level + @"' AND ACCT_KEY=" + key;
        

        DataTable dataTable = new Query().Read(sql);
        //ExceptionUtility.Log(sql);

        if (dataTable.Rows.Count > 0)
        {
            // loop brand rows to build string in and sum strings
            String inList = "";
            String sumList = "";
            string val;

            foreach (DataRow row in dataTable.Rows)
            {
                val = row["BRAND_CODE"].ToString();
                inList += "'" + val + "',";
                sumList += "SUM(\"'" + val + "'\") AS " + val + ",";
            }
            inList = inList.TrimEnd(',');
            sumList = sumList.TrimEnd(',');

            //sql for sales...
            sql = @"SELECT DATE_KEY," + sumList + @"
            FROM(
            SELECT * 
            FROM PDWREPORT.V_ONCO_APP_ACCT_SAL
                            PIVOT(
                                SUM (SALES_AMOUNT)
                                FOR BRAND_CODE
                                 IN ( " + inList + @")
                            )
                        WHERE ACCT_KEY=" + key + @" AND HIER_LEVEL_CODE='" + level + @"'
                        ORDER BY DATE_KEY
            )
            GROUP BY DATE_KEY ORDER BY DATE_KEY";

            //ExceptionUtility.Log("ReadAccountSales");
            //ExceptionUtility.Log(sql);

            dataTable = new Query().Read(sql);
        }
        

        return CreateDictionaryList(dataTable);

    }



    /// <summary>
    /// Called from store.contact.Contacts read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadContact()
    {
        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", ""); 
        string rule = StringHelper.QueryString(HttpContext.Current.Request, "rule", "");

        if (string.IsNullOrEmpty(level))
        {
            level = ntid;
        }

        string sql = @"SELECT HIER_LEVEL_CODE, CUST_KEY, CUST_NAME_DISPLAY AS NAME_DISPLAY, CUST_MDM_ID as CCV_ID, CUST_PRIM_ACCT_MDM_ID as ACCT_CCV_ID, 
                     CUST_MAIN_PHONE as PHONE, CUST_PRIM_SPEC_LONG_DESC as SPECIALTY, 
                     CUST_PRIM_ADDR_DISPLAY as ADDRESS, CUST_PRIM_ADDR_CITY as CITY, CUST_PRIM_ADDR_PROV as PROVINCE, CUST_PRIM_ADDR_POSTCODE as POSTALCODE, 
                     SUBSTR(
                                NVL2(CUST_PRIM_ADDR_DISPLAY, ', ' || CUST_PRIM_ADDR_DISPLAY, NULL)
                                    || NVL2(CUST_PRIM_ADDR_CITY, ', ' || CUST_PRIM_ADDR_CITY, NULL)
                                    || NVL2(CUST_PRIM_ADDR_POSTCODE, ', ' || CUST_PRIM_ADDR_POSTCODE, NULL)
                        ,2) AS ADDRESS_FULL, CUST_CP_NOCALLS_FLAG, 
                     CUST_PRIM_ACCT_KEY as ACCT_KEY, CUST_PRIM_ACCT_NAME as ACCT_NAME_DISPLAY
                     FROM PDWREPORT.RPT_ONCO_APP_MY_CUSTOMERS";
                       

        if (!string.IsNullOrEmpty(rule))
        {  // this is call from filters
            string parent = StringHelper.QueryString(HttpContext.Current.Request, "parent", "");
            sql = @"select * from table(PDWREPORT.FT_ONCO_CUSTOMER_FILTERS(" + rule + ",'" + level + "','" + parent + "'))";
        }
        else
        {
            string key = StringHelper.QueryString(HttpContext.Current.Request, "key", "");
            if (string.IsNullOrEmpty(key))
            { // this is call from affliate
                sql += " WHERE HIER_LEVEL_CODE='" + level + "'";

            }
            else
            {
                // this is loading an contact affiliate from account
                sql += " WHERE HIER_LEVEL_CODE='NATIONAL' AND CUST_KEY= " + Convert.ToInt32(key);

            }

            sql += @" ORDER BY NAME_DISPLAY";
        }
            
            
        

        //ExceptionUtility.Log("ReadContact");
        //ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        return CreateDictionaryList(dataTable);
      
    }



    /// <summary>
    /// Called from store.hcp.Brands read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadContactBrand()
    {

        int key = Convert.ToInt32(StringHelper.QueryString(HttpContext.Current.Request, "key", ""));
        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");
        string plpd = StringHelper.QueryString(HttpContext.Current.Request, "plpd", "");
        string sql = "";

        if (string.IsNullOrEmpty(level))
        {
            level = ntid;
        }

        if (!string.IsNullOrEmpty(plpd))
        {
            sql = @"SELECT CUST_KEY, BRAND_CODE
                    FROM PDWREPORT.RPT_ONCO_APP_MY_CUSTOMERS
                    WHERE (TRX_MAT_AVG_RANK_TERR<>0 or TRX_MAT1_AVG <>0) AND HIER_LEVEL_CODE='" + level + @"' AND CUST_KEY=" + key;
        }
        else
        {

            sql = @"SELECT 
                    CUST_KEY, BRAND_CODE, CALLS_YTD, PLANNED_CALLS, 
                    case when PERCENT_PLAN is not null then to_Char(round(PERCENT_PLAN))||'%' else to_char(PERCENT_PLAN) end as PERCENT_PLAN, 
                    SEGMENT_CODE, SEGMENT_DESC,TRX_MAT_PRD_RANK_CODE, TRX_MAT_MKT_RANK_CODE, PSP_ENROL_YTD,
                    TO_CHAR(LAST_SEEN_DATE,'YYYY-MM-DD') as LAST_SEEN_DATE    
                    FROM PDWREPORT.RPT_ONCO_APP_MY_CUSTOMERS
                    WHERE 
                    (CALLS_YTD>0 or PLANNED_CALLS>0 or LAST_SEEN_DATE is not null or TRX_MAT_MKT_RANK_CODE IS NOT NULL) 
                    and HIER_LEVEL_CODE='" + level + @"' AND CUST_KEY=" + key + 
                   @" ORDER BY BRAND_CODE";
        }
        
        
        //ExceptionUtility.Log("ReadContactBrand");
        //ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        return CreateDictionaryList(dataTable);
    }



    /// <summary>
    /// Called from store.hcp.Filters read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<FilterRow> ReadContactFilters()
    {
        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");

        if (string.IsNullOrEmpty(level))
        {
            level = ntid;
        }
        return new Filter().ReadRoot("CUSTOMER", level);

    }

    /// <summary>
    /// Called from store.hpo.PLPD read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadContactPLPD()
    {
        Query bl = new Query();
        string brand = StringHelper.QueryString(HttpContext.Current.Request, "brand", "");
        string key = StringHelper.QueryString(HttpContext.Current.Request, "key", "");

        //get sql for plpd data
        string sql = @"SELECT PDWREPORT.F_ONCO_PLPD_COMP_SQL('" + brand + "','" + key + "') FROM DUAL";
        
        //ExceptionUtility.Log("ReadContactPLPD");
        //ExceptionUtility.Log(sql);        
        DataTable dataTable = bl.Read(sql);
        sql = dataTable.Rows[0][0].ToString();
       //ExceptionUtility.Log(sql);
        dataTable = bl.Read(sql);
        return CreateDictionaryList(dataTable);

    }

    
    /// <summary>
    /// Called from store.glance.Brands read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadGlanceBrand()
    {

        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");
              
        if (string.IsNullOrEmpty(level))
        {
            level = ntid;
        }

        string sql = @"SELECT DISTINCT BRAND_CODE AS BRAND_CODE, HIER_LEVEL_CODE AS LEVEL_CODE, HIER_LEVEL_NAME AS LEVEL_NAME
                      FROM PDWREPORT.RPT_ONCO_APP_MY_SUMMARY
                      WHERE PERIOD_TYPE = 'YTD'
                      AND BRAND_CODE != 'NA'
                      AND HIER_LEVEL_CODE='" + level + @"'
                      ORDER BY BRAND_CODE";

        //ExceptionUtility.Log("ReadGlanceBrand");

       //ExceptionUtility.Log(sql);

        DataTable dataTable = new Query().Read(sql);

         return CreateDictionaryList(dataTable);

    }

    /// <summary>
    /// Called from store.glance.Metrics read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadGlanceMetrics()
    {

        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string brand = StringHelper.QueryString(HttpContext.Current.Request, "brand", "");


       string sql=@"SELECT 
                    '$' || LTRIM (TO_CHAR (SALES, '999,999,999,999')) as SALES,
                    '$' || LTRIM (TO_CHAR (SALES_MAT, '999,999,999,999')) as SALES_MAT,
                    case when ATTAINMENT is not null then to_Char(round(ATTAINMENT))||'%' else to_char(ATTAINMENT) end as ATTAINMENT, 
                    round(CALL_FREQ,1) as CALL_FREQ, 
                    case when CALL_REACH is not null then to_Char(round(CALL_REACH))||'%' else to_char(CALL_REACH) end as CALL_REACH,
                    case when PERCENT_PLAN is not null then to_Char(round(PERCENT_PLAN))||'%' else to_char(PERCENT_PLAN) end as PERCENT_PLAN,
                    case when REQ_GROWTH is not null then to_Char(round(REQ_GROWTH))||'%' else to_char(REQ_GROWTH) end as REQ_GROWTH,
                    case when SALES_GROWTH is not null then to_Char(round(SALES_GROWTH))||'%' else to_char(SALES_GROWTH) end as SALES_GROWTH, DATA_MONTH_TEXT 
                 FROM
                    PDWREPORT.RPT_ONCO_APP_MY_SUMMARY 
                 WHERE
                    HIER_LEVEL_CODE='" + level + "' and BRAND_CODE='" + brand + @"'";

        
        
        // //ExceptionUtility.Log(sql);

        DataTable dataTable = new Query().Read(sql);


        return CreateDictionaryList(dataTable);
    }


    /// <summary>
    /// Called from store.glance.Metrics read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadGlanceSales()
    {

        string level = StringHelper.QueryString(HttpContext.Current.Request, "level", "");
        string brand = StringHelper.QueryString(HttpContext.Current.Request, "brand", "");
        string action = StringHelper.QueryString(HttpContext.Current.Request, "action", "");


        string sql = @" FROM PDWREPORT.RPT_ONCO_APP_MY_SALES WHERE HIER_LEVEL_CODE='" + level + "' and BRAND_CODE='" + brand + @"' ORDER BY DATE_KEY";

        if (action=="cumulative")
        {
            sql = "SELECT DATE_KEY, CUM_SALES_AMOUNT as SALES, CUM_SALES_QUOTA_AMOUNT as QUOTA, CUM_SALES_ATTAINMENT as ATTAINMENT" + sql;
        }
        else
        {
            sql = "SELECT DATE_KEY, SALES_AMOUNT as SALES, SALES_QUOTA_AMOUNT as QUOTA, SALES_ATTAINMENT as ATTAINMENT" + sql;
       
        }


        //ExceptionUtility.Log("ReadGlanceSales");
        //ExceptionUtility.Log(sql);

        DataTable dataTable = new Query().Read(sql);


        return CreateDictionaryList(dataTable);
    }


    /// <summary>
    /// Called from store.glance.Brands read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<TreeRow> ReadGlanceTree()
    {
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", "");
        return new Tree().ReadRoot(ntid);

    }





    /// <summary>
    /// Reads LOV 
    /// </summary>
    /// <returns>List\Object of LOV rows</returns>     
    [WebMethod]
    public static List<Dictionary<string, object>> ReadLov()
    {
        string sql = "";
        string k = StringHelper.QueryString(HttpContext.Current.Request, "key", "");
        switch (k)
        {
            case "hcofilters":
                sql = @"select MSG_KPI_MESSAGE_SHORT AS TEXT, 
                    dbms_lob.substr(MSG_KPI_RULE_SQL, 4000, 1 )  AS VALUE From PSIDWSYSOWNER.REF_MSG_KPI_RULE 
                    where 
                        MSG_KPI_REPORT='ONCO APP' --report name
                        and MSG_KPI_TYPE='FILTER' 
                        and MSG_KPI_CAT_1_CODE='PRESET' -- the type of filter
                        and MSG_KPI_CAT_2_CODE='ACCOUNT' --the tab name";
                break;
            case "hcpfilters":
                sql = @"Select MSG_KPI_RULE_ID AS VALUE, MSG_KPI_MESSAGE_SHORT AS TEXT From PSIDWSYSOWNER.REF_MSG_KPI_RULE 
                        where
                        MSG_KPI_REPORT='ONCO APP' and MSG_KPI_TYPE='FILTER' and MSG_KPI_CAT_1_CODE='PRESET' and MSG_KPI_CAT_2_CODE='CUSTOMER'";
                break;            
            default:
                return null;
        }

        //ExceptionUtility.Log("ReadLOV");
        //ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        return CreateDictionaryList(dataTable);
    }


    /// <summary>
    /// Called from store.permission.Permissions read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<PermissionRow> ReadPermission()
    {
        Permission permission = new Permission();
        DataTable dataTable = permission.Read();
        List<PermissionRow> list = permission.MakeList(dataTable);
        return list;

    }


    /// <summary>
    /// Called from store.UAT.UATs read method
    /// </summary>
    /// <returns>List\Object of rows</returns>     
    [WebMethod]
    public static List<UATRow> ReadUAT()
    {
        UAT UAT = new UAT();
        DataTable dataTable = UAT.Read();
        List<UATRow> list = UAT.MakeList(dataTable);
        return list;

    }



    /// <summary>
    /// Called from store.permission.Permissions update method
    /// Updates database with the data object posted from UX
    /// </summary>
    /// <param name="obj">the custom business json object</param>
    /// <returns>List permission users</returns>
    [WebMethod]
    public static List<PermissionRow> UpdatePermission(List<PermissionRow> data)
    {
       
        Permission bl = new Permission();
        foreach (PermissionRow d in data)
        {
           bl.Update(d);
        }
        return data;

    }



    /// <summary>
    /// Called from store.UAT.UATs update method
    /// Updates database with the data object posted from UX
    /// </summary>
    /// <param name="obj">the custom business json object</param>
    /// <returns>List UAT users</returns>
    [WebMethod]
    public static List<UATRow> UpdateUAT(List<UATRow> data)
    {
        string[] sendTo = new string[] { "Shauna.Hogan@pfizer.com" };
        string subject = "OncoBot Bug";
        string msg = "";
        UAT bl = new UAT();
        foreach (UATRow d in data)
        {
            bl.Update(d);

            //send email notification
            msg = d.ISSUE;
            EmailHelper.Send(sendTo, subject, msg);
        }
        return data;

    }

    /// <summary>
    /// Called from HomeController init
    /// </summary>
    [WebMethod]
    public static string WelcomeMessage()
    {
        string ntid = StringHelper.QueryString(HttpContext.Current.Request, "NTID", ""); 

        string msg = "";
        string sql = @"SELECT LOG_MSG_KPI_MESSAGE_LONG
                     FROM PDWREPORT.LOG_REPORT_ACTION
                     WHERE LOG_LOGIN_USER='" + ntid + @"'
                     ORDER BY LOG_INSERT_DTS DESC";

       //  //ExceptionUtility.Log(sql);
        DataTable dataTable = new Query().Read(sql);
        if(dataTable.Rows.Count > 0){
            msg = dataTable.Rows[0][0].ToString();
        }
        return msg;
    }
}