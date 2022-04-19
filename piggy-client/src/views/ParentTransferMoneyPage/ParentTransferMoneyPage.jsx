import React, { useState, useEffect, useContext } from 'react';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import ChildrenDisplay from './ChildrenDisplay';
import axios from 'axios';
import ParentContext from '../../ParentContext';
import config from '../../conf.json';

import { Grid, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';

import configData from '../../conf.json';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: '30px',
		flexDirection: 'column',
		width: '60%',
		margin: 'auto',
	},
	skelatonContainer: {
		paddingTop: '15px',
		paddingBottom: '32px',
	},
	skelaton: {
		margin: 'auto',
	},
	childrenContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	text: {
		display: 'flex',
		justifyContent: 'flex-start',
		paddingTop: theme.spacing(2),
	},
}));

const ParentTransferMoneyPage = ({ parentId }) => {
	const { amount, setAmount, setSelectedChildrenId, selectedChildrenId } = useContext(ParentContext);
	const [isChildrenLoading, setIsChildrenLoading] = useState(true);

	const classes = useStyles();

	const [childrens, setChildrens] = useState([]);

	useEffect(async () => {
		if (parentId) {
			const childrens = await axios.get(`${config.PIGGY_DB_URL}/parentChild/${parentId}`);
			setChildrens(childrens.data);
			setSelectedChildrenId(childrens.data[0]._id);
			setIsChildrenLoading(false);
		}
	}, [parentId]);

	const handleTransferMoney = () => {
		console.log('payed for ' + selectedChildrenId + ': ' + amount);

		axios
			.put(`${configData.PAYMENT_SERVICE_URL}/card/${selectedChildrenId}`, {
				amount: +amount,
			})
			.then((res) => {
				Swal.fire({
					title: 'ווהו!',
					text: 'ההעברה בוצעה בהצלחה :)',
					icon: 'success',
					width: '80%',
					confirmButtonColor: '#781f63',
					confirmButtonText: 'הבנתי',
				}).then(() => setAmount(0));
			})
			.catch((err) => {
				Swal.fire({
					title: 'אופס!',
					text: 'משהו התפקשש... כדאי לנסות שוב!',
					icon: 'error',
					width: '80%',
					confirmButtonColor: '#781f63',
					confirmButtonText: 'הבנתי',
				});
			});
	};

	return (
		<div className={classes.container}>
			<Typography>העברה לחשבון של...</Typography>
			<div className={classes.childrenContainer}>
				{parentId && !isChildrenLoading ? (
					childrens.map((children) => (
						<ChildrenDisplay
							key={children._id}
							onClick={() => setSelectedChildrenId(children._id)}
							selected={selectedChildrenId === children._id}
							name={children.UserSettings?.DisplayName}
							pic={children.UserSettings?.avatarURL}
						/>
					))
				) : (
					<Grid container className={classes.skelatonContainer}>
						{[1, 2, 3].map((x) => (
							<Grid item xs={4} key={x}>
								<Skeleton variant='circular' className={classes.skelaton} width={60} height={60} />
							</Grid>
						))}
					</Grid>
				)}
			</div>

			<TextField
				label='כמה תרצה להעביר?'
				variant='outlined'
				color='primary'
				fullWidth
				value={+amount || ''}
				type='number'
				onChange={(event) => setAmount(event.target.value)}
			/>
			<Button onClick={handleTransferMoney}>העבר</Button>
		</div>
	);
};

export default ParentTransferMoneyPage;
