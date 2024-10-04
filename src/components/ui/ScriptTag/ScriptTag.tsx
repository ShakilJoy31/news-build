/* eslint-disable @next/next/no-sync-scripts */
// components/ScriptTag.js
import Head from "next/head";
import React from "react";

const ScriptTag = ({ src }: { src: string }) => {
  return (
    <Head>
      <script type="text/javascript" src={src} />
    </Head>
  );
};

export default ScriptTag;
