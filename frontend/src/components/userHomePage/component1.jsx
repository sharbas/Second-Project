import React from 'react';
import './component1.css'; // Import your CSS file for styling

function AdvertisementCard(props) {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          {/* Front of the card */}
          <img src={props.image} alt={props.title} />
        </div>
        <div className="card-back">
          {/* Back of the card */}
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

function Component1() {
  // Sample data for the advertisement cards
  const cardsData = [
    {
      title: 'Card 1',
      image: '/public/pexels-dylan-chan-4417069.jpg',
      description: 'Description for Card 1dfshnekojghoiufhlknclnoirhhcxvnkbnipug',
      link: '',
    },
    {
      title: 'Card 2',
      image: '/public/pexels-dylan-chan-4417069.jpg',
      description: 'Description for Card 2ihjargpoijgrapoijga',
      link: 'https://example.com/card2',
    },
    {
        title: 'Card 3',
        image: '/public/pexels-dylan-chan-4417069.jpg',
        description: 'Description for Card 2 gafm;ldsagmlsgpjk]pkdfmmncx[',
        link: 'https://example.com/card2',
      },
      {
        title: 'Card 4',
        image: '/public/pexels-dylan-chan-4417069.jpg',
        description: 'Description for Card 2 fdkhsdfphnfodihpojhzfnklgnf',
        link: 'https://example.com/card2',
      },
      {
        title: 'Card 5',
        image: '/public/pexels-dylan-chan-4417069.jpg',
        description: 'Description for Card 2 ghdagphwrpqrhqehrerhner[rhn',
        link: 'https://example.com/card2',
      },
    // Add more cards here...
  ];

  return (
    <div className="advertisement-container">
      {cardsData.map((card, index) => (
        <AdvertisementCard key={index} {...card} />
      ))}
    </div>
  );
}

export default Component1;
