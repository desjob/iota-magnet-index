import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
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
              <TableCell>
								<a href={item.url}>
									{item.url}
								</a>
							</TableCell>
              <TableCell>{item.date.toLocaleDateString()}</TableCell>
            </TableRow>
		));

		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Link</TableCell>
							<TableCell>Date</TableCell>
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