import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Grid, Link, Paper } from "@mui/material";
import { deleteUsers, getAllUsers } from "../../../api/userApi";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import UserUpdate from "./userUpdate";
import { NavLink } from "react-router-dom";
import RefreshButton from "../../../components/dashboard/refresh/refreshBtn";
import { UserC } from "../../../context/AuthContext";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [targetUser, setTargetUser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [updatedUser, setUpdatedUser] = useState({});

    const handleEdit = (editedUser) => {
        // console.log("Edit button clicked. Row data:", editedUser);
        // Use a callback function with the updated state

        setTargetUser(editedUser);
        setIsModalOpen(true);
    };

    const contextData = UserC();
    const { currentUser } = contextData;

    //   console.log(currentUser.userId);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching Users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            field: "firstName",
            headerName: "First name",
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: "lastName",
            headerName: "Last name",
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: "email",
            headerName: "Email",
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            editable: false,
            renderCell: (params) => <div>{params.value}</div>,
        },
        {
            field: "userName",
            headerName: "User Name",
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: "creationDate",
            headerName: "Creation Date",
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: "lastLogin",
            headerName: "Last Login",
            // width: 150,
            flex: 1,
            editable: false,
        },
        {
            field: "lastUpdate",
            headerName: "last Update",
            // width: 150,
            flex: 1,
            editable: false,
        },

        {
            field: "active",
            headerName: "State",
            type: "boolean",
            width: 150,
            editable: false,
            renderCell: (params) => (
                <span style={{ color: params.value ? "green" : "red" }}>
                    {params.value ? "Active" : "Inactive"}
                </span>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        color="success"
                        startIcon={<EditIcon />}
                        // component={Link}
                        // to={`/dashboard/users/update/${params.id}`}
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(params.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const handleDelete = (id) => {
        // Show SweetAlert confirmation modal
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                container: "swal2-container", // Add a custom class for the container
            },
            didOpen: () => {
                // Set a higher zIndex for the modal
                document.querySelector(".swal2-container").style.zIndex = 10000;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUsers(id)
                    .then((response) => {
                        if (response.data.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: response.data.message,
                                confirmButtonText: "OK",
                                customClass: {
                                    container: "swal2-container",
                                },
                                didOpen: () => {
                                    document.querySelector(
                                        ".swal2-container"
                                    ).style.zIndex = 10000;
                                },
                            }).then(() => {
                                // refresh
                                fetchUsers();
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete the User.",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box
                            mt={2}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{ mb: 2, pt: 1 }}
                            >
                                Users
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                component={NavLink}
                                to="/dashboard/users/create"
                                sx={{ mb: 2, pt: 1 }}
                            >
                                + Add Users
                            </Button>
                        </Box>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{ mb: 3 }}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                List of Users
                                <RefreshButton onClick={fetchUsers} />
                            </Typography>

                            <Box sx={{ width: "100%" }}>
                                <DataGrid
                                    rows={users}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        columns: {
                                            columnVisibilityModel: {
                                                userName: false,
                                                creationDate: false,
                                                lastLogin: false,
                                                lastUpdate: false,
                                            },
                                        },
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    disableColumnFilter
                                    // disableColumnSelector
                                    disableDensitySelector
                                    slots={{ toolbar: GridToolbar }}
                                    slotProps={{
                                        toolbar: {
                                            showQuickFilter: true,
                                        },
                                    }}
                                    pageSizeOptions={[10]}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    autoHeight
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <UserUpdate
                user={targetUser}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchUsers={fetchUsers}
            />
        </>
    );
};
