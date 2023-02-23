import React, { useEffect } from 'react'

export const useSetSubMenuHeight = (subMenus: Array<React.RefObject<HTMLElement>>): void => {
    useEffect(() => {
        // console.log(subMenus)
        subMenus.forEach((menu) => {
            const scrollH = menu.current?.scrollHeight !== undefined ? menu.current?.scrollHeight : 0
            if (menu.current != null) menu.current.setAttribute('style', `--height: ${scrollH}px`)
        })
    }, [subMenus])
}
