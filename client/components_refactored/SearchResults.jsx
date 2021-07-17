/**
 * ************************************
 * @module SearchResults
 * @description React component houses search results that pop up after map search choice
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';
import Row from './Row'

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

  const handleClick = (row) => {
    props.addFav(row);
  };

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead fontWeight='bold'>
          <TableRow>
            <TableCell>Show Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Save!</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.concerts.map((row) => <Row key={row.id} row={row} handleClick={handleClick} />)}
        </TableBody>
      </Table>
      <div>
        <Link color="primary">More results...</Link>
      </div>
    </React.Fragment>
  );
};

export default SearchResults;


// {props.concerts.map((row, i) => {
//   row['isfav'] = false;
//   return(
//   <TableRow key={i} onClick={() => console.log(row)}>
//     <TableCell>{row.title}</TableCell>
//     <TableCell>{row.startDate}</TableCell>
//     <TableCell>{row.startTime}</TableCell>
//     <TableCell>
//       {row.entities[0] ? row.entities[0].name : 'n/a'}
//     </TableCell>
//     <TableCell>
//       {row.entities[0]
//         ? row.entities[0].formatted_address
//         : 'none found'}
//     </TableCell>
//     <TableCell>
      {/* <IconButton onClick = {()=>props.addFav(props.concerts[i])}>
        <MusicNoteIcon />
      </IconButton> */}
      {/* <IconButton
        name={i}
        color={isFav ? 'primary' : 'default'}
        onClick={(e) => {
          handleClick(row);
          row.isfav = true;
          toggleColor(e);
        }}
      >
        <MusicNoteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
)})} */}





