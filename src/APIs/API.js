import axios from "axios";

export async function CreateProject(props) {
  const response = await axios
    .post("api/Projects/create", {
      userId: 1, //********************************** HANDLE WHENEVER ************************************/
      title: props.projectTitle,
      description: props.projectDescription,
      htmlCode: props.htmlCode,
      cssCode: props.cssCode,
      jsCode: props.jsCode,
      totalTokens: 0, //********************************** HANDLE WHENEVER ************************************/
      totalMoney: 0 //********************************** HANDLE WHENEVER ************************************/
    })
    .catch(function (error) {
      alert("Error saving project, there is no connection to the server");
      console.log("Error saving project:", error);
    });
}

export async function GetProjects() {
  const userId = 1;
  const response = await axios
    .get(`api/Projects/user/${userId}`)
    .catch(function (error) {
      alert("Error fetching projects, there is no connection to the server");
      console.log("Error fetching projects:", error);
    });
  return response.data;
}

export async function GetProjectById(projectId) {
  const response = await axios.get(`api/Projects/project/${projectId}`);
  return response.data;
}

export async function UpdateProject(props) {
  const response = await axios
    .put("api/Projects/update", {
      projectId: props.projectId,
      userId: 1, //********************************** HANDLE WHENEVER ************************************/
      title: props.projectTitle,
      description: props.projectDescription,
      htmlCode: props.htmlCode,
      cssCode: props.cssCode,
      jsCode: props.jsCode,
      createdAt: props.projectCreateDate,
      totalTokens: 0, //********************************** HANDLE WHENEVER ************************************/
      totalMoney: 0 //********************************** HANDLE WHENEVER ************************************/
    })
    .catch(function (error) {
      alert("Error updating project, there is no connection to the server");
      console.log("Error updating project:", error);
    });
}

export async function RemoveProjectById(projectId) {
  const response = await axios.delete(`api/Projects/delete/${projectId}`);
  alert(`Project with id ${response.data} deleted successfully`);
}
