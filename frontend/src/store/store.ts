import { createStore, createLogger, Store } from 'vuex';
import { InjectionKey } from 'vue';

// Define your state types
interface CounterState {
  alert: any;
  url: string;
  port: string;
  payload:any;
  count:number;
}

// Define your mutations
const mutations = {
  fetchData(state: CounterState, payload: any,) {
    state.payload = payload;
  },
  fetchDataCount(state: CounterState, count: any) {
    state.count = count;
  },

  insertData(state:CounterState, newItem:any) {
    state.payload.push(newItem);
    state.count++;
  },
  updateDataById(state:CounterState, updatedItem:any) {
    const index = state.payload.findIndex((item:any) => item.id === updatedItem.id);
    if (index !== -1) {
      state.payload[index] = updatedItem;
    }
  },
  updateData(state:CounterState, { payload, count }: any) {
    state.payload = payload;
    state.count = count;
  },
  deleteData(state:CounterState, id: string) {
    state.payload = state.payload.filter((item:any) => item.id !== id);
    state.count--;
  },
    showAlert(state: CounterState, alert: any) {
      state.alert = alert;
    },
  
  updateUrl(state: CounterState, url: string) {
    state.url = url;
  },
  updatePort(state: CounterState, port: string) {
    state.port = port;
  },
};

// Create your store
export const store = createStore<CounterState>({
  state: {
    alert:{
      message:'Create a Successful!',
      type:'error',
      title: "Success",
      label:"CONTINUE",
      icon: "mdi mdi-check-circle",
    },
    url:import.meta.env.VITE_API_URL,
    port: import.meta.env.VITE_API_PORT,
    payload: [],
    count: 0
  },
  mutations,
  plugins: [createLogger()],
  //   plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
});

// Define the injection key
export const key: InjectionKey<Store<CounterState>> = Symbol();
