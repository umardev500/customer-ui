export const checkRouteClass = (paths: string[], pathName: string, matchClasses: string, defaultClasses: string): string => {
    let className = ''

    for (let i = 0; i < paths.length; i++) {
        if (pathName === paths[i]) {
            className = matchClasses
            break
        }
    }

    if (className === '') className = defaultClasses

    return className
}
