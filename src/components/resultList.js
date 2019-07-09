import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import TimeAgo from 'react-timeago';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
	overflowX: 'auto',
	marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 300,
  },
}));

const ResultList = ({ results }) => {
	const classes = useStyles();

	if(results.length)
	{
		const magnetLinks = results.map((item) => (
			<TableRow key={item.id}>
            	<TableCell component="th" scope="row">
                	{item.title}
              	</TableCell>
              	<TableCell align="center">
					<IconButton 
						href={item.url}
						aria-label="Magnet link"
                        color="primary"
					>
						<SvgIcon>
							<path d="M14,12a2,2,0,0,1-4,0V2H2V12a10,10,0,0,0,20,0V2H14ZM8,4V6H4V4ZM20,4V6H16V4Zm-4,8V8h4v4A8,8,0,0,1,4,12V8H8v4a4,4,0,0,0,8,0Z"/>
						</SvgIcon>
				  	</IconButton>
				</TableCell>
            	<TableCell>
					<TimeAgo date={new Date(item.date)} />
				</TableCell>
            </TableRow>
		));

		return (
			<Paper className={classes.root}>
				<Table className={classes.table} size="small">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align="center">Link</TableCell>
							<TableCell>Upload date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{magnetLinks}
					</TableBody>
				</Table>
			</Paper>
		);
	}
	else {
		return (
			<div></div>
		)
	}
}

export default ResultList;