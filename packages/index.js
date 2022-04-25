import TransX from "./components/TransX";

TransX.install = app => {
  app.component(TransX.name, TransX);
};

export default TransX;
