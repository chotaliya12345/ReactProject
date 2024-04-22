import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string, number, date } from "yup";
import { useFormik } from "formik";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoupon,
  deleteCoupon,
  editCoupon,
  getCoupon,
} from "../../../Redux/slice/counpon.slice";

function Coupon(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const coupon = useSelector((state) => state.coupon);
  console.log(coupon);

  useEffect(() => {
    dispatch(getCoupon());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setEdit(false);
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setEdit(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCoupon(id));
  };

  const columns = [
    { field: "coupon", headerName: "Coupon", width: 70 },
    { field: "per", headerName: "Per", width: 130 },
    { field: "expiry", headerName: "Expiry", width: 130 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => handleEdit(row)} variant="contained">
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(row.id)} variant="contained">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  let couponSchema = object({
    coupon: string().required(),
    per: number().required(),
    expiry: date().required(),
  });

  const formik = useFormik({
    initialValues: {
      coupon: "",
      per: "",
      expiry: "",
    },
    validationSchema: couponSchema,
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        dispatch(editCoupon(values));
      } else {
        dispatch(addCoupon(values));
      }
      resetForm();
      handleClose();
    },
  });

  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    formik;
  return (
    <>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Coupon
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Coupon</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                name="coupon"
                label="Coupon Code"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.coupon}
                error={touched.coupon && errors.coupon ? true : false}
                helperText={
                  touched.coupon && errors.coupon ? errors.coupon : ""
                }
              />
              <TextField
                margin="dense"
                id="name"
                name="per"
                label="Per"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.per}
                error={touched.per && errors.per ? true : false}
                helperText={touched.per && errors.per ? errors.per : ""}
              />
              <TextField
                margin="dense"
                id="name"
                name="expiry"
                label="expiry"
                type="date"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.expiry}
                error={touched.expiry && errors.expiry ? true : false}
                helperText={
                  touched.expiry && errors.expiry ? errors.expiry : ""
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{edit ? "update" : "Add"}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={coupon.coupon}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default Coupon;
