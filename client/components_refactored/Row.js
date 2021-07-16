import React,{useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';



const Row = ({row, handleClick})=>{

const [isFav, setIsFav] = useState(false);
row['isFav'] = isFav;

  return (
    <TableRow key={row.id} onClick={() => console.log(row)}>
      <TableCell>{row.title}</TableCell>
      <TableCell>{row.startDate}</TableCell>
      <TableCell>{row.startTime}</TableCell>
      <TableCell>
        {row.entities[0] ? row.entities[0].name : 'n/a'}
      </TableCell>
      <TableCell>
        {row.entities[0]
          ? row.entities[0].formatted_address
          : 'none found'}
      </TableCell>
      <TableCell>
        {/* <IconButton onClick = {()=>props.addFav(props.concerts[i])}>
          <MusicNoteIcon />
        </IconButton> */}
        <IconButton
          color={isFav ? 'primary' : 'default'}
          onClick={() => {
            handleClick(row);
            setIsFav(prev=>!prev);
            row.isfav = isFav;
          }}
        >
          <MusicNoteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}



export default Row