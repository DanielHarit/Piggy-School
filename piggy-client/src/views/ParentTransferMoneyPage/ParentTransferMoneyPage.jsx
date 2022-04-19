import React, { useState, useEffect, useContext } from 'react';

import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import ChildrenDisplay from './ChildrenDisplay';
import axios from 'axios';
import ParentContext from '../../ParentContext';
import config from '../../conf.json';

import { Grid, Button, LinearProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';

import configData from '../../conf.json';
import NumbersKeyboard from './NumbersKeyboard';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: '30px',
		flexDirection: 'column',
		width: '60%',
		margin: 'auto',
	},
	skelatonContainer: {
		paddingTop: '15px',
		paddingBottom: '40px',
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
	likeBtn: {
		height: '36px',
		borderRadius: '4px',
	},
}));

const ParentTransferMoneyPage = ({ parentId }) => {
	const { amount, setAmount, setSelectedChildrenId, selectedChildrenId } = useContext(ParentContext);
	const [isChildrenLoading, setIsChildrenLoading] = useState(true);
	const [isTransferLoading, setIsTransferLoading] = useState(false);

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
		setIsTransferLoading(true);

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
			})
			.finally(() => setIsTransferLoading(false));
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

			<NumbersKeyboard />
			{isTransferLoading ? (
				<LinearProgress className={classes.likeBtn} />
			) : parentId && !isChildrenLoading ? (
				<Button
					variant='contained'
					fullWidth
					onClick={handleTransferMoney}
					disabled={!selectedChildrenId || amount <= 0}>
					{`העבר ${amount}₪ ל${childrens.find((child) => child._id === selectedChildrenId)?.UserSettings.DisplayName}`}
				</Button>
			) : (
				<Skeleton className={classes.likeBtn} />
			)}
		</div>
	);
};

export default ParentTransferMoneyPage;
