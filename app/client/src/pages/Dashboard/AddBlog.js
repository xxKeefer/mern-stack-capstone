import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../util/fetch";
import useStyles from "./DashboardStyles";

export default function AddRecords() {
  const classes = useStyles();

  const { register, handleSubmit, errors, reset } = useForm();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const submitAddBlog = async (blogData) => {
    console.log(blogData);
    try {
      await API.post("/blog/new", blogData);
      showSuccessfulSubmit();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const showSuccessfulSubmit = () => {
    setSuccessfulSubmit(true);
    setTimeout(() => {
      setSuccessfulSubmit(false);
    }, 2000);
  };

  return (
    <div className={classes.formContainer}>
      <h3 className={classes.formTitle}>Add Blog</h3>
      <form onSubmit={handleSubmit(submitAddBlog)} id="adBlogForm">
        <div className={classes.formGroup}>
          <label className={classes.formLabel} htmlFor="title">
            title
          </label>
          <input
            ref={register({ required: true })}
            className={classes.formInput}
            type="text"
            name="title"
          />
          {errors.title && errors.title.type === "required" && (
            <p className={classes.errorMessage}>This is required</p>
          )}
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel} htmlFor="byline">
            byline
          </label>
          <input
            ref={register({ required: true })}
            className={classes.formInput}
            type="text"
            name="byline"
          />
          {errors.byline && errors.byline.type === "required" && (
            <p className={classes.errorMessage}>This is required</p>
          )}
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel} htmlFor="body">
            body
          </label>
          <textarea
            ref={register({ required: true })}
            type="text"
            name="body"
            className={classes.formInput}
            rows={5}
          />
          {errors.body && errors.body.type === "required" && (
            <p className={classes.errorMessage}>This is required</p>
          )}
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel} htmlFor="author">
            author
          </label>
          <input
            ref={register({ required: false })}
            className={classes.formInput}
            type="text"
            name="author"
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel} htmlFor="image_str">
            image url
          </label>
          <input
            ref={register({ required: false })}
            className={classes.formInput}
            type="text"
            name="image_str"
          />
        </div>

        {successfulSubmit && (
          <p className={classes.successfulSubmit}>BLOG ADDED SUCCESSFULLY</p>
        )}
        <input
          className={classes.submitButton}
          type="submit"
          value="Add Blog"
          name="submit"
        />
      </form>
    </div>
  );
}
