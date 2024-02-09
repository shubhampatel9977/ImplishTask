import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./FormWithRHookForm.module.css";

const FormWithFormik = ({ show, initialValues, onClose, onSave }: any) => {
  const showHideClassName = show
    ? `${styles.modal} ${styles.displayBlock}`
    : `${styles.modal} ${styles.displayNone}`;

  const schema = Yup.object().shape({
    code: Yup.string(),
    name: Yup.string().required("Required"),
    link: Yup.string().required("Required"),
    machines: Yup.number().required("Required"),
    area: Yup.string().required("Required"),
    frequency: Yup.string().required("Required"),
    c_number: Yup.string().required("Required"),
    remark: Yup.string().required("Required"),
  });

  useEffect(() => {
    if(initialValues) {
        handleUpdate();
    }
  },[initialValues])

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    onSave(data);
    reset();
    onClose();
  };

  const handleUpdate = () => {
    setValue("code", initialValues.code);
    setValue("name", initialValues.name);
    setValue("link", initialValues.link);
    setValue("machines", initialValues.machines);
    setValue("area", initialValues.area);
    setValue("frequency", initialValues.frequency);
    setValue("c_number", initialValues.c_number);
    setValue("remark", initialValues.remark);
  };

  const handleCloseAndReset = () => {
    reset();
    onClose();
  };

  return (
    <>
      <div className={showHideClassName}>
        <section className={styles.modalMain}>
          <form onSubmit={handleSubmit(onSubmit)}>

          <label>Code:</label>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} disabled={true} />}
            />
            {errors.code && <p>{errors.code.message}</p>}

            <label>Name:</label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <label>Link:</label>
            <Controller
              name="link"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
            {errors.link && <p>{errors.link.message}</p>}

            <label>Machines:</label>
            <Controller
              name="machines"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="number" {...field} />
              )}
            />
            {errors.machines && <p>{errors.machines.message}</p>}

            <label>Area:</label>
            <Controller
              name="area"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
            {errors.area && <p>{errors.area.message}</p>}

            <label>Frequency:</label>
            <Controller
              name="frequency"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} >
                  <option value="">Select Frequency</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              )}
            />
            {errors.frequency && <p>{errors.frequency.message}</p>}

            <label>Contact Number:</label>
            <Controller
              name="c_number"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
            {errors.c_number && <p>{errors.c_number.message}</p>}

            <label>Remark:</label>
            <Controller
              name="remark"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
            {errors.remark && <p>{errors.remark.message}</p>}

            <button type="submit"> Save </button>
            <button type="button" onClick={handleCloseAndReset}>Close</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default FormWithFormik;
