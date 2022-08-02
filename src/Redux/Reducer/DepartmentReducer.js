const initialState = {
    departmentUser:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GetDepartmentUserList":
            return {
                ...state,
                departmentUser: action.DepartmentUser
            };


        default: return state
    }
}