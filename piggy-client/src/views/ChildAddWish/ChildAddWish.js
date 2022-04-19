import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { IconButton, TextField, InputAdornment, Input, Avatar, Badge } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import routes from '../../components/Router/Routes';
import defaultPic from './defaultPic';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../conf.json';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 15,
		width: '85%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	form: {
		margin: '15px 0px',
		padding: '12px',
		borderRadius: '5px',
		backgroundColor: 'white',
	},
	field: {
		marginBottom: '15px',
	},
	addBtn: {
		fontSize: '16px',
	},
	fileInput: {
		display: 'none',
	},
	pic: {
		borderColor: '#781f63',
		borderStyle: 'solid',
		borderWidth: '2px',
	},
	editBadge: {
		color: 'white',
	},
	imgUpload: {
		display: 'flex',
		justifyContent: 'center',
	},
}));

const convertBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

const saveWishToDB = async (newWish) => {
	const userMail = JSON.parse(sessionStorage.getItem('profileObj'))['email'];
	const user = await axios.get(`${config.PIGGY_DB_URL}/children/mail/${userMail}`);
	axios.post(`${config.PIGGY_DB_URL}/children/WishList/${user.data._id}`, newWish);
}

const ChildAddWish = () => {
	const classes = useStyles();
	const { state } = useLocation();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
	const [pic, setPic] = useState(defaultPic);
	const [isSaving, setIsSaving] = useState(false);

	const goToWishList = (newWish) => {
		const newState = { ...state };
		if (newWish) newState.wishes = { ...state.wishes, [newWish.priority]: newWish };

		navigate('/child' + routes.ChildWishList, { state: newState });
	};

	const uploadImage = async (event) => {
		const file = event.target.files[0];
		const picInBase64 = await convertBase64(file);
		setPic(picInBase64);
	};

	const calcNextPriority = () => Object.keys(state.wishes).reduce((nextPriority, currPriority) => (+currPriority >= nextPriority ? +currPriority + 1 : nextPriority), 1);

	const saveWish = async () => {
		setIsSaving(true);
		const newWish = {
			id: new Date().getTime(),
			name,
			pic,
			cost: +cost,
			priority: calcNextPriority(),
		};

		try {
			await saveWishToDB(newWish);

			Swal.fire({
				title: 'ווהו!',
				text: 'היעד נשמר בהצלחה :)',
				icon: 'success',
				width: '80%',
				confirmButtonColor: '#781f63',
				confirmButtonText: 'ליעדים שלי',
			}).then(() => goToWishList(newWish));
		} catch (err) {
			Swal.fire({
				title: 'אופס!',
				text: 'משהו התפקשש... כדאי לנסות שוב!',
				icon: 'error',
				width: '80%',
				confirmButtonColor: '#781f63',
				confirmButtonText: 'הבנתי',
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className={classes.root}>
			<IconButton color='primary' component='div' onClick={() => goToWishList(null)}>
				<ArrowForwardIosIcon />
			</IconButton>
			<div className={classes.form}>
				<TextField fullWidth className={classes.field} disabled={isSaving} label='מה היעד?' variant='outlined' InputLabelProps={{ shrink: true }} value={name} onChange={(e) => setName(e.target.value)} />
				<TextField
					fullWidth
					className={classes.field}
					disabled={isSaving}
					label='כמה עולה?'
					type='number'
					variant='outlined'
					value={cost}
					onChange={(e) => setCost(e.target.value)}
					InputProps={{
						startAdornment: <InputAdornment position='start'>₪</InputAdornment>,
					}}
					inputProps={{
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
				/>
				<div className={classes.imgUpload}>
					<Badge
						overlap='circular'
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						badgeContent={
							<label htmlFor='upload-img'>
								<Input className={classes.fileInput} disabled={isSaving} accept='image/*' id='upload-img' type='file' onChange={(e) => uploadImage(e)} />
								<Avatar className={classes.editBadge} sx={{ width: 35, height: 35, bgcolor: '#781f63' }}>
									<EditIcon />
								</Avatar>
							</label>
						}>
						<Avatar className={classes.pic} src={pic} sx={{ width: 90, height: 90 }} />
					</Badge>
				</div>
			</div>
			<LoadingButton className={classes.addBtn} variant='contained' fullWidth loading={isSaving} loadingPosition='start' startIcon={<SaveIcon />} disabled={name === '' || cost === ''} onClick={saveWish}>
				שמור יעד
			</LoadingButton>
		</div>
	);
};

export default ChildAddWish;
