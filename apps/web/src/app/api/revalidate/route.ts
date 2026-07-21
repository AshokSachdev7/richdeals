import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

// Called by the API webhook on deal publish/update:
//   POST /api/revalidate?secret=...&path=/some-deal-slug
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);

  return Response.json({ revalidated: true, path, now: Date.now() });
}
