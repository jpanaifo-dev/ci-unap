import { fetchCore } from "@/api";
import { IPerson, IResApi } from "@/types";
import { PersonalData } from "@/modules/core";
import { getUserId } from "@/libs/user/userdata";

export default async function ProfilePage() {
  const userId = await getUserId();

  const res = await fetchCore(`gestor/PersonaList/?id=${userId}`, {
    method: "GET",
  });

  if (!res.ok) {
    return <div>Error</div>;
  }

  const data: IResApi<IPerson> = (await res.json()) as IResApi<IPerson>;

  return (
    <>
      <PersonalData personData={data.results[0]} />
    </>
  );
}
