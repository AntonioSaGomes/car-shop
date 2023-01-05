import './style.css'
import App from './App.vue'
import { createI18n } from "vue-i18n";
import router from "./router";
import * as Vue from 'vue';
import { messages, defaultLocale } from "../i18n/index";
import { createPinia } from "pinia";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import VueAwesomePaginate from "vue-awesome-paginate";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZCt8cq4FrRD1kFGgDIN0oka2iDJ3VZvA",
  authDomain: "online-shop-ad173.firebaseapp.com",
  projectId: "online-shop-ad173",
  storageBucket: "online-shop-ad173.appspot.com",
  messagingSenderId: "876741413903",
  appId: "1:876741413903:web:5c0f42e6f3428f1561277a",
  measurementId: "G-YW7Q91NHBV"
};

const i18n = createI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
});

const firebaseInstance = firebase.initializeApp(firebaseConfig);
console.log(firebaseInstance);
const app = Vue.createApp(App).use(createPinia());

const auth = getAuth(firebaseInstance);
const db = firebaseInstance.firestore();


app.use(i18n)
    .use(router)
    .use(auth)
    .use(VueAwesomePaginate)
    .mount('#app')

app.config.globalProperties.$firebase = firebaseInstance;
app.config.globalProperties.$auth = auth;
app.config.globalProperties.$firestore = db;
