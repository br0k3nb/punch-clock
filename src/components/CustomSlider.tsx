import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdFormatAlignJustify } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useNavbar from "../hooks/useNavbar";

export default function CustomSlider() {
  const { navbar, setNavbar } = useNavbar();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Sider trigger={null} collapsible collapsed={navbar}>
      <div className="demo-logo-vertical my-5 mx-2">
        <div className="flex flex-col justify-center items-center">
          <img alt="logo" width={80} height={80} src={logo} draggable={false} />
          {!navbar && (
            <p className="text-gray-200 uppercase tracking-wide animate-custom-pulse-two">
              punch clock
            </p>
          )}
        </div>
      </div>
      <div
        className={`flex ${
          navbar && "items-center justify-center !ml-0"
        } ml-3`}
      >
        <Button type="text" onClick={() => setNavbar(!navbar)}>
          <div className="flex flex-row space-x-[10px] text-[#a6adb4] text-[14px]">
            {navbar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            {!navbar && <p className="text-[14px]">Colapsar</p>}
          </div>
        </Button>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={
          pathname === "/home"
            ? ["1"]
            : pathname === "/create/form"
            ? ["3"]
            : pathname === "/view/forms"
            ? ["2"]
            : [""]
        }
        items={[
          {
            key: "1",
            icon: <FaHome />,
            label: "Início",
            onClick: () => navigate("/home"),
          },
          {
            key: "2",
            icon: <MdFormatAlignJustify />,
            label: "Meus formulários",
            onClick: () => navigate("/view/forms"),
          },
          {
            key: "3",
            icon: <IoMdAdd />,
            label: "Novo formulário",
            onClick: () => navigate("/create/form"),
          },
        ]}
      />
    </Sider>
  );
}
