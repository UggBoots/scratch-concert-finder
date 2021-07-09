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

//temp function to extract data from dummy obj - refactor to use w/ real data
const createData = (id, artist, art, date, venue, address) => {
  return {id, artist, art, date, venue, address}
}
//putting data into row of objs to render it to table
const rows = [
  createData(0, 'Rage Against The Machine', 'temp', '20 July, 2021', 'Madison Square Garden', '4 Pennsylvania Plaza, New York, NY 10001'),
  createData(1, 'Tyler, The Creator', 'temp', '22 July, 2021', 'Music Hall of Williamsburg', '66 N 6th St, Brooklyn, NY 11211'),
  createData(2, 'James Brown', 'temp', '5 May, 2042', 'Madison Square Garden', '4 Pennsylvania Plaza, New York, NY 10001'),
  createData(3, 'The Strokes', 'temp', '26 July, 2021', 'Terminal 5', '610 W 56th St, New York, NY 10019'),
  createData(4, 'Weird Al Yankovic', 'temp', '1 August, 2021', 'Giants Stadium', '1 MetLife Stadium Dr, East Rutherford, NJ 07073')
]


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