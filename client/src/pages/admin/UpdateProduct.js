import React, { memo, useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkdownEditor, Select } from "../../components";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getBase64, validate } from "../../ultils/helpers";
import { toast } from "react-toastify";
import { apiUpdateProduct } from "../../apis";

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const { categories } = useSelector((state) => state.app);

  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [payload, setPayload] = useState({
    description: "",
  });

  const [isFocusDescription, setIsFocusDescription] = useState(false);

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });

  const [invalidFields, setInvalidFields] = useState([]);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const cleanHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.description) {
        data.description = cleanHtml(data.description);
      }
      if (data.category)
        data.category = categories?.find(
          (el) => el.title === data.category
        )?.title;
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb)
        formData.append(
          "thumb",
          finalPayload?.thumb?.length === 0
            ? preview.thumb
            : finalPayload.thumb[0]
        );
      if (finalPayload.images) {
        const images =
          finalPayload?.image?.length === 0
            ? preview.images
            : finalPayload.images;
        for (let image of images) formData.append("images", image);
      }
      setIsLoading(true);
      console.log(editProduct._id);
      const response = await apiUpdateProduct(formData, editProduct._id);
      setIsLoading(false);
      if (response.success) {
        toast.success(response.mes);
        render();
        setEditProduct(null);
      } else toast.error(response.mes);
    }
  };

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  // const [hoverElm, setHoverElm] = useState(false);

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || "",
      quantity: editProduct?.quantity || "",
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand?.toLowerCase() || "",
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description?.join(", ")
          : editProduct?.description,
    });
    setPreview({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images || [],
    });
  }, [editProduct]);

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not supported!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    if (imagesPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {}, [isFocusDescription]);

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb"), isFocusDescription]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images"), isFocusDescription]);

  const handleRemoveImage = (name) => {
    if (preview.images?.some((el) => el.name === name))
      setPreview((prev) => ({
        ...prev,
        images: prev.images?.filter((el) => el.name !== name),
      }));
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[60px] w-full"></div>
      <div className="p-4 border-b flex justify-between items-center right-0 left-[327px] fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight">Update products</h1>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setEditProduct(null)}
        >
          Cancel
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Name product"
            register={register}
            errors={errors}
            id="title"
            validate={{ required: "Need fill this field" }}
            fullwidth
            placeholder="Name of the new product"
          />
          <div className="w-full my-4 flex gap-4">
            <InputForm
              label="Price"
              register={register}
              errors={errors}
              id="price"
              validate={{ required: "Need fill this field" }}
              style="flex-auto"
              placeholder="Price of new product"
              type="number"
            />
            <InputForm
              label="quantity"
              register={register}
              errors={errors}
              id="quantity"
              validate={{ required: "Need fill this field" }}
              style="flex-auto"
              placeholder="quantity of new product"
              type="number"
            />
            <InputForm
              label="Color"
              register={register}
              errors={errors}
              id="color"
              validate={{ required: "Need fill this field" }}
              style="flex-auto"
              placeholder="Color of new product"
            />
          </div>

          <div className="w-full my-6 flex gap-4">
            <Select
              label="Category"
              options={categories?.map((el, index) => ({
                key: index,
                code: el.title,
                value: el.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Need fill this field" }}
              style="flex-auto"
              errors={errors}
              fullWidth
            />
            <Select
              label="Brand (optional)"
              options={categories
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({ code: el.toLowerCase(), value: el }))}
              register={register}
              id="brand"
              style="flex-auto"
              errors={errors}
              fullWidth
            />
          </div>

          <MarkdownEditor
            name="description"
            changeValue={changeValue}
            value={payload.description}
            validate={{ required: "Need fill the description" }}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            setIsFocusDescription={setIsFocusDescription}
          />

          <div className="flex flex-row items-baseline gap-2">
            <label
              className="font-semibold cursor-pointer mt-4"
              htmlFor="thumb"
            >
              Upload thumb
            </label>
            <div className="">
              <FaUpload />
            </div>
            <input type="file" id="thumb" hidden {...register("thumb")} />
            {errors["thumb"] && (
              <small className="text-xs text-main">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}

          <div className="flex flex-row items-baseline gap-2">
            <label
              className="font-semibold cursor-pointer mt-4 mb-2"
              htmlFor="products"
            >
              Upload image of product
            </label>
            <div className="">
              <FaUpload />
            </div>
            <input
              type="file"
              id="products"
              hidden
              multiple
              {...register("images")}
            />
            {errors["images"] && (
              <small className="text-xs text-main">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images?.map((el, idx) => (
                <div
                  //   onMouseEnter={() => setHoverElm(true)}
                  key={idx}
                  className="w-fit relative cursor-grabbing"
                  //   onMouseLeave={() => setHoverElm(false)}
                  onClick={() => handleRemoveImage(el.name)}
                >
                  <img
                    src={el}
                    alt="product"
                    className="w-[200px] object-contain"
                  />
                  {/* {hoverElm && (
                    <div
                      className="absolute cursor-pointer inset-0 bg-overlay flex items-center justify-center"
                      
                    >
                      <ImBin size={30} color="white" />
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          )}

          {isLoading ? (
            <button
              disabled
              type="button"
              class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                ></path>
              </svg>
              Loading...
            </button>
          ) : (
            <Button type="submit">Update new product</Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
