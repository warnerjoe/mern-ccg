// src/Card.js
import React from 'react';
// my import cardImage from './path_to_your_image.png';

const Card = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-yellow-200">
      <img className="w-full"  src="https://media.bleacherreport.com/image/upload/w_800,h_533,c_fill/v1696219301/udsc6iawctp8ygwfvebn.jpg" alt="Handcuffed Card" />
      <div className="px-6 py-4">

        {/* Card Name */}
        <div className="font-bold text-xl mb-2">Handcuffed</div>

        {/* Card Type */}
        <p className="text-gray-700 text-base">
          Strike: Foreign Object: Heel
        </p>

        {/* Fortitude */}
        <p className="text-gray-700 text-base mt-2">
          Fortitude: 0
        </p>

        {/* Card Text */}
        <p className="text-gray-700 text-base mt-2">
          Your opponent cannot play the card titled Over Sell Maneuver immediately after you play this card. When reversed from your opponent’s hand, he discards 2 cards. When successfully played, draw up to 3 cards. When this card is in your Ring area, your opponent discards 1 card when he plays a Face card.
        </p>

        {/* Flavor Text */}
        <p className="text-gray-700 text-base mt-2">
          "This is a quote" - Jim Cole
        </p>
      </div>

      {/* Damage */}
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Damage: 0</span>
      </div>
    </div>
  );
};

export default Card;
