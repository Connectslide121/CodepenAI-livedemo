import React, { useEffect, useState } from "react";
import { GetProjects } from "../APIs/API";

export default function OpenProjectList() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await GetProjects();
      setProjectList(projects);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="project-list-wrapper">
        <div className="project-list-header">
          <div className="project-title">Title</div>
          <div className="project-description">Description</div>
          <div className="project-date">Created at</div>
        </div>

        <ul>
          {projectList.map((project) => (
            <li key={project.id}>
              <div className="project-title">{project.title}</div>
              <div className="project-description">{project.description}</div>
              <div className="project-date">
                {formatDate(project.createdAt)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
