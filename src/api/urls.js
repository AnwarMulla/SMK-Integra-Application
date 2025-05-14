const strapiURL = 'http://localhost:1337';
const BaseUrl = "http://localhost:8010/pdspi" //process.env.REACT_APP_API_ENDPOINT

export const apiUrls = {
    article : strapiURL + '/api/articles',
    domain : strapiURL + '/api/domains',
    audience : strapiURL + '/api/audiences',
    signup: BaseUrl + '/signupNewUser',
    login : BaseUrl + '/login',
    loginWithRole : BaseUrl + '/loginwithrole',
    usersall : BaseUrl + '/user/active',
    rolesall : BaseUrl + '/userrole/all',
    getActiveRoles : BaseUrl + '/userrole/active',
    createuser: BaseUrl + '/user/create',
    updateuser: BaseUrl + '/user/update',

    logout: BaseUrl + '/logout',
    userupdate: BaseUrl + '/edituserbyid',

    usercontext: BaseUrl + '/user/context',

    fileUpload: BaseUrl + '/file/files',
    createDocument: BaseUrl + '/file/newfile',

    products: BaseUrl + "/products",

    viewUsers : BaseUrl + "/user/all",
    createUser : BaseUrl + "/user/create",
    searchUser : BaseUrl + "/user/search",
    getActiveUser : BaseUrl + "/user/active",
    deleteUser : BaseUrl + "/user/remove",
    uploadUsers : BaseUrl + '/user/upload',

    viewComplaints : BaseUrl + "/complaint/all",
    addComplaint : BaseUrl + "/complaint/create",
    updateComplaint : BaseUrl + "/complaint/update",
    viewSummary : BaseUrl + "/complaint/summary",

    searchAndView: BaseUrl + "/complaint/search_and_view",
    searchTickets: BaseUrl + "/complaint/search",
    getComplaintsStatistics: BaseUrl + "/complaint/get_complaints_statistics",
    searchComplaints : BaseUrl + "/complaint/search_complaints",
    searchSLAComplaints : BaseUrl + "/complaint/search_sla_complaints",
    getSLAComplaintsStatistics : BaseUrl + "/complaint/get_sla_complaints_statistics",
    reportPeriodicStatistics : BaseUrl + "/complaint/report_periodic_statistic",
    SLAReportBlockWise : BaseUrl + "/complaint/report_block_wise",
    SLAReportDistrictWise : BaseUrl + "/complaint/report_district_wise",
    SLAReportDivisionWise : BaseUrl + "/complaint/report_division_wise",
    AgeOfTicketReport : BaseUrl + "/complaint/age_of_ticket",

    getDealerAll : BaseUrl + "/dealer/all",
    getDealerByType : BaseUrl + "/dealer/getbytype",
    getDealer : BaseUrl + "/dealer/search",
    uploadDealer : BaseUrl + '/dealer/upload_dealers',
    createDealer : BaseUrl + '/dealer/create',
    updateDealer : BaseUrl + '/dealer/update',
    deleteDealer : BaseUrl + '/dealer/remove',
    getDealerTicketHistory : BaseUrl + "/dealer/ticket_history",

    addProduct : BaseUrl + "/product/create",
    viewProduct : BaseUrl + "/product/all",
    updateProduct : BaseUrl + "/product/update",
    deleteProduct : BaseUrl + '/product/remove',
    searchProduct : BaseUrl + "/product/search",
    getActiveProduct : BaseUrl + "/product/active",

    addCategory : BaseUrl + "/category/create",
    viewCategory : BaseUrl + "/category/all",
    updateCategory : BaseUrl + "/category/update",
    deleteCategory : BaseUrl + '/category/remove',
    searchCategory : BaseUrl + "/category/search",
    getActiveCategory : BaseUrl + "/category/active",

    addSubcategory : BaseUrl + "/subcategory/create",
    viewSubcategory : BaseUrl + "/subcategory/all",
    viewSubcategoryBrief : BaseUrl + "/subcategory/all_brief",
    updateSubcategory : BaseUrl + "/subcategory/update",
    searchSubcategory : BaseUrl + "/subcategory/search",
    deleteSubcategory : BaseUrl + '/subcategory/remove',
    getActiveSubcategory : BaseUrl + "/subcategory/active",

    addLevel : BaseUrl + "/level/create",
    viewLevels : BaseUrl + "/level/all",
    viewLevelsBrief : BaseUrl + "/level/all_brief",
    updateLevel : BaseUrl + "/level/update",
    searchLevel : BaseUrl + "/level/search",
    deleteLevel : BaseUrl + '/level/remove',
    getActiveLevel : BaseUrl + "/level/active",
    uploadLevel : BaseUrl + '/level/upload',

    addAssignedTo : BaseUrl + "/assigned_to/create",
    viewAssignedTo : BaseUrl + "/assigned_to/all",
    updateAssignedTo : BaseUrl + "/assigned_to/update",
    searchAssignedTo : BaseUrl + "/assigned_to/search",
    deleteAssignedTo : BaseUrl + '/assigned_to/remove',
    getActiveAssignedTo : BaseUrl + "/assigned_to/active",
    getAssignedToByParams : BaseUrl + "/assigned_to/assigned_to_by_params",
    getLevelData : BaseUrl + "/assigned_to/get_level_data",
    uploadAssignedTo : BaseUrl + '/assigned_to/upload',

    addWScaleMachine : BaseUrl + "/wscale/create",
    viewWScaleMachine : BaseUrl + "/wscale/all",
    updateWScaleMachine : BaseUrl + "/wscale/update",
    deleteWScaleMachine : BaseUrl + '/wscale/remove',
    searchWScaleMachine : BaseUrl + "/wscale/search",
    getActiveWScaleMachine : BaseUrl + "/wscale/active",
    getActiveWScaleMachineBrief : BaseUrl + "/wscale/active_brief",
    uploadWScaleMachine : BaseUrl + '/wscale/upload',

    addIrisMachine : BaseUrl + "/iris/create",
    viewIrisMachine : BaseUrl + "/iris/all",
    updateIrisMachine : BaseUrl + "/iris/update",
    deleteIrisMachine : BaseUrl + '/iris/remove',
    searchIrisMachine : BaseUrl + "/iris/search",
    getActiveIrisMachine : BaseUrl + "/iris/active",
    getActiveIrisMachineBrief : BaseUrl + "/iris/active_brief",
    uploadIrisMachine : BaseUrl + '/iris/upload',

    addWPOSMachine : BaseUrl + "/pos/create",
    viewPOSMachine : BaseUrl + "/pos/all",
    updatePOSMachine : BaseUrl + "/pos/update",
    deletePOSMachine : BaseUrl + '/pos/remove',
    searchPOSMachine : BaseUrl + "/pos/search",
    getActivePOSMachine : BaseUrl + "/pos/active",
    uploadPOSMachine : BaseUrl + '/pos/upload',

    addRole : BaseUrl + '/userrole/create',
    viewRoles : BaseUrl + '/userrole/all',
    updateRole : BaseUrl + '/userrole/update',
    deleteRole : BaseUrl + '/userrole/remove',
    searchRole : BaseUrl + '/userrole/search',
    getActiveRole : BaseUrl + "/userrole/active",

    viewActions : BaseUrl + '/actions/all',
    addAction : BaseUrl + '/actions/create',
    updateAction : BaseUrl + '/actions/update',
    deleteAction : BaseUrl + '/actions/remove',
    searchAction : BaseUrl + '/actions/search',
    actionactive:BaseUrl + "/actions/active",

    viewScreens : BaseUrl + '/screens/all',
    addScreen : BaseUrl + '/screens/create',
    updateScreen : BaseUrl + '/screens/update',
    deleteScreen : BaseUrl + '/screens/remove',
    searchScreen : BaseUrl + '/screens/search',
    screenactive:BaseUrl + "/screens/active",

    setpermission:BaseUrl + "/permissions/setpermissions",
    getpermission:BaseUrl + "/permissions/getbyrole",

    updateapikey: BaseUrl + "/security/update",
    deleteapikey: BaseUrl + "/security/remove",
    getapikeyall: BaseUrl + "/security/all",
    pdsmoduleapikey: BaseUrl + "/user/api-keys",

    changepasswordcreate:BaseUrl + "/user/changepassword",
    usersChangePassword : BaseUrl + "/user/userschangepassword",

    getProductModel : BaseUrl + "/product_model/all",
    createProductModel : BaseUrl + "/product_model/create",
    updateProductModel : BaseUrl + "/product_model/update",
    deleteProductModel : BaseUrl + '/product_model/remove',
    searchModelByName : BaseUrl + "/product_model/search",
    getActiveProductModel : BaseUrl + "/product_model/active",

    callHistory : BaseUrl + "/apidb/history",
    userLoginDetails : BaseUrl + "/user/user_login_details",

    zoneMaster :  BaseUrl + "/pdsmasters/zone",
    zoneGroupMaster : BaseUrl + "/pdsmasters/zone_group",
    caseType : BaseUrl + "/pdsmasters/case_type",
    channel : BaseUrl + "/pdsmasters/channel",
    authenticationChannel : BaseUrl + "/pdsmasters/authentication_channel",

    getDistricts : BaseUrl + "/district/all",
    createDistrict : BaseUrl + "/district/create",
    updateDistrict : BaseUrl + "/district/update",
    deleteDistrict : BaseUrl + '/district/remove',
    searchDistrictByName : BaseUrl + "/district/search",
    getActiveDistrict : BaseUrl + "/district/active",
    uploadDistrict : BaseUrl + '/district/upload',    
    getListOfDistricts : BaseUrl + "/district/list",
    getDistrictsForSubDivision : BaseUrl + "/district/listforsubdivision",

    getBlocks : BaseUrl + "/block/all",
    createBlock : BaseUrl + "/block/create",
    updateBlock : BaseUrl + "/block/update",
    deleteBlock : BaseUrl + '/block/remove',
    searchBlockByName : BaseUrl + "/block/search",
    getActiveBlock : BaseUrl + "/block/active",
    uploadBlock : BaseUrl + '/block/upload',
    getListOfBlocks : BaseUrl + "/block/list",
    getBlocksForDistrict : BaseUrl + "/block/listfordistrict",

    getSubdivisions : BaseUrl + "/sub_division/all",
    createSubdivision : BaseUrl + "/sub_division/create",
    updateSubdivision : BaseUrl + "/sub_division/update",
    deleteSubdivision : BaseUrl + '/sub_division/remove',
    searchSubdivisionByName : BaseUrl + "/sub_division/search",
    getActiveSubdivision : BaseUrl + "/sub_division/active",
    uploadSubdivision : BaseUrl + '/sub_division/upload',

    getAllVendorsWithoutPagination : BaseUrl + "/vendor/getall",
    getVendors : BaseUrl + "/vendor/all",
    createVendor : BaseUrl + "/vendor/create",
    updateVendor : BaseUrl + "/vendor/update",
    deleteVendor : BaseUrl + '/vendor/remove',
    searchVendorByName : BaseUrl + "/vendor/search",
    getActiveVendor : BaseUrl + "/vendor/active",
    uploadVendor : BaseUrl + '/vendor/upload',

    searchLoginDetails : BaseUrl + '/user/search_login_details',

    escalateTickets: BaseUrl + '/complaint/escalate_tickets',
    agentEngagementStatus : BaseUrl + '/user/agent_engagement_status',

    getStates : BaseUrl + "/state/all",
    createState : BaseUrl + "/state/create",
    updateState : BaseUrl + "/state/update",
    deleteState : BaseUrl + '/state/remove',
    searchStateByName : BaseUrl + "/state/search",
    getActiveState : BaseUrl + "/state/active",
    app : BaseUrl + "/pdsmasters/app",

    initiateCall : BaseUrl + "/complaint/initiate_call",

    getIntegrations : BaseUrl + "/integrations/all",
    createIntegrations : BaseUrl + "/integrations/create",
    updateIntegrations : BaseUrl + "/integrations/update",
    deleteIntegrations : BaseUrl + '/integrations/remove',
    uploadAttachment : BaseUrl + "/complaint/upload",
    getAttachment : BaseUrl + "/complaint/document",
    generateOtp : BaseUrl + "/generate_otp",
    verifyOtp : BaseUrl + "/verify_otp",

    projectMaster : BaseUrl + "/pdsmasters/project",
    statusMaster : BaseUrl + "/pdsmasters/status",
    reportIntervalMaster : BaseUrl + "/pdsmasters/report_interval",
    tokenTypeMaster : BaseUrl + "/pdsmasters/token_type",

    forgotPassword : BaseUrl + "/user/forgotpassword",
    dependencyMaster : BaseUrl + "/pdsmasters/dependency",
    getSubcategoriesSearchOptions : BaseUrl + "/pdsmasters/subcategory_search_options",

    uploadCategory : BaseUrl + '/category/upload',
    uploadSubcategory : BaseUrl + '/subcategory/upload',

    downloadUploadFile : BaseUrl + "/pdsmasters/download",

    productModelSearchOptions : BaseUrl + "/pdsmasters/product_model_search_options",


    uploadProduct : BaseUrl + '/product/upload',
    uploadProductModel : BaseUrl + '/product_model/upload',
    uploadState : BaseUrl + '/state/upload',
    getProductModelsByProduct : BaseUrl + '/product/product_models',

    getConfigs: BaseUrl + '/config/all',
    getConfigByName: BaseUrl + '/config',
    getEmailConfigOptions: BaseUrl + '/pdsmasters/email_config_options',
    updateConfig: BaseUrl + '/config/update',
    
    getDescriptions: BaseUrl + '/complaint/get_description_history',
    
    getDealerById: BaseUrl + '/dealer/getbyid',
    getSubcategoriesByCategory : BaseUrl + '/category/sub_categories',
    
    getActionOptions: BaseUrl + '/pdsmasters/action_options',

    getTeplateByName: BaseUrl + '/config/template',
    updateTeplateByName: BaseUrl + '/config/template/update',

    getFAQ: BaseUrl + '/faq/template',
    getBcaSearchOptions: BaseUrl + '/pdsmasters/bca_search_options',
    getTicketSearchOptions: BaseUrl + '/pdsmasters/ticket_search_options',

    getAllComplaints: BaseUrl + '/complaint/all',

    getUsersBrief: BaseUrl + '/user/users_brief',

    getMasterConfigs: BaseUrl + '/pdsmasters/master_configs',
    getMasterDB: BaseUrl + '/complaint/master_db',
    
    getClosedWithinSLA: BaseUrl + '/complaint/get_closed_within_sla',
    getClosedOutOfSLA: BaseUrl + '/complaint/get_closed_out_of_sla',
    getOpenWithinSLA: BaseUrl + '/complaint/get_still_open_within_sla',
    getOpenOutOfSLA: BaseUrl + '/complaint/get_still_open_out_of_sla',
}


