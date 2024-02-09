import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanys, selectAPIStatus, fetchAllCompanys, addCompanyAsync, updateCompanyAsync, deleteCompanyAsync } from '../redux/reducers/companyReducers';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Company {
  code: number;
  name: string;
  link: string;
  machines: number;
  area: string;
  frequency: string;
  c_number: string;
  remark: string;
}

const frequencyList = [
  "Low",
  "Medium",
  "High",
];

const Example = () => {

    const dispatch = useDispatch();

    const companysData: Company[] = useSelector(selectCompanys);

    useEffect(() => {
      dispatch(fetchAllCompanys());
    }, [dispatch]);

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  function createCompany(values: Company) {
    dispatch(addCompanyAsync(values));
  }
  
  function updateCompany(values: Company) {
    dispatch(updateCompanyAsync(values));
  }
  
  function deleteCompany(values: Company) {
    dispatch(deleteCompanyAsync(values));
  }

  const columns = useMemo<MRT_ColumnDef<Company>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Code",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "link",
        header: "Link",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.link,
          helperText: validationErrors?.link,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              link: undefined,
            }),
        },
      },
      {
        accessorKey: "machines",
        header: "Machines",
        size: 80,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.machines,
          helperText: validationErrors?.machines,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              machines: undefined,
            }),
        },
      },
      {
        accessorKey: "area",
        header: "Area",
        size: 80,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.area,
          helperText: validationErrors?.area,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              area: undefined,
            }),
        },
      },
      {
        accessorKey: "frequency",
        header: "Frequency",
        editVariant: "select",
        size: 80,
        editSelectOptions: frequencyList,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.frequency,
          helperText: validationErrors?.frequency,
        },
      },
      {
        accessorKey: "c_number",
        header: "Contact Number",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.c_number,
          helperText: validationErrors?.c_number,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              c_number: undefined,
            }),
        },
      },
      {
        accessorKey: "remark",
        header: "Remark",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.remark,
          helperText: validationErrors?.remark,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              remark: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  //CREATE action
  const handleCreateUser: MRT_TableOptions<Company>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateCompany(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createCompany(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<Company>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateCompany(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateCompany(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Company>) => {
    if (window.confirm("Are you sure you want to delete this Company?")) {
      deleteCompany(row.original.code);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: companysData,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Create New Company</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Edit Company</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Company
      </Button>
    ),
    // state: {
      // isLoading: selectAPIStatus,
      // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      // showAlertBanner: isLoadingUsersError,
      // showProgressBars: isFetchingUsers,
    // },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;

const validateRequiredString = (value: string) => !!value.length;
const validateRequiredNumber = (value: any) => !isNaN(parseFloat(value)) && isFinite(value);

function validateCompany(company: Company) {
  return {
    name: !validateRequiredString(company.name) ? "Name is Required" : "",
    link: !validateRequiredString(company.link) ? "Link is Required" : "",
    machines: !validateRequiredNumber(company.machines) ? "Machine is Required And Number" : "",
    area: !validateRequiredString(company.area) ? "Area is Required": "",
    frequency: !validateRequiredString(company.frequency) ? "Frequency is Required" : "",
    c_number: !validateRequiredString(company.c_number) ? "Contact Number is Required" : "",
    remark: !validateRequiredString(company.remark) ? "Remark is Required": "",
  };
}