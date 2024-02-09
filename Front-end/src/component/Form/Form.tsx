import React, { useEffect, useState } from "react";
// import './Form.css';

const Form = ({ show, handleClose, updateData, save }: any) => {
  const showHideClassName = show ? "model display-block" : "model display-none";

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [machines, setMachines] = useState("");
  const [area, setArea] = useState("");
  const [frequency, setFrequency] = useState("");
  const [c_number, setC_number] = useState("");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    if (updateData) {
      setValue();
    }
  }, [updateData]); 

  function setValue() {
    setCode(updateData.code)
    setName(updateData.name)
    setLink(updateData.link)
    setMachines(updateData.machines)
    setArea(updateData.area)
    setFrequency(updateData.frequency)
    setC_number(updateData.c_number)
    setRemark(updateData.remark)
  }

  function allValueNull() {
    setCode('')
    setName('')
    setLink('')
    setMachines('')
    setArea('')
    setFrequency('')
    setC_number('')
    setRemark('')
  }

  function closeBtn() {
    if(!updateData) {
      allValueNull()
    }
    handleClose()
  }

  function saveBtn() {
    const payload = {
      code: code,
      name: name,
      link: link,
      machines: parseInt(machines),
      area: area,
      frequency: frequency,
      c_number: c_number,
      remark: remark,
    }
    save(payload);
    allValueNull();
  }

  return (
    <>
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="form">
            <form>
              <div>
                <label> Code </label>
                <input
                  type="text"
                  placeholder="Auto"
                  value={code}
                  disabled
                  onChange={(e) => setCode(e.target.value)}
                />
                <label> Name </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label> Link </label>
                <input
                  type="text"
                  placeholder="Add Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <label> Machines </label>
                <input
                  type="text"
                  placeholder="Enter Machines"
                  value={machines}
                  onChange={(e) => setMachines(e.target.value)}
                />
              </div>
              <div>
                <label> Contact Number </label>
                <input
                  type="text"
                  placeholder="Enter Contact Number"
                  value={c_number}
                  onChange={(e) => setC_number(e.target.value)}
                />
                <label> Frequency </label>
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <option value="">Select Frequency</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label> Area </label>
                <input
                  type="text"
                  placeholder="Enter Area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                <label> Remark </label>
                <input
                  type="text"
                  placeholder="Enter Remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
            </form>
          </div>
          <button onClick={closeBtn}>Close</button>
          <button onClick={saveBtn}>Save</button>
        </section>
      </div>
    </>
  );
};

export default Form;
