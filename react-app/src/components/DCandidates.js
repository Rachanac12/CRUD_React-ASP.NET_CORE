import React,{useEffect, useState} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/DCandidate";
import DCandidateForm from "./DCandidateForm"
import Grid from '@mui/material/Grid2';
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table} from '@mui/material'
import { withStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ButtonGroup } from "@mui/material";
import { toast } from "react-toastify";

const styles = {
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
  paper: {
    margin: "16px",
    padding: "16px",
  },
};

const DCandidates = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDCandidates()
    },[])   

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id, () => {toast.info("Deleted successfully");});
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <DCandidateForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid size={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record,index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.phoneNumber}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                    onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                     onClick={() => onDelete(record.id)}/></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = store => ({
        dCandidateList : store.DCandidate.list
    })

    const mapActionsToProps = {
        fetchAllDCandidates : actions.fetchAll,
        deleteDCandidate: actions.Delete
    }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DCandidates))