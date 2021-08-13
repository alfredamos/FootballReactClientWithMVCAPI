import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faBook } from "@fortawesome/free-solid-svg-icons";
import { SearchItem } from "../Utilities/Helpers/SearchItem";
import axios from "axios";

export const CoachList = (props) => {
  const [coaches, setCoaches] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const coachUrl = `https://localhost:5001/api/coaches`;

  const editHandler = (id) => {
    console.log(id);
    props.history.replace({
      pathname: `/editCoach/${id}`,
    });
  };

  const deleteHandler = (id) => {
    console.log(id);
    props.history.replace({
      pathname: `/deleteCoach/${id}`,
    });
  };

  const createHandler = () => {
    props.history.replace({
      pathname: "/createCoach",
    });
  };

  const detailHandler = (id) => {
    console.log(id);
    props.history.replace({
      pathname: `/detailCoach/${id}`,
    });
  };

  useEffect(() => {
    let onMount = true;
    axios.get(coachUrl).then((res) => {
      if (onMount) {
        setCoaches(res.data);
        setIsLoading(true);
      }
    });
    return () => (onMount = false);
  }, [coachUrl]);

  const filterHandler = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log("filter : ", filter);
    if (filter !== "") {
      const searchApiUrl = `https://localhost:5001/api/coaches/${filter}`;
      axios.get(searchApiUrl).then((res) => {
        setCoaches(res.data);
      });
    } else {
      axios.get(coachUrl).then((res) => {
        setCoaches(res.data);
      });
    }
  };

  return (
    <>
      {isLoading && (
        <section>
          <div className="border">
            <div className="card-header text-center">
              <h4>List of Coaches</h4>
            </div>
            <div className="card-body">
              <SearchItem
                filterHandler={filterHandler}
                searchHandler={searchHandler}
              />
              <br />
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>location</th>
                    <th>age</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coaches.map((coach) => (
                    <tr key={coach.coachId}>
                      <td>{coach.name}</td>
                      <td>{coach.location}</td>
                      <td>{coach.age}</td>
                      <td>
                        <button
                          onClick={() => editHandler(coach.coachId)}
                          className="btn btn-warning m-1"
                          style={{ fontWeight: "bold" }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => deleteHandler(coach.coachId)}
                          className="btn btn-danger m-1"
                          style={{ fontWeight: "bold" }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          onClick={() => detailHandler(coach.coachId)}
                          className="btn btn-primary m-1"
                          style={{ fontWeight: "bold" }}
                        >
                          <FontAwesomeIcon icon={faBook} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <button
                type="button"
                onClick={createHandler}
                className="btn btn-primary btn-block"
                style={{ fontWeight: "bold" }}
              >
                Create Coach
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
