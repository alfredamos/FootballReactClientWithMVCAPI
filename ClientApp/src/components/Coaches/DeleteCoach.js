import React, { useState, useEffect } from "react";
import { ConfirmDelete } from "../Utilities/Helpers/ConfirmDelete";
import { Link } from "react-router-dom";
import axios from "axios";

export const DeleteCoach = (props) => {
  const [coach, setCoach] = useState({});
  const [readyForRender, setReadyForRender] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const apiUrl = `https://localhost:5001/api/coaches/${props.match.params.id}`;

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(apiUrl);
      setCoach(result.data);
      setReadyForRender(true);
      setIsDelete(false);
    };
    GetData();
  }, [apiUrl, readyForRender]);

  const deleteClick = (event) => {
    event.preventDefault();
    setIsDelete(true);
  };

  const deleteHandler = (deleteConfirmed) => {
    if (deleteConfirmed) {
      axios.delete(apiUrl);
    }
    props.history.replace({
      pathname: "/coachList",
    });
  };

  return (
    <>
      <br />
      <br />
      {readyForRender && (
        <div className="content-section mt-5" style={{ width: "50%" }}>
          <form onSubmit={deleteClick}>
            <div className="border">
              <div className="card-body">
                <fieldset className="form-group">
                  <legend className="border-bottom m-2">Delete Coach</legend>
                  <h2>Are you sure you want to delete : "{coach.name}"?</h2>
                </fieldset>
              </div>
              <div className="form-group card-footer">
                <button className="btn btn-outline-danger m-2" type="submit">
                  <strong>Yes, Delete</strong>
                </button>
                <Link className="btn btn-outline-secondary" to="/coachList">
                  <strong>Cancel</strong>
                </Link>
              </div>
            </div>

            {isDelete && (
              <ConfirmDelete
                ConfirmationMessage={`Are you sure you want to delete ${coach.name}?`}
                ConfirmationTitle={"Delete Confirmation"}
                deleteHandler={deleteHandler}
              />
            )}
          </form>
        </div>
      )}
    </>
  );
};
