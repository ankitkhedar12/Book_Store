import React from "react";

interface CardProps {
  id: string,
  name: string,
  email: string,
  picture: string
}

const Card: React.FC<CardProps> = ({ id, name, email, picture }) => {
  return (
    <div className="tc calisto bg-light-blue dib br4 pa3 ma2 grow bw2 shadow-5">
      <img
        className="br4"
        alt={name}
        src={picture}
        width="200px"
        height="230px"
      />
      <div>
        {/* <h2>{name}</h2> */}
        {/* <p>{email}</p> */}
      </div>
    </div>
  );
};

export default Card;
