import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const PopupCard = ({
  addFav,
  selectedConcert,
  // title,
  // locationName,
  // address,
  // description,
  closePopUp,
}) => {
  // if (selectedConcert.description) selectedConcert.description = selectedConcert.description.replace('\r\n', '&#10;').replace('\n', '&#10;');
  // console.log(`selectedConcert content: ${JSON.stringify(selectedConcert,null,2)}`)
  if (selectedConcert.description) selectedConcert.description = 'Details not available';
  const [isFav, setIsFav] = useState(false);

  const handleClick = () => {
    setIsFav(!isFav);
  };

  return (
    <ClickAwayListener onClickAway={closePopUp}>
      <Card
        style={{ maxWidth: '30vw' }}
        onClick={() => console.log(selectedConcert)}
      >
        <CardHeader
          action={
            <IconButton
              // aria-label="settings"
              color={isFav ? 'primary' : 'default'}
              onClick={() => {
                addFav(selectedConcert);
                handleClick();
              }}
            >
              <FavoriteIcon />
            </IconButton>
          }
          title={selectedConcert.title}
          subheader={'At the: ' + selectedConcert.entities[0].name}
        />
        <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {selectedConcert.start}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {selectedConcert.description}
            
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selectedConcert.start}
          </Typography>
        </CardContent>
      </Card>
    </ClickAwayListener>
  );
};

export default PopupCard;
