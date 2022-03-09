import React, { useState, useEffect, useContext } from 'react';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import ChildrenDisplay from './ChildrenDisplay';
import axios from 'axios';
import ParentContext from '../ParentHomePage/ParentContext';
import config from '../../conf.json'

const useStyles = makeStyles((theme) => ({
	container: { 
		paddingTop: '30px',
		flexDirection: 'column'
	},
	childrenContainer : {
		display: 'flex',
		justifyContent: 'center'
	},
	text: {
		display: 'flex',
		justifyContent: 'flex-start',
		paddingTop: theme.spacing(2),
	},
}));

const ParentHomePage = () => {

	const {amount,setAmount,setSelectedChildrenId,selectedChildrenId} = useContext(ParentContext);

	const classes = useStyles();

	const [childrens,setChildrens] = useState([]);
	const [showText, setShowText] = useState('הקלד למעלה כמה תרצה להעביר');

	useEffect(() => {
		amount && amount > 0 ? setShowText(`בחרת להעביר ${amount} שקלים`) : setShowText('הקלד למעלה כמה תרצה להעביר');
	}, [amount]);

	useEffect(()=>{
		axios.get(`${config.PIGGY_DB_URL}/parentChild/62171cef74e8cac9530dcdsdacbw`).then(res => {
		setChildrens(res.data)
		setSelectedChildrenId((res.data)[0]._id)})

	},[])

	return (
		<div className={classes.container}>
			<div className={classes.childrenContainer}>
				{childrens.map((children) => <ChildrenDisplay onClick={()=>setSelectedChildrenId(children._id)} selected={selectedChildrenId===children._id} name={children.UserSettings?.DisplayName}/>)}
			</div>
			<TextField label='כמה תרצה להעביר?' variant='outlined' color='primary' fullWidth value={+amount || ''} type='number' onChange={(event) => setAmount(event.target.value)} />
			<Typography variant='h6' component='div' className={classes.text}>
				{showText}
			</Typography>
		
		</div>
		
	);
};

export default ParentHomePage;
