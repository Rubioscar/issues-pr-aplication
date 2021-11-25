import "scss/deatils.scss";
import React from "react";
import { dateToStringDate } from "common/utils/date";

const DetailsIssue = React.memo(({ issue, comments }) => (
  <>
    <h2>Details View</h2>
    <div className="infoDetails">
      <h3>{issue.title}</h3>
      <p>{issue.body}</p>
    </div>
    {comments.map((e) => (
      <div className="comment">
        <div className="userData">
          <span className="user">{e.user.login}</span>
          <span className="date">
            {dateToStringDate(new Date(e.created_at))}
          </span>
        </div>
        <span className="text">{e.body}</span>
      </div>
    ))}
  </>
));

export default DetailsIssue;
