import React from "react";
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
    .then(function (response) {
      console.log("Project saved: ", response);
    })
    .catch(function (error) {
      console.log("Error creating project:", error);
    });
  //   console.log(props);
}
