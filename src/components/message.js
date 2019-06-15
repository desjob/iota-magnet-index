import React from 'react';
import Typography from '@material-ui/core/Typography';

  const Message = (props) => {
    return(
        <div>
            <Typography variant="body1">
                {props.children}
            </Typography>
        </div>
    );
}

export default Message;