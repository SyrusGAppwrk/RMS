import { BaseApi } from './BaseApi'

// Login Post user name ,Password

const LoginRMS = (username, password) =>
  BaseApi.post(`L1/user/login`, { username: username, password: password });


//Get User Data 
const UserRole = (Roleid) =>
    BaseApi.get(`v1/GetUserRole?Roleid=` + Roleid);
// Get UserByDepartment 
const UserByDepartment = (Depid) =>
    BaseApi.get(`v1/GetUserDepartment?Depid=` + Depid);

// Get User By Id, Departmentid 
const UserDetail = (r) =>
    BaseApi.get(`v1/GetUserProfiles/`+`${0}/${r}`);
    // Get Roles 
const UserRoles = () =>
BaseApi.get(`Role`);
    

//Post user Data
const Userdata = (department,role,name,email,exp,Skill,Cno, status) =>
    BaseApi.post(`v1`, { Departmentid: department,roleid:role,name:name,email:email,experience:exp,skills:Skill,ContactNo:Cno,status:status })

//Put user data 
const Updateuserdata = (id, department,role,name,email,exp,Skill,Cno, status) =>
    BaseApi.put(`v1/Update/` + id, { id: id, Departmentid: department,roleid:role,name:name,email:email,experience:exp,skills:Skill,ContactNo:Cno,status:status })


// Get Project 
const Projectdata = () =>
    BaseApi.get(`Project`);

// Post Project 
const ProjectPost = (name, Client, platform,tech,code,url,sdate,edate, status) =>
    BaseApi.post(`Project`, { name: name, ClientName: Client,Platformm: platform,Tech:tech,Code:code,Url:url,Sdate:sdate,Edate:edate,status: status })

//Put Project
const ProjectUpdate = (id,name, Client, platform,tech,code,url,sdate,edate, status) =>
    BaseApi.put(`Project/` + id, { id: id, name: name, ClientName: Client,Platformm: platform,Tech:tech,Code:code,Url:url,Sdate:sdate,Edate:edate,status: status})

// Get Department
const GetDepartment = () =>
    BaseApi.get(`Department`)

//Get User Project response
const GetUserProject = (Depid) =>
    BaseApi.get(`v2?Depid=` + Depid)

//post UserProject Data
const PostUserProject = (user, Project, avail, bill, PC, PM, cmnt) =>
    BaseApi.post(`v2`, { userId: user, projectid: Project, pcid: PC, pmid: PM, avalibiltty: avail, totalBilling: bill, Comments: cmnt })

//Update UserProject
const PutUserProject = (id, user, Project, avail, bill, PC, PM, cmnt) =>
    BaseApi.put(`v2/` + id, { id: id, userId: user, projectid: Project, pcid: PC, pmid: PM, avalibiltty: avail, totalBilling: bill, Comments: cmnt })

// user Profile 
const GetUserProfile = (userId) =>
    BaseApi.get(`v1/GetUserProfiles/` +userId)


export default {

    //login s
    LoginRMS,
    //User API
    UserRole,
    Userdata,
    Updateuserdata,
    UserByDepartment,
    UserDetail,
    UserRoles,

    // Project API
    Projectdata,
    ProjectPost,
    ProjectUpdate,

    // Department 
    GetDepartment,

    //userProject 
    GetUserProject,
    PostUserProject,
    PutUserProject,
    //UserProfile
    GetUserProfile,
};

