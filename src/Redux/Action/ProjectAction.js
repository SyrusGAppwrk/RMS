import ExportApi from "../../Apis/ExportApi";
// Department list
export const GetProjectListAction = (ProjectList) => ({
    type: "GetProjectList",
    ProjectList
});



// Get Department List Function
export const GetProjectData = () => {
    return (dispach) => {
        ExportApi.Projectdata().then(
            (resp) => {
                if (resp.ok) {
                    let Data = resp.data;
                    dispach(GetProjectListAction(Data))
                }
            });
    }
}
