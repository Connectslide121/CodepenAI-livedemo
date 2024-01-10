import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function SaveProjectForm(props) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [saveButtonText, setSaveButtonText] = useState(
    <p>
      <FontAwesomeIcon icon={faFloppyDisk} /> Save
    </p>
  );

  const handleProjectTitleChange = (e) => {
    setProjectTitle(`${e.target.value}`);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(`${e.target.value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSaveProject(projectTitle, projectDescription);
    setSaveButtonText(
      <p>
        <FontAwesomeIcon icon={faFloppyDisk} /> Saved!{" "}
        <FontAwesomeIcon icon={faCheck} />
      </p>
    );
    setTimeout(() => {
      setSaveButtonText(
        <p>
          <FontAwesomeIcon icon={faFloppyDisk} /> Save
        </p>
      );
    }, 3000);
  };

  return (
    <div className="save-project-form">
      <form onSubmit={handleSubmit}>
        <div className="title-input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={projectTitle}
            onChange={handleProjectTitleChange}
            required
          />
        </div>
        <div className="description-input">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            rows={5}
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            required
          />
        </div>
        <button type="submit">{saveButtonText}</button>
      </form>
    </div>
  );
}