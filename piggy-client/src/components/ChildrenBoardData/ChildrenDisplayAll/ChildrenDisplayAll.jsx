import React, { useState, useEffect, useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { Grid, Button, LinearProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';	
import config from '../../../conf.json';
import ChildrenDisplay from '../../../views/ParentTransferMoneyPage/ChildrenDisplay';
import PropTypes from 'prop-types'
import axios from 'axios';
// import ParentContext from '../../../ParentContext';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ParentContext from '../../../ParentContext';
import { useNavigate } from "react-router-dom";
import routes from "../../Router/Routes"

const useStyles = makeStyles((theme) => ({
    container: {
		paddingTop: '20px',
		flexDirection: 'column',
		width: '80%',
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
})
)

const ChildrenDisplayAll = ({ parentId,childrens,isSettings,selectedChildrenId,isNavigate,isChildrenLoading,setChildrens}) => {
    const classes = useStyles();
	const navigate = useNavigate();

    const [ selectedChildren, setSelectedChildren ] = useState("");
	const [isAddNewChildrenOpen, setIsAddNewChildrenOpen] = useState(false);
	const [addedChildrenMail, setAddedChildrenMail] = useState("");

	const addChildren = () => {
		const childrenIndex = childrens.findIndex(
		  (children) => children.Mail === addedChildrenMail
		);
		if (childrenIndex === -1) {
		  axios
			.put(`${config.PIGGY_DB_URL}/parent/addChildren/${parentId}`, {
			  value: addedChildrenMail,
			})
			.then(async (res) => {
			  if (res.data) {
				setIsAddNewChildrenOpen(false);
				const childrenData = await axios.get(
				  `${config.PIGGY_DB_URL}/children/mail/${addedChildrenMail}`
				);
				setChildrens((prev) => [...prev, childrenData.data]);
				setAddedChildrenMail("");
				Swal.fire({
				  title: `הצלחנו להוסיף את ${childrenData.data.UserSettings.DisplayName} לרשימת הצפייה שלך!`,
				  icon: "success",
				  width: "80%",
				  confirmButtonColor: "#781f63",
				  confirmButtonText: "המשך",
				});
			  } else {
				setIsAddNewChildrenOpen(false);
				Swal.fire({
				  title: `נראה שאין לנו משתמש עם המייל ${addedChildrenMail}`,
				  icon: "info",
				  width: "80%",
				  confirmButtonColor: "#781f63",
				  showCancelButton: true,
				  confirmButtonText: `הזמן את ${addedChildrenMail} לPIGGY!`,
				  cancelButtonColor: "rgb(127 117 117)",
				  cancelButtonText: 'סגור'
				}).then(async (result) => result.isConfirmed && 
				await axios.post(
				  `${config.PIGGY_DB_URL}/children/invite/${JSON.parse(sessionStorage.getItem("profileObj"))["email"]}`,{
					childrenMail: addedChildrenMail
				  }
				).then(()=> {
				  Swal.fire({
					title: `שלחנו מייל ל!${addedChildrenMail}  \n ברגע שיאושר תוכל להוסיף אותו לרשימת הצפייה`,
					icon: "info",
					width: "80%",
					confirmButtonColor: "#781f63",
					confirmButtonText: `המשך`,
				  })
				setAddedChildrenMail("");}
				)).catch((err)=>{
				  setIsAddNewChildrenOpen(false);
				  Swal.fire({
					title: "אופס!",
					text: "משהו התפקשש... כדאי לנסות שוב!",
					icon: "error",
					width: "80%",
					confirmButtonColor: "#781f63",
					confirmButtonText: "הבנתי",
				  }).then(() => setIsAddNewChildrenOpen(true));
				});
			  }
			})
			.catch((err) => {
			  setIsAddNewChildrenOpen(false);
			  Swal.fire({
				title: "אופס!",
				text: "משהו התפקשש... כדאי לנסות שוב!",
				icon: "error",
				width: "80%",
				confirmButtonColor: "#781f63",
				confirmButtonText: "הבנתי",
			  }).then(() => setIsAddNewChildrenOpen(true));
			});
		} else {
		  setIsAddNewChildrenOpen(false);
		  setAddedChildrenMail("");
		  Swal.fire({
			title: `${childrens[childrenIndex].UserSettings.DisplayName} כבר ברשימת הצפייה`,
			icon: "info",
			width: "80%",
			confirmButtonColor: "#781f63",
			confirmButtonText: "המשך",
		  });
		}
	  };

	 const handleChildrenMailChange = (event) => {
		setAddedChildrenMail(event.target.value);
	 };

	return (
		<div className={classes.container}>
            <div className={classes.childrenContainer}>
				{isSettings &&
                     <ChildrenDisplay
                        onClick={() => {
                        setIsAddNewChildrenOpen(true);
                        }}
                        name="+"
                    />
				}
				{ childrens  && !isChildrenLoading  ? (
					
					childrens.map((children) => (
						<ChildrenDisplay
							key={children._id}
							onClick= {() => 
								{	
									selectedChildrenId(children._id);
									setSelectedChildren(children._id);
									if (isNavigate)
									navigate("/parent" + routes.ChildrenQuickView, {
										state: {
										  selectedChildrenId:children._id,
										},
									  })
								 }
							}
							selected={selectedChildren === children._id}
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
			<Dialog
        open={isAddNewChildrenOpen}
        onClose={() => setIsAddNewChildrenOpen(false)}
      >
        <DialogTitle>הכנס את המייל של הילד אותו תרצה להוסיף</DialogTitle>
        <DialogContent>
          <TextField
            id="parent-card-number"
            autoFocus
            fullWidth
            value={addedChildrenMail}
            onChange={handleChildrenMailChange}
            style={{ marginBottom: "15px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddNewChildrenOpen(false)}>ביטול</Button>
          <Button onClick={addChildren}>הוסף</Button>
        </DialogActions>
      </Dialog>

        </div>
    )
}

  export default ChildrenDisplayAll