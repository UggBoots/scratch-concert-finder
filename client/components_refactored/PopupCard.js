import React from 'react';
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
  selectedConcert,
  title,
  locationName,
  address,
  description,
  closePopUp,
}) => {
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
              onClick={() => console.log('favorate clicked')}
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
        </CardContent>
      </Card>
    </ClickAwayListener>
  );
};

export default PopupCard;
