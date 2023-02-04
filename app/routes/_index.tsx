import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { zx } from "zodix";
import { createPost, getAllPosts } from "~/utils/api";

export async function loader() {
  return json(await getAllPosts());
}

export async function action({ request }: ActionArgs) {
  const { title, body } = await zx.parseForm(request, {
    title: z.string().max(100),
    body: z.string().max(500),
  });

  const post = await createPost({
    title,
    body,
    id: -1,
    userId: 1,
  });

  return redirect(`/posts/${post.id}`);
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1 className="card-title">Caught error:</h1>
      <p>{caught.statusText}</p>
    </div>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title hover:underline">Create a new post</h2>
            <Form method="post">
              <input
                type="text"
                placeholder="Post title"
                name="title"
                className="input w-full max-w-xs mb-4"
              />
              <textarea
                className="textarea"
                placeholder="Write a post..."
                name="body"
              ></textarea>
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {data.map((post) => (
        <div key={post.id} className="card w-96 bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <Link to={"/posts/" + post.id}>
              <h2 className="card-title hover:underline">{post.title}</h2>
            </Link>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
