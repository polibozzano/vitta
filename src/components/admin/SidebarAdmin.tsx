import { LuBlocks, LuCalendar, LuChartColumn, LuBadgeHelp, LuStethoscope, LuCircleUserRound } from "react-icons/lu";
import { MdOutlineMedicalInformation } from "react-icons/md";

interface SidebarAdminProps {
    isMobileOpen: boolean;
    toggleMobile: () => void;
}

export function SidebarAdmin({ isMobileOpen, toggleMobile}: SidebarAdminProps) {
    const menuItems = [
        {label: 'Dashboard', icon: <LuBlocks/>, href: '/admin'},
        {label: 'Consultas', icon: <LuCalendar/>, href: '/admin/consultas'},
        {label: 'Estatísticas', icon: <LuChartColumn/>, href: '/estatisticas'},
        {label: 'Medicos', icon: <MdOutlineMedicalInformation/>, href:'/contatomedico'},
        {label: 'FAQ', icon: <LuBadgeHelp/>, href: '/faq'},
    ];

return (
    <>
        {/* Backdrop Mobile */}
        <div
            onClick={toggleMobile}
            className={`fixed inset-0 bg-opacity-50 z-30 md:hidden transition-opacity ${isMobileOpen ? 'block' : 'hidden'}`}/>
        <aside
            className={`fixed z-40 top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${isMobileOpen ? 'translate-x-0 w-52' : '-translate-x-full'}
            md:translate-x-0 md:h-screen
            md:w-16
            lg:w-52
            flex flex-col justify-between`}>

                {/* Logo */}
                <div className='flex items-center justify-center lg:justify-start gap-0 lg:gap-3 mb-4 px-4 lg:px-6 pt-6'>
                    <LuStethoscope className='text-blue-600 text-xl' size={24}/>
                    <span className='hidden lg:inline text-xl font-semibold text-slate-800'>Vitta</span>
                </div>

                {/* Menu */}
                <div className="h-full flex flex-col p-4 space-y-4 text-slate-700">
                    {menuItems.map((item) => (
                        <a
                        key={item.label} 
                        href={item.href}
                        className="flex items-center justify-center lg:justify-start gap-4 p-3 rounded-lg transition hover:bg-slate-200 hover:text-blue-600  hover:font-bold"
                        title={item.label}>
                            <span className="text-2xl">{item.icon}</span>
                            <span className="sm:inline md:hidden lg:inline">{item.label}</span>
                        </a>
                    ))}
                </div>

                <div className="hidden lg:block px-6 pb-6 text-sm text-slate-500">
                <hr className="my-4 text-slate-300"/>
                <div className="flex gap-2 ">
                    <LuCircleUserRound className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white font-bold mt-1" />
                    <div>
                        <p>Admin</p>
                        <p className="text-slate-400">admin@gmail.com</p>
                    </div>
                </div>
            </div>
            </aside>
        </>
    );
}