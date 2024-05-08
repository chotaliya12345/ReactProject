import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { email, number, object, string } from "yup";
import { useFormik } from "formik";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ContactContext } from "../../../context/ContactContext";

function Contact(props) {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    contact.getContact();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    contact.deleteContact(id);
  };

  const handleEdit = (data) => {
    console.log(data);
    formik.setValues(data);
    setEdit(true);
    setOpen(true);
  };

  let contactSchema = object({
    address: string().required(),
    email: string().email().required(),
    telephone: number().required(),
  });

  const contact = useContext(ContactContext);

  const formik = useFormik({
    initialValues: {
      address: "",
      email: "",
      telephone: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        contact.editContact(values);
      } else {
        contact.addContact(values);
      }
      resetForm();
      handleClose();
    },
  });

  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    formik;

  const columns = [
    { field: "address", headerName: "Address", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 90,
    },
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

  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Contact
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Contact</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="address"
                name="address"
                label="address"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={touched.address && errors.address ? true : false}
                helperText={
                  touched.address && errors.address ? errors.address : ""
                }
              />
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="email"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email ? true : false}
                helperText={touched.email && errors.email ? errors.email : ""}
              />
              <TextField
                margin="dense"
                id="telephone"
                name="telephone"
                label="telephone"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.telephone}
                error={touched.telephone && errors.telephone ? true : false}
                helperText={
                  touched.telephone && errors.telephone ? errors.telephone : ""
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{edit ? "Update" : "Add"}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={contact.contact}
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
    </div>
  );
}

export default Contact;
