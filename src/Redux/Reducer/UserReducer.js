const initialState = {
    departmentlist: [],
    userList: [],
    pCList:[],
    pMList:[],
    role:[],
}


export default (state = initialState, action) => {
    switch (action.type) {
        case "GetDepartmentList":
            return {
                ...state,
                departmentlist: action.DepartmentList
            };

        case "GetUserList":
            return {
                ...state,
                userList: action.UserList
            };
        case "GetCordinatorList":
            return {
                ...state,
                pCList: action.PCList
            };
        case "GetManagerList":
            return {
                ...state,
                pMList: action.PMList       
            };
            case "GetRoleList":
            return {
                ...state,
                role: action.RoleList       
            };

        default: return state
    }
}
