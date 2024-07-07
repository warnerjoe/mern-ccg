import React from 'react';

const Card = ({ card }) => {
  const formatCardType = () => {
    const cardTypeText = card.cardType.map((type) => {
      if (type === 'Maneuver') {
        return card.maneuverType;
      } else if (type === 'Reversal') {
        return 'Reversal: ' + card.reversalType;
      } else {
        return type;
      }
    }).join(' / ');

    if (card.subType && card.subType.length > 0) {
      return `${cardTypeText} : ${card.subType.join(': ')}`;
    } else {
      return cardTypeText;
    }
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-yellow-200">
      <img className="w-full" src="https://media.bleacherreport.com/image/upload/w_800,h_533,c_fill/v1696219301/udsc6iawctp8ygwfvebn.jpg" alt="Handcuffed Card" />
      <div className="px-6 py-4">
        {/* Card Name */}
        <div className="font-bold text-xl mb-2">
          {card.name}
        </div>

        {/* Card Type */}
        <p className="text-gray-700 text-base">
          {formatCardType()}
        </p>

        {/* Fortitude */}
        <p className="text-gray-700 text-base mt-2">
          Fortitude: {card.fortitude}
        </p>

        {/* Card Text */}
        <p className="text-gray-700 text-base mt-2">
          {card.cardText}
        </p>

        {/* Flavor Text */}
        <p className="text-gray-700 text-base mt-2">
          {card.flavorText}
        </p>
      </div>

      {/* Damage */}
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Damage: {card.damage}</span>
      </div>
    </div>
  );
};

export default Card;
