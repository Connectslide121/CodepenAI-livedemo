import axios from "axios";

export function CreateProject(props) {
  axios
    .post("api/Projects/create", {
      userId: 1,
      title: props.projectTitle,
      description: props.projectDescription,
      htmlCode: props.htmlCode,
      cssCode: props.cssCode,
      jsCode: props.jsCode,
      totalTokens: 0,
      totalMoney: 0
    })
    .catch(function (error) {
      alert("Error saving project, there is no connection to the server");
      console.log("Error saving project:", error);
    });
}

export async function GetProjects() {
  const response = await axios.get("api/Projects/all").catch(function (error) {
    alert("Error fetching projects, there is no connection to the server");
    console.log("Error fetching projects:", error);
  });
  return response.data;
}

export async function GetProjectById(projectId) {
  const response = await axios.get(`api/Projects/project/${projectId}`);
  return response.data;
}

export async function RemoveProjectById(projectId) {
  const response = axios.delete(`api/Projects/delete/${projectId}`);
  console.log(response);
}
