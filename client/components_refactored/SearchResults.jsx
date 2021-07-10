import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton'

/*
TODO:
-populate rows data from api call
-function - fetch to backend
-more results button

DATA TO SHOW
Item num
Artist
Album Art (?)
Date
Location Name
Location Address
*/

const SearchResults = (props) => {

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Art</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Save!</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.searchResults.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.art}</TableCell>
              <TableCell>{row.artist}</TableCell>
              <TableCell>{row.venue}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>
                <IconButton>
                  <MusicNoteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Link color="primary">
          More results...
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SearchResults;