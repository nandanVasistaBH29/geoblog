import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../utils/sanity";
import PortableText from "react-portable-text";
import { Post } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
interface Props {
  post: Post[];
}

const Post = ({ post }: Props) => {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);

    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
        setSubmitted(false);
      });
  };
  return (
    <>
      <main>
        <Header />
        {post[0].mainImage && (
          <img
            className="w-full max-w-3xl mx-auto h-52 rounded-lg "
            src={urlFor(post[0].mainImage && post[0].mainImage).url()}
          />
        )}
        <article className="text-w-3xl max-w-5xl mx-auto p-5">
          <h1 className="text-3xl mt-10 mb-3">{post[0].title}</h1>
          <h2 className="text-xl font-light text-gray-300 mb-2">
            {post[0].description}
          </h2>

          <div className="flex items-center space-x-2">
            {post[0].author?.image && (
              <img
                className="h-20 w-20 rounded-full"
                src={urlFor(post[0].author.image).url()}
                alt=""
              />
            )}
            <p className="font-extralight text-sm">
              Blog Post By{" "}
              <span className="text-orange-600">{post[0].author.name}</span> -
              Published @ {new Date(post[0]._createdAt).toLocaleString()}
            </p>
          </div>
          <div className="px-[2vw] max-w-5xl">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post[0].body}
              serializers={{
                h1: (props: any) => {
                  <h1
                    className="font-serif text-2xl font-bold my-5"
                    {...props}
                  />;
                },
                h2: (props: any) => {
                  <h1
                    className="font-serif text-xl font-bold my-5"
                    {...props}
                  />;
                },
                p: (props: any) => {
                  <p
                    className="font-serif text-sm font-normal my-5"
                    {...props}
                  />;
                },
                li: ({ children }: any) => {
                  <li className="font-serif ml-4 list-disc">{children}</li>;
                },
                link: ({ href, children }: any) => {
                  <a href={href} className="font-serif text-blue-500">
                    {children}
                  </a>;
                },
                img: ({ href }: any) => {
                  <img
                    ref={href}
                    className="font-serif p-3 max-h-60 max-w-40 mx-auto"
                  />;
                },
              }}
            />
          </div>
        </article>
        {/* comments */}
        <hr className="max-w-lg my-5 mx-auto border border-yellow-500"></hr>

        {submitted ? (
          <div className="flex flex-col text-center py-10 my-10 bg-orange-500 text-white max-w-2xl mx-auto">
            <h3 className="font-bold text-3xl">Thank You For Submitting</h3>
            <p>Wait For The Approval Of The Comment</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 my-10 max-w-2xl mx-auto "
          >
            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post[0]._id}
            />
            <label className="mb-5">
              <span className="text-grey-800">Name</span>
              <input
                {...register("name", { required: true })}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-orange-600 outline-none focus:ring"
                placeholder="nandan"
                value={user?.displayName!}
                type="text"
                name="name"
                id=""
              />
            </label>
            <label className="mb-5">
              <span className="text-grey-800">Email</span>
              <input
                {...register("email", { required: true })}
                placeholder="email@email.com"
                type="email"
                name="email"
                value={user?.email!}
                className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-orange-600 outline-none focus:ring "
                id=""
              />
            </label>

            <label className="mb-5">
              <span className="text-grey-800">Comment</span>
              <textarea
                {...register("comment", { required: true })}
                className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-orange-600 outline-none focus:ring"
                placeholder="lovely comment"
                name="comment"
                rows={8}
              />
            </label>
            {/* errors */}
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-600">The Name is Required</span>
              )}
              {errors.email && (
                <span className="text-red-600">The Email is Required</span>
              )}
              {errors.comment && (
                <span className="text-red-600">The Comment is Required</span>
              )}
            </div>
            <input
              type="submit"
              className="shadow bg-orange-500 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
            />
          </form>
        )}

        {/* comments */}
        <div className="flex flex-col p-10 max-w-3xl my-10 shadow-orange-300 space-y-2">
          <h3 className="text-4xl">Comments</h3>
          <hr className="pb-2" />
          {post[0].comments.map((comment) => {
            return (
              <div className={comment._id}>
                <p>
                  <span className="text-orange-500">{comment.name} </span>:{" "}
                  {comment.comment}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Post;

// getStaticPaths -> to tell Next which all paths/routes/posts that are to be cache
// getStaticProps -> to get the data from the paths
export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
  _id,
  slug{
      current
  }
}
`;

  const posts = await sanityClient.fetch(query);
  // we need to give next.js all the paths which are to be prebuilt for ISR or SSG

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current==$slug]{
        _id,
        _createdAt,
        title,
        author->{
            name,
            image,
        },
         "comments":*[
          _type=="comment" &&
          post._ref==^._id &&
          approved==true],
        description,
        mainImage,
        slug,
        body
    }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 1000, //some time// after 12hrs SSG happens agains -> ISR
  };
};
