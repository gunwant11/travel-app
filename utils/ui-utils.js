import moment from 'moment';

export function formatDateObject(dateString) {
    const dateObj = moment(dateString);
    
    const formattedObject = {
      datestring: dateString,
      date: dateObj.format('DD'),
      month: dateObj.format('MMM'),
      year: dateObj.year(),
      day: dateObj.format('dddd')
    };
  
    return formattedObject;
  }
  