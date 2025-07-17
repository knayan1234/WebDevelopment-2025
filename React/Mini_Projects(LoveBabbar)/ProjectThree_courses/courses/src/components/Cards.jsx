import Card from "./Card";

const Cards = ({ cardDetails, category }) => {
//   let singleCard = [];

  const allCardsDetails = () => {
    if (category === "All") {
    //   Object.values(cardDetails).forEach((card) => {
    //     card.forEach((c) => {
    //       singleCard.push(c);
    //     });
    //     return singleCard;
    //   });
       return Object.values(cardDetails).flat();
    } else {
      return cardDetails[category];
    }
  };

  const cards= allCardsDetails();

  return (
     <div>
      {cards.map((c) => (
        <Card key={c.id} singleCard={c} />
      ))}
    </div>
  );
};

export default Cards;
