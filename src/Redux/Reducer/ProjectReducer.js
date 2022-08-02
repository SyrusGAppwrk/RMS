const initialState = {
    projectlist:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GetProjectList":
            return {
                ...state,
                projectlist: action.ProjectList
            };


        default: return state
    }
}