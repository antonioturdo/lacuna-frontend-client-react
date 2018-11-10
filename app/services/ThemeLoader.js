export default class ThemeLoader {

    static dymamicLoad = (theme) => import(`themes/${theme}`)
}