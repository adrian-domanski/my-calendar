import React from "react";
import moment from "moment";

const CardItem = ({ day }) => {
  return (
    <div className={`card `}>
      <header className="card-header">
        <p className="card-header-title">{day.name}</p>
      </header>
      <div className="card-content">
        <div className="content">{day.description}</div>
      </div>
      <footer className="card-footer">
        <span href="#" className="card-footer-item has-text-link">
          <time dateTime="2016-1-1">
            <b>{moment(day.date.iso).format("D MMMM YYYY")}</b>
          </time>
        </span>
      </footer>
    </div>
  );
};

export default CardItem;
