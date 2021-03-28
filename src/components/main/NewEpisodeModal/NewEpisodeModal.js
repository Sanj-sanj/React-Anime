import React from "react";
import "./newEpisodeModal.css";

export default function NewEpisodeModal({ shows, language }) {
  return (
    <div
      className="modal fade"
      id="myModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              New Episodes!
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            New episodes out for: {""}
            <ul>
              {shows.length
                ? shows.map((show) => (
                    <li key={show.id}>{show.title[language || "romaji"]}</li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
