import { useCallback, useContext } from 'react'
import { AppContext, AppContextType } from '../../../contexts'
import { SidebarBrand } from '../../atoms'
import { SidebarNavigation } from '../../molecules'

export const Sidebar: React.FC = () => {
    const ctx = useContext(AppContext) as AppContextType
    const hideSidebar = useCallback(() => {
        ctx.setShown(false)
    }, [])

    return (
        <>
            <aside className="sidebar bg-white">
                <SidebarBrand />
                <SidebarNavigation />
            </aside>
            {ctx.shown ? <div onClick={hideSidebar} className="sidebar-overlay"></div> : null}
        </>
    )
}
