import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { makeStyles } from '@mui/styles';
import Wish from '../../components/Wish';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import routes from '../../components/Router/Routes';
import DraggableWish from '../../components/DraggableWish';
import IconButton from '@mui/material/IconButton';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';
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
	explain: {
		margin: '20px 0px',
	},
	addBtn: {
		fontSize: '16px',
	},
	wishesContainer: {
		marginBottom: '10px',
	},
	titleContainer: { display: 'flex', justifyContent: 'space-between', marginTop: '30px' },
}));

const ChildWishList = () => {
	const classes = useStyles();
	const { state } = useLocation();
	const navigate = useNavigate();

	const goToAddWish = () => navigate(routes.ChildAddWish, { state });

	const [wishList, setWishList] = useState([]);
	const [idsToRemove, setIdsToRemove] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const calcLeftAmounts = (wishList) => {
		const newWishList = [...wishList];
		let leftAmount = state.currAmount;
		for (let index = 0; index < newWishList.length; index++) {
			newWishList[index].currAmount = leftAmount;
			leftAmount = leftAmount === 0 ? 0 : leftAmount - newWishList[index].cost > 0 ? leftAmount - newWishList[index].cost : 0;
		}
		return newWishList;
	};

	const moveWish = useCallback(
		(fromIndex, toIndex) => {
			setWishList((prevWishes) =>
				calcLeftAmounts(
					update(prevWishes, {
						$splice: [
							[fromIndex, 1],
							[toIndex, 0, prevWishes[fromIndex]],
						],
					}).map((wish, i) => ({ ...wish, priority: i + 1 }))
				)
			);
		},
		[wishList]
	);

	const renderDraggableWish = (wish, index) => (isEditing ? <DraggableWish key={wish.id} index={index} id={wish.id} wish={wish} removeWish={checkIfSureToRemove} moveCard={moveWish} /> : <Wish key={wish.id} name={wish.name} pic={wish.pic} cost={wish.cost} currAmount={wish.currAmount} priority={wish.priority} />);

	const saveWishListToDB = () => axios.put(`${config.PIGGY_DB_URL}/children/WishList/62171cef74e8cac9530dcaac`, { wishesUpdates: { priorities: wishList.map(({ id, priority }) => ({ id, priority })), idsToRemove } });

	const removeWish = (wishId) => {
		setWishList((prevWishList) => calcLeftAmounts(prevWishList.filter((wish) => wish.id !== wishId).map((wish, i) => ({ ...wish, priority: i + 1 }))));
		setIdsToRemove((prevIdsToRemove) => [...prevIdsToRemove, wishId]);
	};

	const checkIfSureToRemove = (wish) => {
		Swal.fire({
			title: 'רק רגע...',
			text: `בדוק שאתה רוצה למחוק את היעד ${wish.name}?`,
			icon: 'warning',
			width: '80%',
			confirmButtonColor: '#781f63',
			confirmButtonText: 'בדוק',
			showDenyButton: true,
			denyButtonText: `התחרטתי`,
		}).then((result) => result.isConfirmed && removeWish(wish.id));
	};

	const toggleEdit = async () => {
		if (isEditing) {
			setIsSaving(true);
			try {
				await saveWishListToDB(wishList);

				Swal.fire({
					title: 'ווהו!',
					text: 'רשימת היעדים עודכנה בהצלחה :)',
					icon: 'success',
					width: '80%',
					confirmButtonColor: '#781f63',
					confirmButtonText: 'הבנתי',
				}).then(() => setIsEditing(false));
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
		} else {
			setIsEditing(true);
		}
	};

	useEffect(() => {
		setWishList(calcLeftAmounts(Object.values(state.wishes).sort((a, b) => a.priority - b.priority)));
	}, [state]);

	return (
		<div className={classes.root}>
			<div className={classes.titleContainer}>
				<Typography variant='h6'>היעדים שלי</Typography>
				<IconButton aria-label='delete' color='primary' onClick={toggleEdit} disabled={isSaving}>
					{isSaving ? <CircularProgress size={24} /> : isEditing ? <DoneIcon /> : <FormatListNumberedRtlIcon />}
				</IconButton>
			</div>
			{wishList.length === 0 && <Typography className={classes.explain}>כתיבת יעדי חיסכון עוזרת לנו להשיג את מה שאנחנו רוצים :) זה המקום להתחיל!</Typography>}
			<div className={classes.wishesContainer}>{wishList.map((wish, i) => renderDraggableWish(wish, i))}</div>
			<Button className={classes.addBtn} variant='contained' fullWidth startIcon={<AddIcon />} onClick={goToAddWish}>
				הוספת יעד
			</Button>
		</div>
	);
};

export default ChildWishList;
