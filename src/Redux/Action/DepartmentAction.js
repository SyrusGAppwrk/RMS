import ExportApi from "../../Apis/ExportApi";
// Department list
export const GetdepartmentAction = (DepartmentUser) => ({
    type: "GetDepartmentUserList",
    DepartmentUser
});



// Get DepartmentUser List Function
export const GetDepartmentData = (id) => {
    return (dispach) => {
        ExportApi.GetUserProject(id).then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetdepartmentAction(Data))
                }
            });
    }
}
