import React from "react";

import Layout from "../components/layout";

const App = ({ title, toc, contents }) => (
  <Layout className="wrap container-fluid" title={title} toc={toc}>
    <p>{contents}</p>
  </Layout>
);

module.exports = App;
