import Image from "next/image";
import chewrownRight from "../../assets/svg/dot.png";
import Link from "next/link";

export default function CardInfoDocente() {
  return (
    <div className="w-[340px] h-[219px] p-6 flex-col justify-start items-center gap-6 inline-flex border border-solid border-amber-500 rounded-lg">
      <h3 className="text-slate-950 text-base font-medium self-stretch">
        Descubre CIUNAP
      </h3>
      <section className="self-stretch flex-col justify-start items-start gap-2 flex">
        <Link href="/conocenos">
          <div className="flex gap-3 text-medium hover:cursor-pointer">
            <Image src={chewrownRight} alt="flag" width={16} height={16} />
            <span className="text-center text-slate-700 text-base font-medium">
              Conócenos
            </span>
          </div>
        </Link>
        <Link href={"/convenios"}>
          <div className="flex gap-3 text-medium hover:cursor-pointer">
            <Image src={chewrownRight} alt="flag" width={16} height={16} />
            <span className="text-center text-slate-700 text-base font-medium">
              Convenios
            </span>
          </div>
        </Link>
        <Link href={"/docentes"}>
          <div className="flex gap-3 text-medium hover:cursor-pointer">
            <Image src={chewrownRight} alt="flag" width={16} height={16} />
            <span className="text-center text-slate-700 text-base font-medium">
              Nuestros docentes
            </span>
          </div>
        </Link>
        <Link href={"/reglamentos"}>
          <div className="flex gap-3 text-medium hover:cursor-pointer">
            <Image src={chewrownRight} alt="flag" width={16} height={16} />
            <span className="text-center text-slate-700 text-base font-medium">
              Reglamentos
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
