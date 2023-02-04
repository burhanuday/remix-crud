import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { zx } from "zodix";
import { getOnePost } from "~/utils/api";

export async function loader({ params }: LoaderArgs) {
  const { id } = zx.parseParams(
    params,
    { id: zx.NumAsString },
    {
      message: "Invalid post id",
      status: 400,
    }
  );

  let post = await getOnePost(id);

  if (!post.id) {
    post = await getOnePost(1);
  }

  return json(post);
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
}
