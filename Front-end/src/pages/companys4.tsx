import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompanys,
  selectAPIStatus,
  fetchAllCompanys,
  addCompanyAsync,
  updateCompanyAsync,
  deleteCompanyAsync,
} from "../redux/reducers/companyReducers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormWithRHookForm from "../component/FormWithRHookForm/FormWithRHookForm";

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

const companys3 = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFromType] = useState('');
  const [formData, setFormData] = useState(null);

  const companysData: Company[] = useSelector(selectCompanys);

  useEffect(() => {
    dispatch(fetchAllCompanys());
  }, [dispatch]);

  function handleClose() {
    setShowPopup(false);
  }

  function createCompanyBtn() {
    setFromType('create');
    setShowPopup(true);
  }

  function editCompanyBtn(data: any) {
    setFromType('update');
    setFormData(data)
    setShowPopup(true);
  }

  function handleSave(data: Company) {
    if(formType === 'create') {
      dispatch(addCompanyAsync(data));
    } else {
      dispatch(updateCompanyAsync(data));
    }
  }

  function deleteCompanyBtn(data: number) {
    dispatch(deleteCompanyAsync(data));
  }

  return (
    <>
      <div>
        <div>
          <button
            className="createBtn"
            type="button"
            onClick={createCompanyBtn}
          >
            Create New Company
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Link</th>
              <th>Machines</th>
              <th>Area</th>
              <th>Frequency</th>
              <th>Contact Number</th>
              <th>Remark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companysData.map((company) => {
              return (
                <tr key={company.code}>
                  <td>{company.code}</td>
                  <td>{company.name}</td>
                  <td>{company.link}</td>
                  <td>{company.machines}</td>
                  <td>{company.area}</td>
                  <td>{company.frequency}</td>
                  <td>{company.c_number}</td>
                  <td>{company.remark}</td>
                  <td>
                    <EditIcon onClick={() => editCompanyBtn(company)} />
                    <DeleteIcon color="error" onClick={() => deleteCompanyBtn(company.code)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <FormWithRHookForm
          show={showPopup}
          initialValues={formData}
          onClose={handleClose}
          onSave={handleSave}
        />
      </div>
    </>
  );
};

export default companys3;
