import React from "react";
import { dateToStringDate } from "common/utils/date";

const CardItem = React.memo(({ data, onViewDatils }) => (
  <div className="card_item">
    <div className="card_inner">
      <div className="title">{data.title}</div>
      <div className="author">Author: {data.user.login}</div>
      <div className="info">
        Date creation: {dateToStringDate(new Date(data.created_at))}
      </div>
      <div className="info">Number of Comments: {data.comments}</div>
      <div className="info">
        {data.pull_request ? (
          <>
            <i className="fas fa-code-branch" /> Pull Request
          </>
        ) : (
          <>
            <i className="fas fa-exclamation" /> Issue
          </>
        )}
      </div>
      <div className="labels">
        {data.labels.map((e) => (
          <span style={{ background: `#${e.color}` }}>{e.name}</span>
        ))}
      </div>
      <div className="overlay">
        <>
          <button
            type="submit"
            className="buy-btn"
            onClick={() => onViewDatils(data.number)}
          >
            View Details
          </button>
        </>
      </div>
    </div>
  </div>
));

export default CardItem;
