import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {useStoreState} from 'easy-peasy';

const ManagerSelect = ({handleManagerSelection}) => {
  const getFullName = user => {
    let fullName = '';
    if (user.firstName) fullName = user.firstName;
    if (user.lastName) fullName = fullName + ' ' + user.lastName;
    return fullName;
  };

  const managerList = useStoreState(state => state.managerList.managers);

  return (
    <Autocomplete
      id="size-small-filled-multi"
      size="medium"
      options={managerList}
      getOptionLabel={option => getFullName(option)}
      onChange={(event, value) => {
        if (value) handleManagerSelection(value);
        else handleManagerSelection([]);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={getFullName(option)}
            size="small"
            {...getTagProps({index})}
          />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          variant="filled"
          label="Send To"
          placeholder="Select Manager"
        />
      )}
    />
  );
};

export default ManagerSelect;
