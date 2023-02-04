import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllPosts } from "~/utils/api";

export async function loader() {
  return json(await getAllPosts());
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center">
      {data.map((todoItem) => (
        <div key={todoItem.id} className="card w-96 bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <Link to={"/posts/" + todoItem.id}>
              <h2 className="card-title hover:underline">{todoItem.title}</h2>
            </Link>
            <p>{todoItem.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
