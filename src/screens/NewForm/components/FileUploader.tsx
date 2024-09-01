import { Dispatch, SetStateAction, useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { message } from "antd";
import { RcFile } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  fileList: UploadFile<any>[];
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
};

export default function FileUploader({ fileList, setFileList }: Props) {
  const [messageApi, contextHolder] = message.useMessage();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const compressBeforeUpload = (file: RcFile) => {
    if (!file.type.startsWith("image/")) {
      messageApi.open({
        key: "newForm",
        type: "error",
        content: "Apenas imagens são suportadas!",
        duration: 5,
      });

      return Upload.LIST_IGNORE;
    } else if (file.type.startsWith("image/") && file.size > 10485760) {
      messageApi.open({
        key: "newForm",
        type: "error",
        content: "Arquivo maior que 10mb!",
        duration: 5,
      });

      return Upload.LIST_IGNORE;
    }

    return false;
  };

  return (
    <>
      {contextHolder}
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={compressBeforeUpload}
        accept="image/*"
        multiple
      >
        {fileList.length < 7 && "+ Upload"}
      </Upload>
    </>
  );
}
