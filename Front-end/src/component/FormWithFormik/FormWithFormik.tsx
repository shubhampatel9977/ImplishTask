import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./FormWithFormik.module.css";

const FormWithFormik = ({ show, initialValues, onClose, onSave }: any) => {
  const showHideClassName = show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;

  const validationForm = Yup.object({
    code: Yup.string(),
    name: Yup.string().required("Required"),
    link: Yup.string().required("Required"),
    machines: Yup.number().required("Required"),
    area: Yup.string().required("Required"),
    frequency: Yup.string().required("Required"),
    c_number: Yup.string().required("Required"),
    remark: Yup.string().required("Required"),
  });

  function onCloseBtn() {
    onClose()
  }

  console.log("initialValues -->", initialValues);

  return (
    <>
      <div className={showHideClassName}>
        <section className={styles.modalMain}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationForm}
            onSubmit={(values, actions) => {
              onSave(values);
              actions.resetForm();
            }}
          >
            {(formikProps) => (
              <Form>
                <div>
                  <div>
                    <label htmlFor="code">Code</label>
                    <Field name="code" type="text" />
                    <ErrorMessage name="code" />
                  </div>

                  <div>
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text" />
                    <ErrorMessage name="name" />
                  </div>

                  <div>
                    <label htmlFor="link">Link</label>
                    <Field name="link" type="text" />
                    <ErrorMessage name="link" />
                  </div>

                  <div>
                    <label htmlFor="machines">Machines</label>
                    <Field name="machines" type="text" />
                    <ErrorMessage name="machines" />
                  </div>

                  <div>
                    <label htmlFor="area">Area</label>
                    <Field name="area" type="text" />
                    <ErrorMessage name="area" />
                  </div>

                  <div>
                    <label htmlFor="frequency">Frequency</label>
                    <Field name="frequency" as="select" className="my-select">
                      <option value=""> Select Frequency</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Field>
                    <ErrorMessage name="frequency" />
                  </div>

                  <div>
                    <label htmlFor="c_number">Contact Number</label>
                    <Field name="c_number" type="text" />
                    <ErrorMessage name="c_number" />
                  </div>

                  <div>
                    <label htmlFor="remark">Remark</label>
                    <Field name="remark" type="text" />
                    <ErrorMessage name="remark" />
                  </div>

                  <button type="button" onClick={onCloseBtn}>Close</button>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
};

export default FormWithFormik;
