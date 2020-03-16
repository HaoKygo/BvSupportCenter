import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import WorkTickets from '../views/WorkTickets'
import Tickets from '../components/Tickets'
import Ticket from '../components/Ticket'
import NewTicket from '../components/NewTicket'
import FAQ from '../views/FAQ'
import Login from '../views/Login'
import NotFound from '../components/NotFound'
import state from '../state'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/worktickets',
    component: WorkTickets,
    meta: {
      private: true
    },
    children: [
      { path: '', name: 'worktickets', component: Tickets },
      { path: 'newticket', name: 'newticket', component: NewTicket },
      { path: ':id', name: 'ticket', component: Ticket, props: route => ({id: route.params.id }) }
    ]
  },
  {
    path: '/faq',
    name: 'faq',
    component: FAQ
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('to', to.name);
  if (to.matched.some(r => r.meta.private) && !state.user) {
    // Redirect to login
    next({ 
      name: 'login',
      params: {
        wantedRoute: to.fullPath
      }
    });
    return
  }
  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({ name: 'home' });
    return
  }
  next();
})

export default router
