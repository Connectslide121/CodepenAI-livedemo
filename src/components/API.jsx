import React from "react";
import axios from "axios";

export function CreateProject(
  projectUserId,
  projectTitle,
  projectDescription,
  htmlCode,
  cssCode,
  jsCode
) {
  console.log(
    "Props before request:",
    projectUserId,
    projectTitle,
    projectDescription,
    htmlCode,
    cssCode,
    jsCode
  );
  axios
    .post("api/Projects/create", {
      userId: projectUserId,
      title: projectTitle,
      description: projectDescription,
      htmlCode: htmlCode,
      cssCode: cssCode,
      jsCode: jsCode,
      totalTokens: 0,
      totalMoney: 0
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("Error creating project:", error);
    });
}
