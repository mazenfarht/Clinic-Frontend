import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const token = (await cookies()).get("clinic_token")?.value;

  if (!token) {
    redirect("/login");
  }

  redirect("/admin/dashboard");
}
