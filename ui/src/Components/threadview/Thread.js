import React, {Fragment} from 'react';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import SearchBox from './SearchBox';
import {FeedbackType} from '../feedback/FeedbackType';
import FilterByTag from './FilterByTag';
import {useAuthUser} from '../auth/AuthUser';
import {UserType} from '../UserType';

const Thread = ({
  setSelectedThread,
  feedbackType,
  threadData,
  managerList,
  selectedThread,
}) => {
  const {loggedInUser} = useAuthUser();

  const useStyles = makeStyles(theme => ({
    container: {
      height: '85px',
      padding: 0,
      background: 'white',
    },
    gridList: {
      height: '85px',
      paddingTop: 0,
      overflow: 'initial',
      background: 'white',
      margin: '0px',
      width: 'inherit',
    },
    newThread: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      padding: '16px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

  const wrapGridView = () => {
    if (threadData && threadData.length) {
      return getThreadsView();
    } else {
      return <Typography align="center">You have no messages</Typography>;
    }
  };

  const getThreadsView = () => {
    return threadData.map((thread, index) => {
      return (
        <ThreadItem
          key={index}
          setSelectedThread={setSelectedThread}
          selectedIndex={selectedThread}
          threadKey={index}
          thread={{
            read: thread.read,
            createdBy: thread.createdBy,
            latestText: thread.latestText,
            latestDate: thread.modifiedAt,
            readFlag: thread.readFlag,
            subject: thread.subject,
            sentTo: thread.sentTo,
            tags: thread.tags,
          }}
        />
      );
    });
  };

  const getFilterByTagView = () => {
    if (
      loggedInUser.userType !== UserType.Employee &&
      feedbackType === FeedbackType.Employee
    )
      return <FilterByTag />;
  };

  const classes = useStyles();
  return (
    <Fragment>
      <div style={{borderBottom: '100px', borderBottomColor: '#dcdcdc'}}>
        <SearchBox />
        {getFilterByTagView()}
      </div>
      <GridList className={classes.gridList}>{wrapGridView()}</GridList>
      <div className={classes.newThread}>
        {feedbackType === FeedbackType.Personal && (
          <NewThread managerList={managerList} />
        )}
      </div>
    </Fragment>
  );
};

Thread.propTypes = {};

export default Thread;
