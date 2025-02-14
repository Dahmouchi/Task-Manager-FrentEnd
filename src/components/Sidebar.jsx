import { MoreVertical, ChevronLast, ChevronFirst, LogOut } from "lucide-react";
import { useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children ,user , setExpanded ,expanded}) {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Delete the auth token
    navigate("/"); // Navigate to the home page
  };
  return (
    <aside className={`h-screen `}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/logo.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-52" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3 my-5">
          <li
            onClick={handleLogout}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"`}
          >
            <LogOut />
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              Déconnection
            </span>
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}

            {!expanded && (
              <div
                className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
              >
                Déconnection
              </div>
            )}
          </li>
        </div>
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.firstName} {user?.lastName}</h4>
              <span className="text-xs text-gray-600">{user?.username}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
        
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, link }) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "SidebarItem must be used within a SidebarContext.Provider"
    );
  }

  const { expanded } = context;
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (currentLink) => location.pathname === currentLink;

  const isItemActive = isActive(link);

  return (
    <li
      onClick={() => navigate(link)}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        isItemActive
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
