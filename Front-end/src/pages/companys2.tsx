import { useMemo, useState, useEffect } from "react";
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
import Form from '../component/Form/Form';

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

// const frequencyList = ["Low", "Medium", "High"];

const Example = () => {

  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFromType] = useState('');
  const [updateCampany, setUpdateCampany] = useState(null);

  const companysData: Company[] = useSelector(selectCompanys);

  useEffect(() => {
    dispatch(fetchAllCompanys());
  }, [dispatch]);

  function togglePopup() {
    setShowPopup(!showPopup);
  };

  function createCompanyBtn() {
    setUpdateCampany(null);
    setFromType('create');
    setShowPopup(!showPopup);
    console.log("run -createCompany -->", updateCampany)
  }

  function editCompanyBtn(data: any) {
    setFromType('update');
    setUpdateCampany(data)
    setShowPopup(!showPopup);
    console.log("run -updateCompany -->", data)
  }

  function deleteCompanyBtn() {
    console.log("run -deleteBtn -->")
  }

  function saveFunction(data: Company) {
    if(formType === 'create') {
      dispatch(addCompanyAsync(data));
    } else {
      console.log("run -saveFunction-update -->", data)
    }
    setShowPopup(!showPopup);
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
                    <EditIcon onClick={() => editCompanyBtn(company)}/>
                    <DeleteIcon color="error" onClick={deleteCompanyBtn} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Form show={showPopup} handleClose={togglePopup} updateData={updateCampany} save={saveFunction} />
      </div>
    </>
  );
};

export default Example;
