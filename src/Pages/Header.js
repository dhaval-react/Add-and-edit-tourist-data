import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(props.isOpen);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		props.handleModel(false);
		setOpen(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Grid item xs={12}>
							<Grid>
								<img
									src={
										props.touristData.tourist_profilepicture
									}
									width="500"
									height="300"
								/>
							</Grid>
							<Grid className="detailsMainWrapper">
								<p
									id="transition-modal-title"
									className="touristDetails"
								>
									<b>ID:</b> {props.touristData.id}
								</p>
								<p
									id="transition-modal-title"
									className="touristDetails"
								>
									<b>Name:</b>{" "}
									{props.touristData.tourist_name}
								</p>
								<p
									id="transition-modal-description"
									className="touristDetails"
								>
									<b>Email:</b>{" "}
									{props.touristData.tourist_email}
								</p>
								<p
									id="transition-modal-description"
									className="touristDetails"
								>
									<b>Location:</b>{" "}
									{props.touristData.tourist_location}
								</p>
							</Grid>
						</Grid>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
