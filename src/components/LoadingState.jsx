import React from "react";
import { ReactComponent as Spinner } from "../images/spinner.svg";

export default function LoadingState({ message }) {
  return (
    <>
      <div className="loadingMessage">
        {message !== "" && (
          <>
            <div className="loadingSpinner">
              <Spinner />
            </div>
            <p>{message}</p>
          </>
        )}
      </div>
    </>
  );
}
