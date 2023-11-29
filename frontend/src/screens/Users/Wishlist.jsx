import React from 'react';
import { Card, CardHeader, CardBody, Typography, Button, CardFooter } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const WishlistModal = ({ wishlistItems, onClose, onDeleteItem }) => {
  return (
<div className="absolute right-0 mt-2 w-full md:w-[1000px] bg-white shadow-lg rounded-md overflow-hidden z-10 border-4 border-gray-600 ">      <div className="flex justify-end p-2">
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          {/* Closing Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <h1 className="text-1xl font-bold text-center text-black">
  Wishlist Items
</h1>

      <div className="flex flex-wrap justify-around">
        {wishlistItems.map((item) => (
          <div key={item.id} className="w-full md:w-48 mb-4">
            {/* Wishlist Item Card */}
            <Card className='h-96 w-90'>
              <CardHeader shadow={false} floated={false} className="h-48">
                <img
                  src={`https://www.wetravels.online/images/${item.images[0]}`}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2">
                  <Typography color="blue-gray" className="font-medium">
                    Category: {item.category}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    Place: {item.place}
                  </Typography>
                </div>
                {/* Additional details or description */}
                {/* <Typography variant="small" color="gray" className="font-normal opacity-75">
                  {item.description}
                </Typography> */}
              </CardBody>
              <CardFooter>
                {/* Delete Button */}
              
<Button
  onClick={() => onDeleteItem(item._id)}
  ripple="light"
  color="red"
  className="hover:opacity-90 focus:opacity-90 w-31 h-12 flex items-center text-xxs text-white pr-2 ml-4"
>
  <FontAwesomeIcon icon={faTrash} className="mr-2 ml-2 " />
Remove  
</Button>

              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistModal;
