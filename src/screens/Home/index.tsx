import { Layout } from "antd";
import CustomCalendar from "./components/Calendar";
import { FaCalendarAlt } from "react-icons/fa";
import CustomSlider from "../../components/CustomSlider";
const { Content } = Layout;

export default function ControlPanel() {
  return (
    <Layout>
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
              className="text-2xl"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Calendário
            </p>
            <FaCalendarAlt size={20} className="mt-1" />
          </div>
          <div className="mt-10">
            <CustomCalendar />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
