import React from 'react';
import './message.css';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import {FeedbackType} from '../feedback/FeedbackType';

const MessageItem = ({msg, feedbackType, createdBy, sentTo}) => {
  const getDate = dateInput => {
    if (dateInput) {
      return moment(dateInput).format('YYYY-MM-DD h:mm A');
    }
  };

  const getFullName = employee => {
    if (employee) return employee.firstName + ' ' + employee.lastName;
    else return 'Anonymous';
  };

  const getEmployeeMessageView = () => {
    if (msg.messageSender === 2) {
      return (
        <div className="message right">
          <div className="message-text">
            <div className="message-title">{getDate(msg.createdAt)}</div>
            {msg.text}
          </div>
        </div>
      );
    } else {
      return (
        <div className="message left">
          <div className="message-text">
            <div className="message-title">
              <>
                <Typography
                  component="span"
                  variant="body2"
                  //className={classes.inline}
                  color="textSecondary"
                  style={{display: 'inline'}}
                >
                  {getFullName(createdBy)}
                </Typography>

                <Typography
                  component="span"
                  variant="body2"
                  //className={classes.inline}
                  color="textSecondary"
                  style={{float: 'right', display: 'inline', marginLeft: 15}}
                >
                  {getDate(msg.createdAt)}
                </Typography>
              </>
            </div>
            {msg.text}
          </div>
        </div>
      );
    }
  };

  const getPersonalMessageView = () => {
    if (msg.messageSender === 1) {
      return (
        <div className="message right">
          <div className="message-text">
            <div className="message-title">{getDate(msg.createdAt)}</div>
            {msg.text}
          </div>
        </div>
      );
    } else {
      return (
        <div className="message left">
          <div className="message-text">
            <div className="message-title">
              <>
                <Typography
                  component="span"
                  variant="body2"
                  //className={classes.inline}
                  color="textSecondary"
                  style={{display: 'inline'}}
                >
                  {getFullName(sentTo)}
                </Typography>

                <Typography
                  component="span"
                  variant="body2"
                  //className={classes.inline}
                  color="textSecondary"
                  style={{float: 'right', display: 'inline', marginLeft: 15}}
                >
                  {getDate(msg.createdAt)}
                </Typography>
              </>
            </div>
            {msg.text}
          </div>
        </div>
      );
    }
  };

  if (feedbackType === FeedbackType.Employee) {
    return getEmployeeMessageView();
  } else {
    return getPersonalMessageView();
  }
};
MessageItem.propTypes = {};
export default MessageItem;
