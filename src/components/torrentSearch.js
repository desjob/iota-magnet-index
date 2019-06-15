import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateRangePicker from "./dateRangePicker";
import './torrentSearch.css';

const TorrentSearch = ({
   searchQuery,
	onSearchChange,
	onSubmitSearch,
	onKeyPress,
	onDateChangeFrom,
	dateValueFrom,
	onDateChangeUntil,
	dateValueUntil,
	onClickSevenDays
}) => {
	return (
		<div>
			<div className="margins">
				<TextField
					value={searchQuery}
					type='search'
					id="search"
					label="Search torrents"
					onChange={onSearchChange}
					onKeyPress={onKeyPress}
					variant="outlined"
					className="wide"
				/>
			</div>
			<div className="margins">
				<DateRangePicker
					onDateChangeFrom={onDateChangeFrom}
					dateValueFrom={dateValueFrom}
					onDateChangeUntil={onDateChangeUntil}
					dateValueUntil={dateValueUntil}
					onClickSevenDays={onClickSevenDays}
				/>
			</div>
			<div className="margins">
				<Button
					variant="contained"
					color="primary"
					onClick={onSubmitSearch}
				>Search
				</Button>
			</div>
		</div>
	);
}

export default TorrentSearch;