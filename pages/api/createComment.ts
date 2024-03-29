// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  useCdn: process.env.NODE_DEV === "production",
  token: process.env.SANITY_STUDIO_API_TOKEN,
};
import sanityClient from "@sanity/client";
const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  console.log(_id, name, email, comment);

  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
    return;
  }
  res.status(200).json({ name: name });
}
