import NewsDetailsById from "@/components/specific/NewsDetails/NewsDetailsById";
import { fetchPostBySlug } from "@/lib/postApi";
import React from "react";

const NewsDetails = async ({ params }: { params: { slug: string } }) => {
  const slug = decodeURIComponent(params?.slug);
  const post = await fetchPostBySlug(slug);
  // console.log(decodeURIComponent(params?.newsId), "newsid page");
  // console.log(post);

  return (
    <section className="custom_container">
      {post && <NewsDetailsById post={post} slug={slug} />}
    </section>
  );
};

export default NewsDetails;
