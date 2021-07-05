/**
 *
 * className
 * @param {String} name
 * clase dependiendo de la ruta
 * @param {{currentRoute: String, classnames: {fo: '/bar'}}} options
 */

export default function className(name, options) {
    let newClassName = name
    console.log(name)
    for (const option in options.classnames) {
        if (options.classnames[option] === options.currentRoute) {
            newClassName = `${newClassName} ${option}`
        }
    }

    return newClassName
}
