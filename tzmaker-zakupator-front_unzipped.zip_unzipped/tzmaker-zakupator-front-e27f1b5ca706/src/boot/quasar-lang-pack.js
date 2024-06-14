import { Quasar } from 'quasar'

export default async () => {
    const langIso = 'ru' // ... some logic to determine it (use Cookies Plugin?)
    console.info('qlp5:', langIso);
    try {
        import(
            /* webpackInclude: /(de|en-US)\.js$/ */
        'quasar/lang/' + langIso
        ).then(lang => {
            console.info('qlp11:', lang);
            Quasar.lang.set(lang.default)
        })

    }
    catch (err) {
        console.error('qlp17:', err);
        alert('quasar-lang-pack.js:15 Языковой пакет не найден, остался предыдущий.');
        // Requested Quasar Language Pack does not exist,
        // let's not break the app, so catching error
    }
}