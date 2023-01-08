import React from "react";
import Card from './Card';

interface CardArrayProps {
  robots: Array<{
    id: string,
    name: string,
    email: string,
    picture: string
  }>
}

const CardArray: React.FC<CardArrayProps> = ({ robots }) => {
  const cardComponent = robots.map((user, i) => {
    return (
      <Card
        key={i}
        id={robots[i].id}
        name={robots[i].name}
        email={robots[i].email}
        picture={robots[i].picture}
      />
    );
  });
  return (
    <div>
      {cardComponent}
    </div>
  );
};

export default CardArray;
