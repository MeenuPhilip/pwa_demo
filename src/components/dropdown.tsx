import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
     // margin: theme.spacing(1),
      width: '40%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface DropDownProps {
  selectValue: any,
  handleSelectChange?: Function,
  drpDownData: any
}

export default function SimpleSelect(props: DropDownProps) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      props.handleSelectChange && props.handleSelectChange(event)
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selectValue}
          onChange={handleChange}
          variant={'filled'}
          autoWidth={true}
         // classes={'drpDown'}
        >
          {props.drpDownData.map( (item: any) =>  <MenuItem value={item.value}>{item.DisplayName}</MenuItem>)}
          
        </Select>
      </FormControl>     
  );
}
