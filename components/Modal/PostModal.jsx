import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, InputError, TextArea } from "../Input/TextInput";
import ImageUpload from "../Input/ImageUpload";
import Modal from "./Modal";
import { createPost, uploadPostImage, updatePost } from "@/pages/api/blog";
import { useAuth } from "../../context/AuthContext";
import { formatText } from "../../helper/formatText";

{
  /*TODO: Firebase store failing to return image url sometimes... look into it */
}

const PostModal = ({ isOpen, setIsOpen, post }) => {
  const { user } = useAuth();
  const [filePath, setFilePath] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    title: "",
    body: "",
    image: "",
  });

  const clearState = () => {
    setIsOpen(false);
    setFilePath(null);
  };

  const addEditPost = async (payload) => {
    await uploadPostImage(payload.image, setFilePath).then(() => {
      post
        ? updatePost(post.id, {
            ...payload,
            body: JSON.stringify(payload.body),
            image: filePath ? filePath : post?.image ? post.image : null,
          }).then(() => clearState())
        : createPost({ ...payload, image: filePath, author: user }).then(() =>
            clearState()
          );
    });
  };

  return (
    <Modal
      heading={post ? "Edit" : "Add Post"}
      buttonText="Confirm"
      buttonOnclick={handleSubmit((data) => {
        addEditPost(data);
      })}
      hasCancelButton={true}
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
    >
      <div>
        <form className="space-y-4">
          <div>
            <Controller
              name="title"
              control={control}
              rules={{ required: "please input title" }}
              defaultValue={post?.title || ""}
              render={({ field }) => (
                <TextInput
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  maxLength={65}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors?.title ? (
              <InputError>{errors?.title.message}</InputError>
            ) : null}
          </div>
          <div className="">
            <Controller
              name="body"
              control={control}
              rules={{ required: "please input article body" }}
              defaultValue={formatText(post?.body) || ""}
              render={({ field }) => (
                <TextArea
                  placeholder="your creativity starts here..."
                  id="body"
                  name="body"
                  rows="12"
                  cols="33"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors?.body ? (
              <InputError>{errors?.body.message}</InputError>
            ) : null}
          </div>

          <div className="">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  name="image"
                  id="image"
                  label="upload post image"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PostModal;
