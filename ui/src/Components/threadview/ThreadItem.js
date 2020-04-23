import React, {Fragment} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  rootM: {
    display: 'flex',
  },
  leftPart: {
    width: '30px',
  },
  rightPart: {
    marginLeft: '4px',
    marginTop: '6px',
  },
  topSecionWithoutBadge: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: '14px',
    color: 'black',
  },
  date: {
    color: 'grey',
    fontSize: '12px',
    float: 'left',
  },
  readIcon: {
    color: '#E87424',
  },
  preview: {
    fontSize: '14px',
    marginLeft: '30px',
    textOverflow: 'ellipsis',
    color: 'black',
    maxLines: 3,
  },
  inline: {
    display: 'inline',
  },
  chipDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    marginTop: '5px',
    float: 'right',
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const ThreadItem = ({thread, threadKey, selectedThread, readThread}) => {
  const getFullName = (employee) => {
    if (employee) return employee.firstName + ' ' + employee.lastName;
    else return 'Anonymous';
  };

  const getDate = (dateInput) => {
    if (dateInput) {
      return moment(dateInput).format('YYYY-MM-DD h:mm A');
    }
  };

  const getReadIcon = () => {
    if (!thread.read) {
      return (
        <ListItemAvatarCustom>
          <FiberManualRecordSharpIcon
            fontSize="inherit"
            style={{fontSize: '15px'}}
            className={classes.readIcon}
          />
        </ListItemAvatarCustom>
      );
    }
  };
  const getHeader = () => {
    return (
      <div className={classes.rootM}>
        <div className={classes.leftPart}>{getReadIcon()}</div>

        <div className={classes.rightPart}>
          <div className={classes.topSecionWithoutBadge}>
            <div className={classes.text}>{thread.subject}</div>
            <div className={classes.date}> {getDate(thread.latestDate)}</div>
          </div>
        </div>
      </div>
    );
  };

  const ListItemAvatarCustom = withStyles((theme) => ({
    root: {
      minWidth: '25px',
    },
  }))(ListItemAvatar);

  const getTags = () => {
    if (thread.tags) {
      return thread.tags.map((tag, index) => {
        return (
          <li key={index} style={{listStyle: 'none'}}>
            <Chip
              variant="default"
              style={{
                backgroundColor: tag.color,
              }}
              label={tag.name}
              size="small"
            />
          </li>
        );
      });
    }
  };
  const classes = useStyles();

  return (
    <>
      <ListItemLink
        key={threadKey}
        alignItems="flex-start"
        onClick={() => {
          readThread(threadKey);
        }}
        key={threadKey}
        selected={selectedThread === threadKey}
      >
        <ListItemText
          primary={<>{getHeader()}</>}
          secondary={
            <React.Fragment>
              <Typography
                className={classes.preview}
                style={{wordWrap: 'break-word'}}
                maxLines={3}
              >
                {thread.latestText}
              </Typography>

              <ul className={classes.chipDiv}>{getTags()}</ul>
            </React.Fragment>
          }
        />
      </ListItemLink>
      <Divider variant="inset" component="li" style={{marginLeft: 0}} />
    </>
  );
};

export default ThreadItem;
