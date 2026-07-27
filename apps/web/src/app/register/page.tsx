import { redirect } from "next/navigation";

// ponytail: /register and /login are just entry points people type or share.
// The one client page at /account handles both states, so forward and keep ?ref=.
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  redirect(ref ? `/account?ref=${encodeURIComponent(ref)}` : "/account");
}
