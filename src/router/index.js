import Vue from "vue";
import VueRouter from "vue-router";

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: loadView("Login")
  },
  {
    path: "/masterplan",
    name: "Masterplan",
    component: loadView("Masterplan")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "Login" &&
    (sessionStorage.getItem("authToken") == null ||
      sessionStorage.getItem("authToken") == "")
  ) {
    next({ name: "Login" });
  } else if (
    to.name === "Login" &&
    sessionStorage.getItem("authToken") !== null
  ) {
    next({ name: "Masterplan" });
  } else {
    next();
  }
});
export default router;
