import { useState } from "react";
import { Layout } from "antd";
import { MdFormatAlignJustify } from "react-icons/md";
import CustomSlider from "../../components/CustomSlider";
import { FieldValues, useForm } from "react-hook-form";
import { message } from "antd";
import api from "../../components/CustomHttpInterceptor";
import FileUploader from "./components/FileUploader";
import type { UploadFile } from "antd";
import useNavbar from "../../hooks/useNavbar";
import FaceRecognizer from "./components/FaceRecognizer";

const { Content } = Layout;

type Props = {};

export default function NewForm({}: Props) {
  const { navbar } = useNavbar();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFormSubmit = async (data: FieldValues) => {
    const { projects, summary, questions } = data;

    if (!projects || !summary) {
      messageApi.open({
        key: "signIn",
        type: "error",
        content: `Preencha todos os campos obrigatórios antes de enviar o formulário!`,
        duration: 5,
      });

      return;
    }

    if (fileList.length === 0) {
      messageApi.open({
        key: "signIn",
        type: "error",
        content: `O envio de Screenshots é obrigatório!`,
        duration: 5,
      });

      return;
    }

    setIsLoading(true);
    messageApi.open({
      key: "signIn",
      type: "loading",
      content: "Loading...",
    });

    try {
      const fileListData = [] as any;
      fileList.forEach((file) => {
        if (file.originFileObj) {
          fileListData.push(file.originFileObj);
        }
      });

      const token = localStorage.getItem("@PUNCH-CLOCK:SYSTEM") || "{}";

      const submitForm = await api.post(
        "/create/form",
        {
          userId: token,
          projectsWorkedOn: projects,
          summary,
          questions,
          file: fileListData,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      messageApi.open({
        key: "signIn",
        type: "success",
        content: `${submitForm.data.message}`,
      });
    } catch (err: any) {
      console.log(err);
      setTimeout(() => {
        messageApi.open({
          key: "signIn",
          type: "error",
          content: `${err.message}`,
          duration: 5,
        });
      });
    } finally {
      reset({
        projects: "",
        summary: "",
        questions: "",
      });
      setFileList([]);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {contextHolder}
      <CustomSlider />
      <Layout className="h-screen">
        <Content
          className="border !border-gray-300 bg-white rounded-xl"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="mt-10 flex flex-col justify-center items-center">
            <div className="flex flex-row space-x-3 justify-start items-start text-start justify-items-start">
              <p
                className={`text-3xl sm:text-2xl xxs:text-xl ${
                  !navbar && "xxs:text-xs"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Novo formulário
              </p>
              <MdFormatAlignJustify
                className={`mt-1 text-3xl sm:text-2xl xxs:text-xl ${
                  !navbar && "xxs:text-xs"
                }`}
              />
            </div>
            <FaceRecognizer />
            {/* <form
              noValidate
              onSubmit={handleSubmit(handleFormSubmit)}
              className={`
                overflow-x-hidden overflow-y-scroll max-h-[80vh] pb-2 sm:w-[300px] xxs:max-h-[65vh] xxs:px-3 lg:w-[762px] md:w-[500px] xxs:w-[250px] mt-16 xxs:mt-8 transition-all duration-100 
                ${!navbar ? "xxs:hidden" : "xxs:animate-custom-pulse-two"}
              `}
            >
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600">
                  Projetos devem ser separados por "," ex: "Portfólio, Api em
                  java, Blog"
                </p>
                <label className="input input-bordered flex items-center gap-2 !mt-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Projeto(s) trabalhado(s)*"
                    {...register("projects")}
                  />
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Resuma brevemente em o que você trabalhou durante as 6 horas*"
                  {...register("summary")}
                />
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Dúvidas"
                    {...register("questions")}
                  />
                </label>
              </div>
              <div className="mt-4 flex flex-col">
                <p className="mb-2">Screenshots</p>
                <FileUploader fileList={fileList} setFileList={setFileList} />
              </div>
              <button
                className="btn mt-4 w-full btn-success text-white uppercase tracking-wide hover:tracking-[0.12em] ease-in-out duration-300 transition-all"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "enviar"}
              </button>
            </form> */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
