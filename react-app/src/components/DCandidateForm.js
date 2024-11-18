import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import { FormControl, TextField, InputLabel, MenuItem, Select, Button, FormHelperText } from "@mui/material";
import useForm from "./useForm";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import * as actions from "../actions/DCandidate";
import { toast } from "react-toastify";

const styles = {
    root: {
        '& .MuiTextField-root': {
            margin: "8px",
            minWidth: 230,
        }
    },
    formControl: {
        margin: "8px !important",
        minWidth: "230px !important"
    },
    smMargin:{
        margin: "8px !important"
    }
};

const initialFieldValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
}

const DCandidateForm = ({ classes, ...props }) => {
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber ? "" : "This field is required."
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)
    
    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {
                resetForm()
                toast.success("Submitted successfully");
            }
            if (props.currentId == 0)
                props.createDCandidate(values,onSuccess)
            else
                props.updateDCandidate(props.currentId,values,onSuccess)
        }   
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.dCandidateList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid size={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            label="Blood Group"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid size={6}>
                    <TextField
                        name="phoneNumber"
                        variant="outlined"
                        label="Phone Number"
                        value={values.phoneNumber}
                        onChange={handleInputChange}                       
                        {...(errors.phoneNumber && { error: true, helperText: errors.phoneNumber })}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        error={!!errors.age}
                        helperText={errors.age} 
                        {...(errors.age && { error: true, helperText: errors.age })}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={!!errors.address}
                        helperText={errors.address} 
                        {...(errors.address && { error: true, helperText: errors.address })}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = store => ({
    dCandidateList : store.DCandidate.list
})
const mapActionsToProps = {
    createDCandidate : actions.create,
    updateDCandidate : actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DCandidateForm));