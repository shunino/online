import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state={
    NICK_NAME:'请登录'
}


const mutations = {
    getNickName(state){
      state.NICK_NAME = localStorage.nickName;
    }
}

export default new Vuex.Store({
	state
 
})