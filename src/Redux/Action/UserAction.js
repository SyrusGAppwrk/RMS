import ExportApi from "../../Apis/ExportApi";
// Department list
export const GetDepartmentListAction = (DepartmentList) => ({
    type: "GetDepartmentList",
    DepartmentList
});

// Role list
export const GetRoleListAction = (RoleList) => ({
    type: "GetRoleList",
    RoleList
});

//User list By Department  Id 
export const GetUserByDeparmentrole = (UserList) => ({
    type: "GetUserList",
    UserList
});

//User list By Department  Id 
export const GetCordinator = (PCList) => ({
    type: "GetCordinatorList",
    PCList
});

//User list By Department  Id 
export const GetManager = (PMList) => ({
    type: "GetManagerList",
    PMList
});

//Assigned project user List 
export const GetAssignemplist = (AssignList) => ({
    type: "GetAssignedList",
    AssignList
});

//Daily Time Log List 
export const GetDailyLoglist = (LogList) => ({
    type: "GetDailyLoglist",
    LogList
});


// Get Department List Function
export const  handleDepartment= () => {
    return (dispach) => {
        ExportApi.GetDepartment().then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetDepartmentListAction(Data))
                }
            });
    }
}

// Get role List Function
export const GetRoleData = () => {
    return (dispach) => {
        ExportApi.UserRoles().then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetRoleListAction(Data))
                }
            });
    }
}
// Get User List By Department Id 
export const GetUserList = (id) => {
   
    return (dispach) => {
        ExportApi.UserDetail(id).then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetUserByDeparmentrole(Data))
                }
            });
    }
}

// Get cordinator List Roleid=2
export const GetCordinatorlist = () => {
   
    return (dispach) => {
        ExportApi.UserRole(2).then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetCordinator(Data))
                }
            });
    }
}

// Get Manager List Roleid=3
export const GetManagerlist = () => {
   
    return (dispach) => {
        ExportApi.UserRole(3).then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetManager(Data))
                }
            });
    }
}

//Assigned project user List 
export const GetAssginProjectList = (id) => {
   
    return (dispach) => {
        ExportApi.AssginProject(id).then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetAssignemplist(Data))
                }
            });
    }
}


//Assigned project user List 
export const GetDailyTimeLog = (id) => {
   
    return (dispach) => {
        ExportApi.DailyLog(id).then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetDailyLoglist(Data))
                }
            });
    }
}




