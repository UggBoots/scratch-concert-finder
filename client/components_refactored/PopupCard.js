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
  title,
  locationName,
  address,
  description,
  closePopUp,
}) => {
  console.log(description);
  return (
    <ClickAwayListener onClickAway={closePopUp}>
      <Card style={{ maxWidth: '33vw' }}>
        <CardHeader
          action={
            <IconButton
              // aria-label="settings"
              onClick={() => console.log('favorate clicked')}
            >
              <FavoriteIcon />
            </IconButton>
          }
          title={title}
          subheader={locationName}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </ClickAwayListener>
  );
};

export default PopupCard;
