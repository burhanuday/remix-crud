import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { getOnePost } from "~/utils/api";

export async function loader(args: LoaderArgs) {
  const postId: number = args.params.id ? Number(args.params.id) : -1;

  if (postId === -1) {
    throw json("Post was not found", { status: 404 });
  }

  return json(await getOnePost(postId));
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1 className="card-title">Not found</h1>
      <p>{caught.data}</p>
    </div>
  );
}

export default function Post() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{data.title}</h2>
          <p>{data.body}</p>
          <p>User: {data.userId}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Mark done!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
