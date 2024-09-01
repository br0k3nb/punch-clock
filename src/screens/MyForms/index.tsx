import { useEffect, useState } from "react";
import { Card, Row, Layout, Image } from "antd";
import CustomSlider from "../../components/CustomSlider";
import { MdFormatAlignJustify } from "react-icons/md";
import api from "../../components/CustomHttpInterceptor";
import { message } from "antd";

type Props = {};

const { Content } = Layout;

export default function MyForms({}: Props) {
  const token = localStorage.getItem("@PUNCH-CLOCK:SYSTEM") || "{}";
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState<any[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setIsLoading(true);
        messageApi.open({
          key: "loadingForms",
          type: "loading",
          content: "Loading...",
        });
        const { data } = await api.get(`/read/form/${token}`);
        setForms(data);
      } catch (err: any) {
        console.log(err);
        messageApi.open({
          key: "signIn",
          type: "error",
          content: `${err.message}`,
          duration: 5,
        });
      } finally {
        messageApi.destroy("loadingForms")
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

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
          <div className="flex flex-row space-x-3 mt-2">
            <p
              className="text-xl"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Meus formulários
            </p>
            <MdFormatAlignJustify size={20} className="mt-1" />
          </div>
          <div className="mt-10">
            <Row gutter={16} className="gap-y-5 gap-x-3 overflow-y-scroll max-h-[80vh] pb-10 sm:mx-5">
              {forms.map((form, index) => {
                return (
                  <Card
                    title={`Meu formulário #${index + 1}`}
                    className="shadow-xl shadow-gray-300 w-[500px] sm:w-[290px] md:w-[345px] lg:w-[500px] h-fit"
                    bordered={true}
                    loading={isLoading}
                    key={form._id}
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-[15px] font-bold">
                          Projetos trabalhados:
                        </p>
                        <p className="text-[15px]">{form.projectsWorkedOn}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-[15px] font-bold">Resumo do dia:</p>
                        <p className="text-[15px]">{form.summary}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-[15px] font-bold">Dúvidas:</p>
                        {form?.questions ? (
                          <p className="text-[15px]">{form?.questions}</p>
                        ) : (
                          <p className="text-[15px] pb-6"/>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <p className="text-[15px] font-bold">Screenshots: </p>
                        <div className="flex flex-row space-x-5">
                          <Row className="gap-y-5 gap-x-3">
                            {form.screenshots.map((url: string, idx: number) => {
                              return (
                                <Image
                                  src={url}
                                  key={idx}
                                  width={100}
                                  height={100}
                                  className="rounded"
                                />
                              );
                            })}
                          </Row>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
