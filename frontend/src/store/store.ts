import { createStore, createLogger, Store } from 'vuex';
import { InjectionKey } from 'vue';

// Define your state types
interface CounterState {
  value: number;
  url: string;
  port: string;
}

// Define your mutations
const mutations = {
  increment(state: CounterState) {
    state.value++;
  },
  decrement(state: CounterState) {
    state.value--;
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
    value: 0,
    url:import.meta.env.VITE_API_URL,
    port: import.meta.env.VITE_API_PORT,
  },
  mutations,
  plugins: [createLogger()],
  //   plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
});

// Define the injection key
export const key: InjectionKey<Store<CounterState>> = Symbol();
