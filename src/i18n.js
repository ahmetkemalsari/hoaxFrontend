import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
      en:{
        translations:{
            'Sign Up' : 'Sign Up',
            'Username' : 'Username',
            'password mismatch' : 'password mismatch',
            'Display Name' : 'Display Name',
            'Password' : 'Password',
            'Password Repeat' :'Password Repeat',
            'Login' : 'Login',
            'Logout':'Logout',
            'Previous' : 'Previous',
            'Next' : 'Next',
            'Load Failer':'Load Failer',
            'User Not Found' :'User Not Found',
            'Edit' : 'Edit' ,
            'Cancel':'Cancel',
            'Save' :'Save',
            'Change Display Name' : 'Change Display Name'
        }
      },
        tr:{
        translations:{
            'Sign Up' : 'Kayıt Ol',
            'password mismatch': 'Aynı şifreyi giriniz',
            'Username':'Kullanıcı Adı',
            'Display Name' : 'Tercih Edilen İsim',
            'Password' : 'Şifre',
            'Password Repeat' : 'Şifreyi Tekrarla',
            'Login' : 'Sisteme Giriş',
            'Logout' : 'Çıkış',
            'Previous' : 'Önceki',
            'Next' : 'Sonraki',
            'Load Failer':'Liste Alınamadı',
            'User Not Found' : 'Kullanıcı Bulunamadı',
            'Edit' : 'Düzenle',
            'Cancel':'İptal Et',
            'Save': 'Kaydet',
            'Change Display Name' : 'Görünür İsminizi Değiştirin'
        }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation:{
        escapeValue:false,
        formatSeparator: ','
    },
    react: {
        wait : true
    }
});

export default i18n;