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
  title,
  locationName,
  address,
  description,
  closePopUp,
}) => {
  const [isFav, setIsFav] = useState(false);

  const handleClick = () => {
    setIsFav(!isFav);
  };

  return (
    <ClickAwayListener onClickAway={closePopUp}>
      <Card
        style={{ maxWidth: '33vw' }}
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
          subheader={selectedConcert.entities[0].name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
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
