import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ImageInput = () => {
    const {t} = useTranslation();
  const [img, setImg] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImg(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreview(urls);
  };

  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  return (
    <div className="flex flex-col justify-start items-start gap-3">
        <label
            htmlFor="picture"
            className="cursor-pointer bg-slate-50 text-slate-400 hover:text-slate-500 text-sm px-4 py-2 rounded"
        >
            {t("Add Images")}
        </label>
      <input
        type="file"
        accept="image/*"
        multiple
        placeholder="Add Images"
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="flex flex-wrap justify-center items-center">
        {preview.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={url}
            width="120"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageInput